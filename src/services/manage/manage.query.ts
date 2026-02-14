import { queryOptions } from '@tanstack/react-query';
import { getWeeklyExitHistory } from './manage.api';

export const manageQuery = {
  weeklyExitHistory: () =>
    queryOptions({
      queryKey: ['query.weeklyExitHistory'],
      queryFn: getWeeklyExitHistory,
    }),
};
