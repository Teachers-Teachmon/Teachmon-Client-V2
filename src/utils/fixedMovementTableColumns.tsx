import { WEEKDAYS } from '@/constants/fixedMovement';
import type { FixedMovement } from '@/types/fixedMovement';
import StudentListWithOverflow from '@/containers/admin/fixed-movement/table/studentList';
import { LocationCell } from '@/containers/admin/fixed-movement/table/style';

export function getFixedMovementTableColumns(): import('@/components/layout/table').TableColumn<FixedMovement>[] {
  return [
    {
      key: 'day',
      header: '요일',
      width: '100px',
      render: (row) => WEEKDAYS[row.day as keyof typeof WEEKDAYS],
    },
    {
      key: 'period',
      header: '교시',
      width: '120px',
      render: (row) => row.period,
    },
    {
      key: 'location',
      header: '장소',
      width: '150px',
      render: (row) => <LocationCell>{row.location}</LocationCell>,
    },
    {
      key: 'count',
      header: '인원',
      width: '80px',
      render: (row) => `${row.personnel}명`,
    },
    {
      key: 'students',
      header: '학생',
      width: '1fr',
      render: (row) => (
        <StudentListWithOverflow students={row.students.map(student => ({ ...student, studentNumber: String(student.studentNumber) }))} maxVisible={5} />
      ),
    },
  ];
}
