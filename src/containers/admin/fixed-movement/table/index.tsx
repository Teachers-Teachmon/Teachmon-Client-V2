import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import TableLayout, { type TableColumn } from '@/components/layout/table';
import Button from '@/components/ui/button';
import Loading from '@/components/ui/loading';
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
  const [selectedMovementId, setSelectedMovementId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigate(`/admin/fixed-movement/edit/${id}`);
  };

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
  };

  const handleRowClick = (movement: FixedMovement) => {
    setSelectedMovementId(movement.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovementId(null);
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

  if (isLoading) return <Loading />;
  if (isError) {
    toast.error('데이터를 불러오는데 실패했습니다.');
    return <S.TableWrapper />;
  }

  return (
    <S.TableWrapper>
      <TableLayout 
        columns={columns} 
        data={filteredMovements} 
        renderActions={renderActions}
        onRowClick={handleRowClick}
      />
      <FixedMovementDetailModal 
        movementId={selectedMovementId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </S.TableWrapper>
  );
}
