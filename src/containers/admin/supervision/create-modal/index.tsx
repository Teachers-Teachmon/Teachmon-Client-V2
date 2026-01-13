import Modal from '@/components/layout/modal';
import DateInput from '@/components/ui/input/date';
import Button from '@/components/ui/button';
import { useAdminSupervision } from '@/hooks/useAdminSupervision';
import * as S from './style';

export default function AdminSupervisionCreateModal() {
  const {
    isCreateModalOpen,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    setIsCreateModalOpen,
    handleCreate,
  } = useAdminSupervision();

  return (
    <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} padding="2.5rem">
      <S.ModalContainer>
        <S.ModalTitle>자습감독 일정 생성</S.ModalTitle>
        <S.DateRangeContainer>
          <DateInput label="Date" value={startDate} onChange={setStartDate} />
          <S.DateSeparator>~</S.DateSeparator>
          <DateInput label="Date" value={endDate} onChange={setEndDate} />
        </S.DateRangeContainer>
        <S.ModalButtonGroup>
          <Button variant="cancel" text="취소" onClick={() => setIsCreateModalOpen(false)} width="50%" />
          <Button variant="confirm" text="생성" onClick={handleCreate} width="50%" />
        </S.ModalButtonGroup>
      </S.ModalContainer>
    </Modal>
  );
}
