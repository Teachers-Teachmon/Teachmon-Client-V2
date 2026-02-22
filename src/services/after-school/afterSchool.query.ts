import { queryOptions } from '@tanstack/react-query';
import {
  getAfterSchoolClasses,
  getMyTodayAfterSchool,
  getMyAfterSchool,
  getAllAfterSchool,
  getBranchInfo,
} from './afterSchool.api';
import type { AfterSchoolRequestParams, AfterSchoolResponse } from '@/types/afterSchool';
import type { AfterSchoolSearchParams } from '@/types/after-school';

export const afterSchoolQuery = {
  classes: (params: AfterSchoolRequestParams) =>
    queryOptions({
      queryKey: ['afterSchool', 'classes', params],
      queryFn: () => getAfterSchoolClasses(params),
      select: (data: AfterSchoolResponse[]) => data,
    }),

  myToday: () =>
    queryOptions({
      queryKey: ['afterSchool', 'myToday'],
      queryFn: getMyTodayAfterSchool,
    }),

  my: (grade: number) =>
    queryOptions({
      queryKey: ['afterSchool', 'my', grade],
      queryFn: () => getMyAfterSchool(grade),
    }),

  all: (params: AfterSchoolSearchParams) =>
    queryOptions({
      queryKey: ['afterSchool', 'all', params],
      queryFn: () => getAllAfterSchool(params),
      enabled: !!params.grade,
    }),

  branch: () =>
    queryOptions({
      queryKey: ['afterSchool', 'branch'],
      queryFn: getBranchInfo,
    }),
};
