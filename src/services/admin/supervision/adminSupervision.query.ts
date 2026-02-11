import { useQuery } from '@tanstack/react-query';
import type { SupervisionDay, SupervisionRank } from '@/types/supervision';
import {
  fetchSupervision,
  fetchSupervisionRank,
} from './adminSupervision.api';

export const adminSupervisionQueryKeys = {
  all: ['adminSupervision'] as const,
  supervision: (month: number, query: string) =>
    [...adminSupervisionQueryKeys.all, 'supervision', month, query] as const,
  rank: (query: string, order: 'asc' | 'desc') =>
    [...adminSupervisionQueryKeys.all, 'rank', query, order] as const,
  autoSchedule: (startDay: string, endDay: string) =>
    [...adminSupervisionQueryKeys.all, 'autoSchedule', startDay, endDay] as const,
};

export const useAdminSupervisionQuery = (month: number, query = '') =>
  useQuery<SupervisionDay[]>({
    queryKey: adminSupervisionQueryKeys.supervision(month, query),
    queryFn: () => fetchSupervision({ month, query }),
    enabled: month > 0,
  });

export const useSupervisionRankQuery = (query = '', order: 'asc' | 'desc' = 'asc') =>
  useQuery<SupervisionRank[]>({
    queryKey: adminSupervisionQueryKeys.rank(query, order),
    queryFn: () => fetchSupervisionRank({ query, order }),
  });
