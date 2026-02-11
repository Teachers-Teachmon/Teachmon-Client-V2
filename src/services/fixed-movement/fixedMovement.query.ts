import { queryOptions } from '@tanstack/react-query';
import { getFixedMovements, getFixedMovementDetail } from './fixedMovement.api';

export const fixedMovementQuery = {
  list: () =>
    queryOptions({
      queryKey: ['fixedMovement.list'],
      queryFn: getFixedMovements,
      staleTime: 1000 * 60 * 5,
    }),

  detail: (id?: string) =>
    queryOptions({
      queryKey: ['fixedMovement.detail', id],
      queryFn: () => getFixedMovementDetail(id!),
      enabled: !!id,
    }),
};
