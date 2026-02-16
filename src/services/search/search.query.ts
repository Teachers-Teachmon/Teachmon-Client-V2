import { queryOptions } from '@tanstack/react-query';
import { searchStudents, searchPlaces, searchTeams, searchTeachers } from './search.api';

export const searchQuery = {
  students: (query: string) =>
    queryOptions({
      queryKey: ['search.students', query],
      queryFn: () => searchStudents(query),
      enabled: query.length > 0,
    }),

  places: (query: string) =>
    queryOptions({
      queryKey: ['search.places', query],
      queryFn: () => searchPlaces(query),
      enabled: query.length > 0,
    }),

  teachers: (query: string) =>
    queryOptions({
      queryKey: ['search.teachers', query],
      queryFn: () => searchTeachers(query),
      enabled: query.length > 0,
    }),

  teams: (query: string) =>
    queryOptions({
      queryKey: ['search.teams', query],
      queryFn: () => searchTeams(query),
      enabled: query.length > 0,
    }),
};
