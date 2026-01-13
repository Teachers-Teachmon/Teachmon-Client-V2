import { type TableColumn } from '@/components/layout/table';
import TextInput from '@/components/ui/input/text-input';
import type { Student } from '../containers/admin/users/students/index';

interface UseStudentColumnsProps {
  editingIds: Set<string>;
  editingStudent: Student | null;
  onEditingStudentChange: (student: Student) => void;
}

export function useStudentColumns({
  editingIds,
  editingStudent,
  onEditingStudentChange,
}: UseStudentColumnsProps): TableColumn<Student>[] {
  return [
    {
      key: 'grade',
      header: '학년',
      width: '180px',
      render: (row) =>
        editingIds.has(row.id) ? (
          <TextInput
            value={editingStudent?.id === row.id ? editingStudent.grade : row.grade}
            onChange={(e) => {
              const updatedStudent = editingStudent?.id === row.id
                ? { ...editingStudent, grade: Number(e.target.value) }
                : { ...row, grade: Number(e.target.value) };
              onEditingStudentChange(updatedStudent);
            }}
            customPadding="0 14px"
            customFontSize="16px"
          />
        ) : (
          row.grade
        ),
    },
    {
      key: 'classNum',
      header: '반',
      width: '180px',
      render: (row) =>
        editingIds.has(row.id) ? (
          <TextInput
            value={editingStudent?.id === row.id ? editingStudent.classNum : row.classNum}
            onChange={(e) => {
              const updatedStudent = editingStudent?.id === row.id
                ? { ...editingStudent, classNum: Number(e.target.value) }
                : { ...row, classNum: Number(e.target.value) };
              onEditingStudentChange(updatedStudent);
            }}
            customPadding="0 14px"
            customFontSize="16px"
          />
        ) : (
          row.classNum
        ),
    },
    {
      key: 'number',
      header: '번호',
      width: '180px',
      render: (row) =>
        editingIds.has(row.id) ? (
          <TextInput
            value={editingStudent?.id === row.id ? editingStudent.number : row.number}
            onChange={(e) => {
              const updatedStudent = editingStudent?.id === row.id
                ? { ...editingStudent, number: Number(e.target.value) }
                : { ...row, number: Number(e.target.value) };
              onEditingStudentChange(updatedStudent);
            }}
            customPadding="0 14px"
            customFontSize="16px"
          />
        ) : (
          row.number
        ),
    },
    {
      key: 'name',
      header: '이름',
      width: '180px',
      render: (row) =>
        editingIds.has(row.id) ? (
          <TextInput
            value={editingStudent?.id === row.id ? editingStudent.name : row.name}
            onChange={(e) => {
              const updatedStudent = editingStudent?.id === row.id
                ? { ...editingStudent, name: e.target.value }
                : { ...row, name: e.target.value };
              onEditingStudentChange(updatedStudent);
            }}
            customPadding="0 14px"
            customFontSize="16px"
          />
        ) : (
          row.name
        ),
    },
  ];
}
