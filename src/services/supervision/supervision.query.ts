import { useQuery } from '@tanstack/react-query';
import type { SupervisionDay } from '@/types/supervision';
import { fetchSupervision } from './supervision.api';

export const supervisionQueryKeys = {
  all: ['supervision'] as const,
  search: (month: number, query?: string) =>
    [...supervisionQueryKeys.all, 'search', month, query ?? ''] as const,
};

export const useSupervisionSearchQuery = (month: number, query: string) =>
  useQuery<SupervisionDay[]>({
    queryKey: supervisionQueryKeys.search(month, query),
    queryFn: () => fetchSupervision({ month, query }),
    enabled: month > 0,
  });
