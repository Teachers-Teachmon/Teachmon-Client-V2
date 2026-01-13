import { useState, useRef, useEffect } from 'react';
import TableLayout from '@/components/layout/table';
import Button from '@/components/ui/button';
import { USER_ROLES } from '@/constants/admin';
import { mockTeachers } from './data';
import { useTeacherColumns } from '../../../../hooks/useTeacherUserManageColumns';
import * as S from './style';
import * as PageS from '@/pages/admin/users/style';

type UserRole = '관리자' | '일반';
type SortOrder = 'asc' | 'desc';

export interface Teacher {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  supervisionCount: number;
  forbiddenDates?: string[];
}

interface TeachersProps {
  searchQuery: string;
  sortOrder: SortOrder;
  onOpenForbiddenDates: (teacher: Teacher) => void;
}

export default function Teachers({ searchQuery, sortOrder, onOpenForbiddenDates }: TeachersProps) {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [editingIds, setEditingIds] = useState<Set<string>>(new Set());
  const menuRef = useRef<HTMLDivElement>(null);

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
    setTeachers(teachers.map((t) => (t.id === editingTeacher.id ? editingTeacher : t)));
    setEditingTeacher(null);
    setEditingIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(teacherId);
      return newSet;
    });
  };

  const handleCancel = (teacherId: string) => {
    const teacher = teachers.find((t) => t.id === teacherId);
    if (teacher && !teacher.name && !teacher.email) {
      setTeachers(teachers.filter((t) => t.id !== teacherId));
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
    setTeachers(teachers.filter((t) => t.id !== teacherId));
    setEditingIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(teacherId);
      return newSet;
    });
    setOpenMenuId(null);
  };

  const handleAdd = () => {
    const newTeacher: Teacher = {
      id: String(Date.now()),
      role: USER_ROLES.NORMAL,
      name: '',
      email: '',
      supervisionCount: 0,
    };
    setTeachers([...teachers, newTeacher]);
    setEditingTeacher(newTeacher);
    setEditingIds((prev) => new Set(prev).add(newTeacher.id));
  };

  const filteredTeachers = teachers
    .filter((teacher) => teacher.name.includes(searchQuery) || teacher.email.includes(searchQuery))
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.supervisionCount - b.supervisionCount;
      if (sortOrder === 'desc') return b.supervisionCount - a.supervisionCount;
      return 0;
    });

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
    <>
      <S.TableWrapper>
        <TableLayout columns={columns} data={filteredTeachers} renderActions={renderActions} />
      </S.TableWrapper>
      <PageS.AddButton onClick={handleAdd}>
        <img src="/icons/common/plusBlue.svg" alt="추가" />
        <span>추가</span>
      </PageS.AddButton>
    </>
  );
}
