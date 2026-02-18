import { queryOptions } from '@tanstack/react-query';
import { getTeams, getTeamById } from './team.api';

export const teamQuery = {
  list: () =>
    queryOptions({
      queryKey: ['team.list'],
      queryFn: getTeams,
      staleTime: 1000 * 60 * 5,
    }),
  detail: (id?: string) =>
    queryOptions({
      queryKey: ['team.detail', id],
      queryFn: () => id ? getTeamById(id) : null,
      enabled: !!id,
      staleTime: 1000 * 60 * 5,
    }),
};
