import { useState, useRef, useEffect, useMemo } from 'react';
import TableLayout from '@/components/layout/table';
import Button from '@/components/ui/button';
import { USER_ROLES } from '@/constants/admin';
import { useTeacherColumns } from '@/hooks/useTeacherUserManageColumns';
import type { Teacher as ApiTeacher, ForbiddenDay } from '@/services/user-management/user-management.api';
import { useUpdateTeacherMutation, useDeleteTeacherMutation } from '@/services/user-management/user-management.mutation';
import * as S from './style';

type UserRole = '관리자' | '일반';

export interface Teacher {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  supervisionCount: number;
  forbiddenDates?: string[];
}

interface TeachersProps {
  teachersData: ApiTeacher[];
  forbiddenDates: ForbiddenDay[];
  searchQuery: string;
  onOpenForbiddenDates: (teacher: Teacher) => void;
}

export default function Teachers({ teachersData, forbiddenDates, searchQuery, onOpenForbiddenDates }: TeachersProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [editingIds, setEditingIds] = useState<Set<string>>(new Set());
  const menuRef = useRef<HTMLDivElement>(null);

  const { mutate: updateTeacher } = useUpdateTeacherMutation();
  const { mutate: deleteTeacher } = useDeleteTeacherMutation();

  // API 데이터를 UI 형식으로 변환
  const teachers = useMemo(() => {
    return teachersData.map((teacher): Teacher => ({
      id: String(teacher.teacher_id),
      role: teacher.role === 'ADMIN' ? USER_ROLES.ADMIN : USER_ROLES.NORMAL,
      name: teacher.name,
      email: teacher.email,
      supervisionCount: teacher.supervision_count,
      forbiddenDates: forbiddenDates,
    }));
  }, [teachersData, forbiddenDates]);

  const columns = useTeacherColumns({
    editingIds,
    editingTeacher,
    onEditingTeacherChange: setEditingTeacher,
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

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher({ ...teacher });
    setEditingIds((prev) => new Set(prev).add(teacher.id));
    setOpenMenuId(null);
  };

  const handleSave = (teacherId: string) => {
    if (!editingTeacher || editingTeacher.id !== teacherId) return;
    
    updateTeacher({
      teacher_id: Number(teacherId),
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
  };

  const handleCancel = (teacherId: string) => {
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
    deleteTeacher(
      { teacher_id: Number(teacherId) },
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

  const filteredTeachers = teachers
    .filter((teacher) => teacher.name.includes(searchQuery) || teacher.email.includes(searchQuery));

  const renderActions = (row: Teacher) => (
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
              <S.DropdownItem onClick={() => onOpenForbiddenDates(row)}>금지날짜</S.DropdownItem>
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
    <S.TableWrapper>
      <TableLayout columns={columns} data={filteredTeachers} renderActions={renderActions} />
    </S.TableWrapper>
  );
}
