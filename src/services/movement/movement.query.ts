import { queryOptions } from '@tanstack/react-query';
import { getLeaveSeatList, getLeaveSeatDetail, type GetLeaveSeatListParams } from './movement.api';

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
