import { queryOptions } from '@tanstack/react-query';
import { getCurrentUser } from './auth.api';

export const authQuery = {
  currentUser: () =>
    queryOptions({
      queryKey: ['auth.currentUser'],
      queryFn: getCurrentUser,
      staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    }),
};
