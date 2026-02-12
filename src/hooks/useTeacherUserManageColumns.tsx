import { type TableColumn } from '@/components/layout/table';
import StatusBadge, { type StatusType } from '@/components/ui/status';
import Dropdown from '@/components/ui/input/dropdown';
import TextInput from '@/components/ui/input/text-input';
import { USER_ROLES } from '@/constants/admin';
import type { Teacher } from '../containers/admin/users/teachers/index';

type UserRole = '관리자' | '일반';

interface UseTeacherColumnsProps {
  editingIds: Set<string>;
  editingTeacher: Teacher | null;
  onEditingTeacherChange: (teacher: Teacher) => void;
}

export function useTeacherColumns({
  editingIds,
  editingTeacher,
  onEditingTeacherChange,
}: UseTeacherColumnsProps): TableColumn<Teacher>[] {
  return [
    {
      key: 'role',
      header: '권한',
      width: '160px',
      render: (row) =>
        editingIds.has(row.id) ? (
          <div style={{ width: '100%' }}>
            <Dropdown
              items={[USER_ROLES.ADMIN, USER_ROLES.NORMAL]}
              value={editingTeacher?.id === row.id ? editingTeacher.role : row.role}
              onChange={(value) => {
                const updatedTeacher = editingTeacher?.id === row.id 
                  ? { ...editingTeacher, role: value as UserRole }
                  : { ...row, role: value as UserRole };
                onEditingTeacherChange(updatedTeacher);
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
          <div style={{ width: '100%', maxWidth: '150px' }}>
            <TextInput
              value={editingTeacher?.id === row.id ? editingTeacher.name : row.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const updatedTeacher = editingTeacher?.id === row.id
                  ? { ...editingTeacher, name: e.target.value }
                  : { ...row, name: e.target.value };
                onEditingTeacherChange(updatedTeacher);
              }}
              customPadding="0 14px"
              customFontSize="16px"
            />
          </div>
        ) : (
          row.name
        ),
    },
    {
      key: 'email',
      header: '이메일',
      width: '320px',
      render: (row) =>
        editingIds.has(row.id) && row.id.startsWith('new-') ? (
          <div style={{ width: '100%', maxWidth: '250px' }}>
            <TextInput
              value={editingTeacher?.id === row.id ? editingTeacher.email : row.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const updatedTeacher = editingTeacher?.id === row.id
                  ? { ...editingTeacher, email: e.target.value }
                  : { ...row, email: e.target.value };
                onEditingTeacherChange(updatedTeacher);
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
}
