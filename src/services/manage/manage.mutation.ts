import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteExitHistory } from './manage.api';

export const useDeleteExitHistoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExitHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['query.weeklyExitHistory'] });
    },
  });
};
