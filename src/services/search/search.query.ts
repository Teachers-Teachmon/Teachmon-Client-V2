import { queryOptions } from '@tanstack/react-query';
import { searchStudents, searchPlaces, searchTeams } from './search.api';

export const studentQuery = {
  search: (query?: string) =>
    queryOptions({
      queryKey: ['student.search', query],
      queryFn: () => searchStudents(query),
      enabled: !!query && query.length > 0,
    }),
};

export const placeQuery = {
  search: (query?: string) =>
    queryOptions({
      queryKey: ['place.search', query],
      queryFn: () => searchPlaces(query),
      enabled: !!query && query.length > 0,
    }),
};

export const teamQuery = {
  search: (query?: string) =>
    queryOptions({
      queryKey: ['team.search', query],
      queryFn: () => searchTeams(query),
      enabled: !!query && query.length > 0,
    }),
};
