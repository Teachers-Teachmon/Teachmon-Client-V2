import { queryOptions } from '@tanstack/react-query';
import { getAllTeachers, getForbiddenDates } from './user-management.api';

export const userManagementQuery = {
  teachers: (query?: string) =>
    queryOptions({
      queryKey: ['userManagement.teachers', query],
      queryFn: () => getAllTeachers(query),
    }),
  
  forbiddenDates: (teacherId: number) =>
    queryOptions({
      queryKey: ['userManagement.forbiddenDates', teacherId],
      queryFn: () => getForbiddenDates(teacherId),
    }),
};
