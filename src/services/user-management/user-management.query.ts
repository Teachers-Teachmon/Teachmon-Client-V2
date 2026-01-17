import { queryOptions } from '@tanstack/react-query';
import { getAllTeachers, getForbiddenDates, getAllStudents } from './user-management.api';

export const userManagementQuery = {
  teachers: (query?: string) =>
    queryOptions({
      queryKey: ['userManagement.teachers', query],
      queryFn: () => getAllTeachers(query),
    }),
  
  forbiddenDates: () =>
    queryOptions({
      queryKey: ['userManagement.forbiddenDates'],
      queryFn: getForbiddenDates,
    }),
  
  students: (query?: string) =>
    queryOptions({
      queryKey: ['userManagement.students', query],
      queryFn: () => getAllStudents(query),
    }),
};
