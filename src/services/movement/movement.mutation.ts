import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createLeaveSeat, updateLeaveSeat, deleteLeaveSeat } from './movement.api';

export const useCreateLeaveSeatMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLeaveSeat,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['movement.list'] });
    },
    onError: () => {
      toast.error('이석 작성에 실패했습니다.');
    },
  });
};

export const useUpdateLeaveSeatMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ leaveseatId, data }: { leaveseatId: string; data: Parameters<typeof updateLeaveSeat>[1] }) =>
      updateLeaveSeat(leaveseatId, data),
    onSuccess: (data, variables) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['movement.list'] });
      queryClient.invalidateQueries({ queryKey: ['movement.detail', variables.leaveseatId] });
    },
    onError: () => {
      toast.error('이석 수정에 실패했습니다.');
    },
  });
};

export const useDeleteLeaveSeatMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLeaveSeat,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['movement.list'] });
    },
    onError: () => {
      toast.error('이석 삭제에 실패했습니다.');
    },
  });
};
