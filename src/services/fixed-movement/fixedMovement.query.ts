import { queryOptions } from '@tanstack/react-query';
import { getFixedMovements } from './fixedMovement.api';

export const fixedMovementQuery = {
  list: () =>
    queryOptions({
      queryKey: ['fixedMovement.list'],
      queryFn: getFixedMovements,
      staleTime: 1000 * 60 * 5,
    }),
};
