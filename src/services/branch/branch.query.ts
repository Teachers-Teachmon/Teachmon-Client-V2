import { queryOptions } from '@tanstack/react-query';
import { getBranchList } from './branch.api';

export const branchQuery = {
  list: () =>
    queryOptions({
      queryKey: ['query.branchList'],
      queryFn: getBranchList,
    }),
};
