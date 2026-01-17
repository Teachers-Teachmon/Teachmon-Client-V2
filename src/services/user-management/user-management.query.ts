import { queryOptions } from '@tanstack/react-query';
import { getAllTeachers, getForbiddenDates, getAllStudents } from './user-management.api';

export const userManagementQuery = {
  teachers: () =>
    queryOptions({
      queryKey: ['userManagement.teachers'],
      queryFn: getAllTeachers,
    }),
  
  forbiddenDates: () =>
    queryOptions({
      queryKey: ['userManagement.forbiddenDates'],
      queryFn: getForbiddenDates,
    }),
  
  students: () =>
    queryOptions({
      queryKey: ['userManagement.students'],
      queryFn: getAllStudents,
    }),
};
