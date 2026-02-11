import { queryOptions } from '@tanstack/react-query';
import { getAdditionalSelfStudy } from './selfStudy.api';

export const selfStudyQuery = {
  additional: (year: number) =>
    queryOptions({
      queryKey: ['selfStudy.additional', year],
      queryFn: () => getAdditionalSelfStudy(year),
      staleTime: 1000 * 60 * 5,
    }),
};
