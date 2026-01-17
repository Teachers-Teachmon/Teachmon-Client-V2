import { queryOptions } from '@tanstack/react-query';
import { searchStudents } from './student.api';

export const studentQuery = {
  search: (query?: string) =>
    queryOptions({
      queryKey: ['student.search', query],
      queryFn: () => searchStudents(query),
      enabled: !!query && query.length > 0,
    }),
};
