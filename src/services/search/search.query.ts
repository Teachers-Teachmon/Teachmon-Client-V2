import { queryOptions } from '@tanstack/react-query';
import { searchStudents, searchPlaces, searchTeams, searchTeachers } from './search.api';

const hasQuery = (query?: string) => Boolean(query && query.length > 0);

export const searchQuery = {
  students: (query?: string) =>
    queryOptions({
      queryKey: ['search.students', query],
      queryFn: () => searchStudents(query),
      enabled: query.length > 0,
    }),

  places: (query?: string) =>
    queryOptions({
      queryKey: ['search.places', query],
      queryFn: () => searchPlaces(query ?? ''),
      enabled: hasQuery(query),
    }),

  teachers: (query?: string) =>
    queryOptions({
      queryKey: ['search.teachers', query],
      queryFn: () => searchTeachers(query ?? ''),
      enabled: hasQuery(query),
    }),

  teams: (query?: string) =>
    queryOptions({
      queryKey: ['search.teams', query],
      queryFn: () => searchTeams(query ?? ''),
      enabled: hasQuery(query),
    }),
};