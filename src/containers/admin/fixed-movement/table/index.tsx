import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import TableLayout, { type TableColumn } from '@/components/layout/table';
import Button from '@/components/ui/button';
import { fixedMovementQuery } from '@/services/fixed-movement/fixedMovement.query';
import { toFixedMovements } from '@/utils/fixedMovementMapper';
import { getFixedMovementTableColumns } from '@/utils/fixedMovementTableColumns';
import type { FixedMovement } from '@/types/fixedMovement';
import FixedMovementDetailModal from '../detail-modal';
import * as S from './style';

interface FixedMovementTableProps {
  searchQuery: string;
}

export default function FixedMovementTable({ searchQuery }: FixedMovementTableProps) {
  const navigate = useNavigate();
  const { data: rawData, isLoading, isError } = useQuery(fixedMovementQuery.list());
  const movements = rawData ? toFixedMovements(rawData) : [];
  const [selectedMovement, setSelectedMovement] = useState<FixedMovement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigate(`/admin/fixed-movement/edit/${id}`);
  };

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
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

  const columns = getFixedMovementTableColumns();

  const renderActions = (row: FixedMovement) => (
    <S.ActionCell>
      <Button text="수정" variant="confirm" width="100px" onClick={(e) => handleEdit(row.id, e)} />
      <Button text="삭제" variant="delete" width="100px" onClick={(e) => handleDelete(row.id, e)} />
    </S.ActionCell>
  );

  if (isLoading) return <S.TableWrapper>로딩 중...</S.TableWrapper>;
  if (isError) return <S.TableWrapper>데이터를 불러오는데 실패했습니다.</S.TableWrapper>;

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
