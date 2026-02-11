import { queryOptions } from '@tanstack/react-query';
import { getTeams } from './team.api';

export const teamQuery = {
  list: () =>
    queryOptions({
      queryKey: ['team.list'],
      queryFn: getTeams,
      staleTime: 1000 * 60 * 5,
    }),
};
