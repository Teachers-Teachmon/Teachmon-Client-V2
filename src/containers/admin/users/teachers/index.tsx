import { useState, useMemo } from 'react';
import TableLayout from '@/components/layout/table';
import Button from '@/components/ui/button';
import { USER_ROLES } from '@/constants/admin';
import { useTeacherColumns } from '@/hooks/useTeacherUserManageColumns';
import { useDropdownMenu } from '@/hooks/useDropdownMenu';
import type { Teacher as ApiTeacher, ForbiddenDay } from '@/services/user-management/user-management.api';
import { 
  useCreateTeacherMutation,
  useUpdateTeacherMutation, 
  useDeleteTeacherMutation 
} from '@/services/user-management/user-management.mutation';
import * as S from './style';
import * as PageS from '@/pages/admin/users/style';

type UserRole = '관리자' | '일반';

export interface Teacher {
  id: string;
  teacher_id?: string; // API에서 받은 원본 ID (문자열로 처리)
  role: UserRole;
  name: string;
  email: string;
  supervisionCount: number;
  forbiddenDates?: string[];
}

interface TeachersProps {
  teachersData: ApiTeacher[];
  forbiddenDates: ForbiddenDay[];
  onOpenForbiddenDates: (teacher: Teacher) => void;
}

export default function Teachers({ teachersData, forbiddenDates, onOpenForbiddenDates }: TeachersProps) {
  const { openMenuId, setOpenMenuId, menuRef } = useDropdownMenu();
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [editingIds, setEditingIds] = useState<Set<string>>(new Set());
  const [localTeachers, setLocalTeachers] = useState<Teacher[]>([]);

  const { mutate: createTeacher } = useCreateTeacherMutation();
  const { mutate: updateTeacher } = useUpdateTeacherMutation();
  const { mutate: deleteTeacher } = useDeleteTeacherMutation();

  // API 데이터를 UI 형식으로 변환
  const teachers = useMemo(() => {
    const apiTeachers = teachersData.map((teacher): Teacher => ({
      id: teacher.teacher_id, // 이미 문자열
      teacher_id: teacher.teacher_id, // 원본 ID 보존
      role: teacher.role === 'ADMIN' ? USER_ROLES.ADMIN : USER_ROLES.NORMAL,
      name: teacher.name,
      email: teacher.email,
      supervisionCount: teacher.supervision_count,
      forbiddenDates: forbiddenDates,
    }));
    
    // 로컬에서 추가된 선생님들과 병합
    const newTeachers = localTeachers.filter(t => t.id.startsWith('new-'));
    return [...apiTeachers, ...newTeachers];
  }, [teachersData, forbiddenDates, localTeachers]);

  const columns = useTeacherColumns({
    editingIds,
    editingTeacher,
    onEditingTeacherChange: setEditingTeacher,
  });

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher({ ...teacher });
    setEditingIds((prev) => new Set(prev).add(teacher.id));
    setOpenMenuId(null);
  };

  const handleSave = (teacherId: string) => {
    if (!editingTeacher || editingTeacher.id !== teacherId) return;
    
    // 새로 추가된 선생님인 경우
    if (teacherId.startsWith('new-')) {
      createTeacher({
        role: editingTeacher.role === USER_ROLES.ADMIN ? 'ADMIN' : 'TEACHER',
        name: editingTeacher.name,
        email: editingTeacher.email,
      }, {
        onSuccess: () => {
          setLocalTeachers(prev => prev.filter(t => t.id !== teacherId));
          setEditingTeacher(null);
          setEditingIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(teacherId);
            return newSet;
          });
        },
      });
    } else {
      // 기존 선생님 수정
      updateTeacher({
        teacher_id: editingTeacher.teacher_id!, // 원본 ID 사용
        role: editingTeacher.role === USER_ROLES.ADMIN ? 'ADMIN' : 'TEACHER',
        name: editingTeacher.name,
        email: editingTeacher.email,
      }, {
        onSuccess: () => {
          setEditingTeacher(null);
          setEditingIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(teacherId);
            return newSet;
          });
        },
      });
    }
  };

  const handleCancel = (teacherId: string) => {
    // 새로 추가된 선생님이고 아직 저장 안 된 경우 삭제
    if (teacherId.startsWith('new-')) {
      setLocalTeachers(prev => prev.filter(t => t.id !== teacherId));
    }
    
    if (editingTeacher?.id === teacherId) {
      setEditingTeacher(null);
    }
    setEditingIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(teacherId);
      return newSet;
    });
  };

  const handleDelete = (teacherId: string) => {
    // 새로 추가된 선생님인 경우 로컬에서만 삭제
    if (teacherId.startsWith('new-')) {
      setLocalTeachers(prev => prev.filter(t => t.id !== teacherId));
      setEditingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(teacherId);
        return newSet;
      });
      setOpenMenuId(null);
      return;
    }

    // 원본 teacher_id 찾기
    const teacher = teachers.find(t => t.id === teacherId);
    if (!teacher?.teacher_id) return;

    deleteTeacher(
      { teacher_id: teacher.teacher_id }, // 원본 ID 사용
      {
        onSuccess: () => {
          setEditingIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(teacherId);
            return newSet;
          });
          setOpenMenuId(null);
        },
      }
    );
  };

  const handleAdd = () => {
    const newTeacher: Teacher = {
      id: `new-${Date.now()}`,
      role: USER_ROLES.NORMAL,
      name: '',
      email: '',
      supervisionCount: 0,
    };
    setLocalTeachers(prev => [...prev, newTeacher]);
    setEditingTeacher(newTeacher);
    setEditingIds((prev) => new Set(prev).add(newTeacher.id));
  };

  const renderActions = (row: Teacher) => (
    <S.ActionCell onClick={(e) => e.stopPropagation()}>
      {editingIds.has(row.id) ? (
        <S.EditButtonGroup>
          <Button text="취소" variant="cancel" onClick={() => handleCancel(row.id)} />
          <Button text="저장" variant="confirm" onClick={() => handleSave(row.id)} />
        </S.EditButtonGroup>
      ) : (
        <div ref={openMenuId === row.id ? menuRef : null} style={{ position: 'relative' }}>
          <S.KebabButton 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setOpenMenuId(openMenuId === row.id ? null : row.id);
            }}
          >
            <img src="/icons/common/kebabMenu.svg" alt="메뉴" />
          </S.KebabButton>
          {openMenuId === row.id && (
            <S.DropdownMenu data-dropdown-menu>
              <S.DropdownItem 
                data-dropdown-item
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onOpenForbiddenDates(row);
                  setOpenMenuId(null);
                }}
              >
                금지날짜
              </S.DropdownItem>
              <S.DropdownItem 
                data-dropdown-item
                onClick={() => {handleEdit(row)}}
              >
                수정
              </S.DropdownItem>
              <S.DropdownItem 
                data-dropdown-item
                $danger 
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleDelete(row.id);
                }}
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
      <S.TableWrapper>
        <TableLayout columns={columns} data={teachers} renderActions={renderActions} />
      </S.TableWrapper>
      <PageS.AddButton onClick={handleAdd}>
        <img src="/icons/common/plusBlue.svg" alt="추가" />
        <span>추가</span>
      </PageS.AddButton>
    </>
  );
}
