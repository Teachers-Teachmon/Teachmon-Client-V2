import { useState, useRef, useEffect, useMemo } from 'react';
import TableLayout from '@/components/layout/table';
import Button from '@/components/ui/button';
import { useStudentColumns } from '@/hooks/useStudentUserManageColumns';
import type { Student as ApiStudent } from '@/services/user-management/user-management.api';
import { 
  useCreateStudentMutation, 
  useUpdateStudentMutation, 
  useDeleteStudentMutation 
} from '@/services/user-management/user-management.mutation';
import * as S from './style';
import * as PageS from '@/pages/admin/users/style';

export interface Student {
  id: string;
  grade: number;
  classNum: number;
  number: number;
  name: string;
}

interface StudentsProps {
  studentsData: ApiStudent[];
  searchQuery: string;
}

export default function Students({ studentsData, searchQuery }: StudentsProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editingIds, setEditingIds] = useState<Set<string>>(new Set());
  const [localStudents, setLocalStudents] = useState<Student[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  const { mutate: createStudent } = useCreateStudentMutation();
  const { mutate: updateStudent } = useUpdateStudentMutation();
  const { mutate: deleteStudent } = useDeleteStudentMutation();

  // API 데이터를 UI 형식으로 변환
  const students = useMemo(() => {
    const apiStudents = studentsData.map((student): Student => ({
      id: String(student.student_id),
      grade: student.grade,
      classNum: student.class_number,
      number: student.student_number,
      name: student.name,
    }));
    
    // 로컬에서 추가된 학생들과 병합
    const newStudents = localStudents.filter(s => s.id.startsWith('new-'));
    return [...apiStudents, ...newStudents];
  }, [studentsData, localStudents]);

  const columns = useStudentColumns({
    editingIds,
    editingStudent,
    onEditingStudentChange: setEditingStudent,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        grade: editingStudent.grade,
        class_number: editingStudent.classNum,
        student_number: editingStudent.number,
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
        student_id: Number(studentId),
        name: editingStudent.name,
        grade: editingStudent.grade,
        class_number: editingStudent.classNum,
        student_number: editingStudent.number,
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
    // 새로 추가된 학생인 경우 로컬에서만 삭제
    if (studentId.startsWith('new-')) {
      setLocalStudents(prev => prev.filter(s => s.id !== studentId));
      setEditingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(studentId);
        return newSet;
      });
      setOpenMenuId(null);
      return;
    }

    deleteStudent(
      { student_id: Number(studentId) },
      {
        onSuccess: () => {
          setEditingIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(studentId);
            return newSet;
          });
          setOpenMenuId(null);
        },
      }
    );
  };

  const handleAdd = () => {
    const newStudent: Student = {
      id: `new-${Date.now()}`,
      grade: 1,
      classNum: 1,
      number: 1,
      name: '',
    };
    setLocalStudents(prev => [...prev, newStudent]);
    setEditingStudent(newStudent);
    setEditingIds((prev) => new Set(prev).add(newStudent.id));
  };

  const filteredStudents = students.filter(
    (student) => student.name.includes(searchQuery) || String(student.grade).includes(searchQuery)
  );

  const renderActions = (row: Student) => (
    <S.ActionCell>
      {editingIds.has(row.id) ? (
        <S.EditButtonGroup>
          <Button text="취소" variant="cancel" onClick={() => handleCancel(row.id)} />
          <Button text="저장" variant="confirm" onClick={() => handleSave(row.id)} />
        </S.EditButtonGroup>
      ) : (
        <div ref={openMenuId === row.id ? menuRef : null}>
          <S.KebabButton onClick={() => setOpenMenuId(openMenuId === row.id ? null : row.id)}>
            <img src="/icons/common/kebabMenu.svg" alt="메뉴" />
          </S.KebabButton>
          {openMenuId === row.id && (
            <S.DropdownMenu>
              <S.DropdownItem onClick={() => handleEdit(row)}>수정</S.DropdownItem>
              <S.DropdownItem $danger onClick={() => handleDelete(row.id)}>
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
      <S.TableWrapper>
        <TableLayout columns={columns} data={filteredStudents} renderActions={renderActions} />
      </S.TableWrapper>
      <PageS.AddButton onClick={handleAdd}>
        <img src="/icons/common/plusBlue.svg" alt="추가" />
        <span>추가</span>
      </PageS.AddButton>
    </>
  );
}
