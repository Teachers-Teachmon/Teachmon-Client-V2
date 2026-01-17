import { queryOptions } from '@tanstack/react-query';
import { getLoginUrl } from './auth.api';

export const authQuery = {
  loginUrl: () =>
    queryOptions({
      queryKey: ['auth.loginUrl'],
      queryFn: getLoginUrl,
      staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    }),
};
