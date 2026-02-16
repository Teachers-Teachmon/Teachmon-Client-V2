import { queryOptions } from '@tanstack/react-query';
import { searchStudents } from './search.api';

export const searchQuery = {
  students: (query?: string) =>
    queryOptions({
      queryKey: ['search.students', query],
      queryFn: () => searchStudents(query),
    }),
};
