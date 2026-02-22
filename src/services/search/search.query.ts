import { queryOptions } from '@tanstack/react-query';
import { searchStudents, searchPlaces, searchTeams, searchTeachers } from './search.api';

const hasQuery = (query?: string) => Boolean(query && query.length > 0);

export const searchQuery = {
  students: (query?: string) =>
    queryOptions({
      queryKey: ['student.search', query],
      queryFn: () => searchStudents(query ?? ''),
      enabled: hasQuery(query),
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

export const studentQuery = {
  search: searchQuery.students,
};

export const placeQuery = {
  search: searchQuery.places,
};

export const teamQuery = {
  search: searchQuery.teams,
};
