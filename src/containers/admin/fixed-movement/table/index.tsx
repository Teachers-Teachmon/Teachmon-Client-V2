import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableLayout, { type TableColumn } from '@/components/layout/table';
import Button from '@/components/ui/button';
import { WEEKDAYS, MOCK_FIXED_MOVEMENTS } from '@/constants/fixedMovement';
import type { FixedMovement } from '@/types/fixedMovement';
import FixedMovementDetailModal from '../detail-modal';
import * as S from './style';

interface FixedMovementTableProps {
  searchQuery: string;
}

export default function FixedMovementTable({ searchQuery }: FixedMovementTableProps) {
  const navigate = useNavigate();
  const [movements, setMovements] = useState<FixedMovement[]>(MOCK_FIXED_MOVEMENTS);
  const [selectedMovement, setSelectedMovement] = useState<FixedMovement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigate(`/admin/fixed-movement/edit/${id}`);
  };

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setMovements(movements.filter(m => m.id !== id));
  };

  const handleRowClick = (movement: FixedMovement) => {
    setSelectedMovement(movement);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovement(null);
  };

  const filteredMovements = movements.filter(
    (movement) => 
      movement.location.includes(searchQuery) ||
      movement.students.some(s => s.name.includes(searchQuery))
  );

  const columns: TableColumn<FixedMovement>[] = [
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

  const renderActions = (row: FixedMovement) => (
    <S.ActionCell>
      <Button text="수정" variant="confirm" width="100px" onClick={(e) => handleEdit(row.id, e)} />
      <Button text="삭제" variant="delete" width="100px" onClick={(e) => handleDelete(row.id, e)} />
    </S.ActionCell>
  );

  return (
    <S.TableWrapper>
      <TableLayout 
        columns={columns} 
        data={filteredMovements} 
        renderActions={renderActions}
        onRowClick={handleRowClick}
      />
      <FixedMovementDetailModal 
        movement={selectedMovement}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </S.TableWrapper>
  );
}
