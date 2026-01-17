import { queryOptions } from '@tanstack/react-query';
import { getSupervisionRank } from './supervision.api';

export const supervisionQuery = {
  rank: () =>
    queryOptions({
      queryKey: ['query.supervisionRank'],
      queryFn: getSupervisionRank,
    }),
};
