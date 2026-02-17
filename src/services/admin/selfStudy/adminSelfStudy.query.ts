import { useQuery } from '@tanstack/react-query';
import type { SelfStudyQuarterlyItem } from '@/types/selfStudy';
import { fetchSelfStudyQuarterly } from './adminSelfStudy.api';
import { queryOptions } from '@tanstack/react-query';
import { getAdditionalSelfStudy } from './adminSelfStudy.api';

export const adminSelfStudyQueryKeys = {
  all: ['adminSelfStudy'] as const,
  quarterly: (year: number, branch: number, grade: number) =>
    [...adminSelfStudyQueryKeys.all, 'quarterly', year, branch, grade] as const,
};

export const selfStudyQuery = {
  additional: (year: number) =>
    queryOptions({
      queryKey: ['selfStudy.additional', year],
      queryFn: () => getAdditionalSelfStudy(year),
      staleTime: 1000 * 60 * 5,
    }),
};

export const useSelfStudyQuarterlyQuery = (
  year: number,
  branch: number,
  grade: number
) =>
  useQuery<SelfStudyQuarterlyItem[]>({
    queryKey: adminSelfStudyQueryKeys.quarterly(year, branch, grade),
    queryFn: () => fetchSelfStudyQuarterly({ year, branch, grade }),
    enabled: year > 0 && branch > 0 && grade > 0,
  });
