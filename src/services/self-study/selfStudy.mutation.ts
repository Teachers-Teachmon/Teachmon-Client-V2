import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createAdditionalSelfStudy, deleteAdditionalSelfStudy } from './selfStudy.api';

export const useCreateAdditionalSelfStudyMutation = (year: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAdditionalSelfStudy,
    onSuccess: ({ message }) => {
      toast.success(message || '일별 자습을 추가 설정하였습니다.');
      queryClient.invalidateQueries({ queryKey: ['selfStudy.additional', year] });
    },
    onError: () => {
      toast.error('일별 자습 추가 설정에 실패했습니다.');
    },
  });
};

export const useDeleteAdditionalSelfStudyMutation = (year: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAdditionalSelfStudy,
    onSuccess: ({ message }) => {
      toast.success(message || '일별 자습을 삭제하였습니다.');
      queryClient.invalidateQueries({ queryKey: ['selfStudy.additional', year] });
    },
    onError: () => {
      toast.error('일별 자습 삭제에 실패했습니다.');
    },
  });
};
