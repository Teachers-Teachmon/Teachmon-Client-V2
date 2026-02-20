import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createLeaveSeat, updateLeaveSeat, deleteLeaveSeat } from './movement.api';

export const useCreateLeaveSeatMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLeaveSeat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movement.list'] });
    },
  });
};

export const useUpdateLeaveSeatMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ leaveseatId, data }: { leaveseatId: string; data: Parameters<typeof updateLeaveSeat>[1] }) =>
      updateLeaveSeat(leaveseatId, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['movement.list'] });
      queryClient.invalidateQueries({ queryKey: ['movement.detail', variables.leaveseatId] });
    },
  });
};

export const useDeleteLeaveSeatMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLeaveSeat,
    onSuccess: () => {
      toast.success('이석이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['movement.list'] });
    },
  });
};
