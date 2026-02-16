import { useState } from 'react';
import Modal from '@/components/layout/modal';
import DateInput from '@/components/ui/input/date';
import Button from '@/components/ui/button';
import { useCreateAutoScheduleMutation } from '@/services/admin/supervision/adminSupervision.mutation';
import { toast } from 'react-toastify';
import { getApiErrorMessage } from '@/utils/error';
import * as S from './style';

interface AdminSupervisionCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSupervisionCreateModal({ isOpen, onClose }: AdminSupervisionCreateModalProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const createAutoScheduleMutation = useCreateAutoScheduleMutation();

  const handleCreate = () => {
    if (!startDate || !endDate) {
      toast.error('시작일과 종료일을 모두 입력해주세요.');
      return;
    }

    createAutoScheduleMutation.mutate(
      {
        start_day: startDate,
        end_day: endDate,
      },
      {
        onSuccess: () => {
          toast.success('자습감독 일정이 생성되었습니다.');
          setStartDate('');
          setEndDate('');
          onClose();
        },
        onError: (error) => {
          toast.error(getApiErrorMessage(error, '일정 생성에 실패했습니다.'));
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} padding="2.5rem">
      <S.ModalContainer>
        <S.ModalTitle>자습감독 일정 생성</S.ModalTitle>
        <S.DateRangeContainer>
          <DateInput label="Date" value={startDate} onChange={setStartDate} />
          <S.DateSeparator>~</S.DateSeparator>
          <DateInput label="Date" value={endDate} onChange={setEndDate} />
        </S.DateRangeContainer>
        <S.ModalButtonGroup>
          <Button variant="cancel" text="취소" onClick={onClose} width="50%" />
          <Button variant="confirm" text="생성" onClick={handleCreate} width="50%" />
        </S.ModalButtonGroup>
      </S.ModalContainer>
    </Modal>
  );
}
