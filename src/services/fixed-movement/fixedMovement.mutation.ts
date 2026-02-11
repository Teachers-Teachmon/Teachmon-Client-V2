import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createFixedMovement, updateFixedMovement } from './fixedMovement.api';
import type { UpdateFixedMovementRequest } from '@/types/fixedMovement';

export const useCreateFixedMovementMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFixedMovement,
    onSuccess: ({ message }) => {
      toast.success(message || '고정 이석을 작성하였습니다.');
      queryClient.invalidateQueries({ queryKey: ['fixedMovement.list'] });
      navigate('/admin/fixed-movement');
    },
    onError: () => {
      toast.error('고정 이석 작성에 실패했습니다.');
    },
  });
};

export const useUpdateFixedMovementMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateFixedMovementRequest }) =>
      updateFixedMovement(id, data),
    onSuccess: ({ message }) => {
      toast.success(message || '고정 이석을 수정하였습니다.');
      queryClient.invalidateQueries({ queryKey: ['fixedMovement.list'] });
      navigate('/admin/fixed-movement');
    },
    onError: () => {
      toast.error('고정 이석 수정에 실패했습니다.');
    },
  });
};
