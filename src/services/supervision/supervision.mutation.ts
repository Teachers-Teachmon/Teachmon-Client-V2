import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { requestSupervisionExchange } from './supervision.api';

export const useRequestSupervisionExchangeMutation = () =>
  useMutation({
    mutationFn: requestSupervisionExchange,
    onSuccess: () => {
      toast.success('교체 요청이 완료되었습니다.');
    },
    onError: () => {
      toast.error('교체 요청에 실패했습니다.');
    },
  });
