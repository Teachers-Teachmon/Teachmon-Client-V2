import { useState, useRef, useEffect } from 'react';
import TableLayout, { type TableColumn } from '@/components/layout/table';
import StatusBadge, { type StatusType } from '@/components/ui/status';
import Button from '@/components/ui/button';
import Dropdown from '@/components/ui/input/dropdown';
import TextInput from '@/components/ui/input/text-input';
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

const mockTeachers: Teacher[] = [
  { id: '1', role: '관리자', name: '이혜정', email: 'teacher068@bssm.hs.kr', supervisionCount: 36 },
  { id: '2', role: '일반', name: '이혜정', email: 'teacher068@bssm.hs.kr', supervisionCount: 36 },
];

export default function Teachers({ searchQuery, sortOrder, onOpenForbiddenDates }: TeachersProps) {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [editingIds, setEditingIds] = useState<Set<string>>(new Set());
  const menuRef = useRef<HTMLDivElement>(null);

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
      role: '일반',
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

  const columns: TableColumn<Teacher>[] = [
    {
      key: 'role',
      header: '권한',
      width: '160px',
      render: (row) =>
        editingIds.has(row.id) ? (
          <div style={{ width: '100%' }}>
            <Dropdown
              items={['관리자', '일반']}
              value={editingTeacher?.id === row.id ? editingTeacher.role : row.role}
              onChange={(value) => {
                if (editingTeacher?.id === row.id) {
                  setEditingTeacher({ ...editingTeacher, role: value as UserRole });
                } else {
                  setEditingTeacher({ ...row, role: value as UserRole });
                }
              }}
              customHeight="50px"
              customWidth="100%"
            />
          </div>
        ) : (
          <StatusBadge status={row.role as StatusType} />
        ),
    },
    {
      key: 'name',
      header: '이름',
      width: '150px',
      render: (row) =>
        editingIds.has(row.id) ? (
          <TextInput
            value={editingTeacher?.id === row.id ? editingTeacher.name : row.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (editingTeacher?.id === row.id) {
                setEditingTeacher({ ...editingTeacher, name: e.target.value });
              } else {
                setEditingTeacher({ ...row, name: e.target.value });
              }
            }}
            customPadding="0 14px"
            customFontSize="16px"
          />
        ) : (
          row.name
        ),
    },
    {
      key: 'email',
      header: '이메일',
      width: '320px',
      render: (row) =>
        editingIds.has(row.id) ? (
          <div style={{ width: '250px' }}>
            <TextInput
              value={editingTeacher?.id === row.id ? editingTeacher.email : row.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (editingTeacher?.id === row.id) {
                  setEditingTeacher({ ...editingTeacher, email: e.target.value });
                } else {
                  setEditingTeacher({ ...row, email: e.target.value });
                }
              }}
              customPadding="0 14px"
              customFontSize="16px"
            />
          </div>
        ) : (
          row.email
        ),
    },
    {
      key: 'supervisionCount',
      header: '자습감독 횟수',
      width: '150px',
      render: (row) => `${row.supervisionCount}회`,
    },
  ];

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
