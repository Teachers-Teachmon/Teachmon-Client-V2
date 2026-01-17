import { queryOptions } from '@tanstack/react-query';
import { searchTeams } from './team.api';

export const teamQuery = {
  search: (query?: string) =>
    queryOptions({
      queryKey: ['team.search', query],
      queryFn: () => searchTeams(query),
      enabled: !!query && query.length > 0,
    }),
};
