import { useState, useMemo, useRef } from 'react';
import TableLayout from '@/components/layout/table';
import Button from '@/components/ui/button';
import ConfirmModal from '@/components/layout/modal/confirm';

import { useStudentColumns } from '@/hooks/useStudentUserManageColumns';
import { useActionMenu } from '@/hooks/useActionMenu';
import type { StudentSearchResponse } from '@/types/search';
import { 
  useCreateStudentMutation, 
  useUpdateStudentMutation, 
  useDeleteStudentMutation 
} from '@/services/user-management/user-management.mutation';

import * as S from './style';
import * as PageS from '@/pages/admin/users/style';

export interface Student {
  id: string;
  grade: number | '';
  classNum: number | '';
  number: number | '';
  name: string;
}

interface StudentsProps {
  studentsData: StudentSearchResponse[];
  isLoading?: boolean;
}

export default function Students({ studentsData, isLoading = false }: StudentsProps) {
  const { openMenuId, setOpenMenuId, menuRef } = useActionMenu();
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editingIds, setEditingIds] = useState<Set<string>>(new Set());
  const [localStudents, setLocalStudents] = useState<Student[]>([]);
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<{ isOpen: boolean; studentId: string | null; studentName: string }>({
    isOpen: false,
    studentId: null,
    studentName: '',
  });

  const { mutate: createStudent } = useCreateStudentMutation();
  const { mutate: updateStudent } = useUpdateStudentMutation();
  const { mutate: deleteStudent } = useDeleteStudentMutation();

  // API 데이터를 UI 형식으로 변환
  const students = useMemo(() => {
    const apiStudents = studentsData.map((student): Student => ({
      id: String(student.id), // number와 string 모두 처리
      grade: student.grade,
      classNum: student.classNumber,
      number: student.number,
      name: student.name,
    }));
    
    // 로컬에서 추가된 학생들과 병합 (새로 추가된 항목을 맨 위에)
    const newStudents = localStudents.filter(s => s.id.startsWith('new-'));
    return [...newStudents, ...apiStudents];
  }, [studentsData, localStudents]);

  const columns = useStudentColumns({
    editingIds,
    editingStudent,
    onEditingStudentChange: setEditingStudent,
  });

  const handleEdit = (student: Student) => {
    setEditingStudent({ ...student });
    setEditingIds((prev) => new Set(prev).add(student.id));
    setOpenMenuId(null);
  };

  const handleSave = (studentId: string) => {
    if (!editingStudent || editingStudent.id !== studentId) return;
    
    // 새로 추가된 학생인 경우
    if (studentId.startsWith('new-')) {
      createStudent({
        name: editingStudent.name,
        grade: Number(editingStudent.grade) || 1,
        classNumber: Number(editingStudent.classNum) || 1,
        number: Number(editingStudent.number) || 1,
      }, {
        onSuccess: () => {
          setLocalStudents(prev => prev.filter(s => s.id !== studentId));
          setEditingStudent(null);
          setEditingIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(studentId);
            return newSet;
          });
        },
      });
    } else {
      // 기존 학생 수정
      updateStudent({
        id: studentId,
        name: editingStudent.name,
        grade: Number(editingStudent.grade) || 1,
        classNumber: Number(editingStudent.classNum) || 1,
        number: Number(editingStudent.number) || 1,
      }, {
        onSuccess: () => {
          setEditingStudent(null);
          setEditingIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(studentId);
            return newSet;
          });
        },
      });
    }
  };

  const handleCancel = (studentId: string) => {
    // 새로 추가된 학생이고 아직 저장 안 된 경우 삭제
    if (studentId.startsWith('new-')) {
      setLocalStudents(prev => prev.filter(s => s.id !== studentId));
    }
    
    if (editingStudent?.id === studentId) {
      setEditingStudent(null);
    }
    setEditingIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(studentId);
      return newSet;
    });
  };

  const handleDelete = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    setDeleteConfirmModal({
      isOpen: true,
      studentId,
      studentName: student?.name || '',
    });
    setOpenMenuId(null);
  };

  const handleConfirmDelete = () => {
    const studentId = deleteConfirmModal.studentId;
    if (!studentId) return;

    // 새로 추가된 학생인 경우 로컬에서만 삭제
    if (studentId.startsWith('new-')) {
      setLocalStudents(prev => prev.filter(s => s.id !== studentId));
      setEditingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(studentId);
        return newSet;
      });
      setDeleteConfirmModal({ isOpen: false, studentId: null, studentName: '' });
      return;
    }

    deleteStudent(
      { id: studentId },
      {
        onSuccess: () => {
          setEditingIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(studentId);
            return newSet;
          });
          setDeleteConfirmModal({ isOpen: false, studentId: null, studentName: '' });
        },
      }
    );
  };

  const handleCancelDelete = () => {
    setDeleteConfirmModal({ isOpen: false, studentId: null, studentName: '' });
  };

  const handleAdd = () => {
    const newStudent: Student = {
      id: `new-${Date.now()}`,
      grade: '',
      classNum: '',
      number: '',
      name: '',
    };
    setLocalStudents(prev => [newStudent, ...prev]);
    setEditingStudent(newStudent);
    setEditingIds((prev) => new Set(prev).add(newStudent.id));
    
    // 스크롤을 맨 위로 이동
    setTimeout(() => {
      if (tableWrapperRef.current) {
        // tableWrapperRef의 모든 자식 중 스크롤 가능한 요소 찾기
        const scrollableElements = Array.from(tableWrapperRef.current.children).filter(
          (child) => {
            const style = window.getComputedStyle(child);
            return style.overflowY === 'auto' || style.overflowY === 'scroll';
          }
        );
        
        scrollableElements.forEach((element) => {
          (element as HTMLElement).scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
          });
        });
      }
    }, 150);
  };

  const renderActions = (row: Student) => (
    <S.ActionCell onClick={(e) => e.stopPropagation()}>
      {editingIds.has(row.id) ? (
        <S.EditButtonGroup>
          <Button text="취소" variant="cancel" onClick={() => handleCancel(row.id)} />
          <Button text="저장" variant="confirm" onClick={() => handleSave(row.id)} />
        </S.EditButtonGroup>
      ) : (
        <div ref={openMenuId === row.id ? menuRef : null} style={{ position: 'relative' }}>
          <S.KebabButton 
            onClick={() => {setOpenMenuId(openMenuId === row.id ? null : row.id);}}
          >
            <img src="/icons/common/kebabMenu.svg" alt="메뉴" />
          </S.KebabButton>
          {openMenuId === row.id && (
            <S.DropdownMenu data-dropdown-menu>
              <S.DropdownItem 
                data-dropdown-item
                onClick={() => {handleEdit(row);}}
              >
                수정
              </S.DropdownItem>
              <S.DropdownItem 
                data-dropdown-item
                $danger 
                onClick={() => { handleDelete(row.id);}}
              >
                삭제
              </S.DropdownItem>
            </S.DropdownMenu>
          )}
        </div>
      )}
    </S.ActionCell>
  );

  return (
    <>
      <S.TableWrapper ref={tableWrapperRef}>
        <TableLayout columns={columns} data={students} renderActions={renderActions} isLoading={isLoading} />
      </S.TableWrapper>
      <PageS.AddButton onClick={handleAdd}>
        <img src="/icons/common/plusBlue.svg" alt="추가" />
        <span>추가</span>
      </PageS.AddButton>
      <ConfirmModal
        isOpen={deleteConfirmModal.isOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="학생 삭제"
        message={`${deleteConfirmModal.studentName} 학생을 삭제하시겠습니까?`}
        cancelText="취소"
        confirmText="삭제"
      />
    </>
  );
}
