import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBranch } from './branch.api';

export const useCreateBranchMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBranch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['query.branchList'] });
    },
  });
};
