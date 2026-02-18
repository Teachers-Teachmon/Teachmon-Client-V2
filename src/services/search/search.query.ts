import { queryOptions } from '@tanstack/react-query';
import { searchStudents, searchPlaces, searchTeams, searchTeachers } from './search.api';

const normalizeQuery = (query?: string) => query ?? '';

export const searchQuery = {
  students: (query: string) =>
    queryOptions({
      queryKey: ['student.search', query],
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

export const studentQuery = {
  search: (query?: string) => searchQuery.students(normalizeQuery(query)),
};

export const placeQuery = {
  search: (query?: string) => searchQuery.places(normalizeQuery(query)),
};

export const teamQuery = {
  search: (query?: string) => searchQuery.teams(normalizeQuery(query)),
};
