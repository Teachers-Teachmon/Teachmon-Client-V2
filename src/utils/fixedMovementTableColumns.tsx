import { WEEKDAYS } from '@/constants/fixedMovement';
import type { FixedMovement } from '@/types/fixedMovement';
import * as S from '@/containers/admin/fixed-movement/table/style';

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
      render: (row) => row.location,
    },
    {
      key: 'count',
      header: '인원',
      width: '80px',
      render: (row) => `${row.students.length}명`,
    },
    {
      key: 'students',
      header: '학생',
      width: 'auto',
      render: (row) => (
        <S.StudentList>
          {row.students.slice(0, 5).map((student, idx) => (
            <S.StudentTag key={idx}>
              {student.studentNumber} {student.name}
            </S.StudentTag>
          ))}
          {row.students.length > 4 && (
            <S.StudentTag>...</S.StudentTag>
          )}
        </S.StudentList>
      ),
    },
  ];
}
