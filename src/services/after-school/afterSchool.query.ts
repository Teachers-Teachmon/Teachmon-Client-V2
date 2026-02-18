import { getAfterSchoolClasses } from './afterSchool.api';
import type { AfterSchoolRequestParams, AfterSchoolResponse } from '@/types/afterSchool';

export const afterSchoolQuery = {
  classes: (params: AfterSchoolRequestParams) => ({
    queryKey: ['afterSchool', 'classes', params],
    queryFn: () => getAfterSchoolClasses(params),
    select: (data: AfterSchoolResponse[]) => data,
  }),
import { queryOptions } from '@tanstack/react-query';
import { getMyTodayAfterSchool, getMyAfterSchool, getAllAfterSchool, getBranchInfo } from './afterSchool.api';
import type { AfterSchoolSearchParams } from '@/types/after-school';

export const afterSchoolQuery = {
  // 나의 오늘 방과후
  myToday: () =>
    queryOptions({
      queryKey: ['afterSchool', 'myToday'],
      queryFn: getMyTodayAfterSchool,
    }),

  // 나의 방과후 (학년별)
  my: (grade: number) =>
    queryOptions({
      queryKey: ['afterSchool', 'my', grade],
      queryFn: () => getMyAfterSchool(grade),
    }),

  // 전체 방과후 (필터링)
  all: (params: AfterSchoolSearchParams) =>
    queryOptions({
      queryKey: ['afterSchool', 'all', params],
      queryFn: () => getAllAfterSchool(params),
      enabled: !!params.grade,
    }),

  // 분기 정보
  branch: () =>
    queryOptions({
      queryKey: ['afterSchool', 'branch'],
      queryFn: getBranchInfo,
    }),
};
