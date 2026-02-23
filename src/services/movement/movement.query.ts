import { queryOptions } from '@tanstack/react-query';
import { getLeaveSeatList, getLeaveSeatDetail } from './movement.api';
import type { GetLeaveSeatListParams } from '@/types/movement';

export const movementQuery = {
  list: (params: GetLeaveSeatListParams) =>
    queryOptions({
      queryKey: ['movement.list', params],
      queryFn: () => getLeaveSeatList(params),
    }),

  detail: (leaveseatId: string) =>
    queryOptions({
      queryKey: ['movement.detail', leaveseatId],
      queryFn: () => getLeaveSeatDetail(leaveseatId),
    }),
};
