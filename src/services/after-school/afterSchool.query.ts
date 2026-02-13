import { useQuery } from '@tanstack/react-query';
import type { AffordableReinforcement, PlaceSearchResult } from '@/types/afterSchool';
import { fetchAffordableReinforcement, searchPlace } from './afterSchool.api';

export const afterSchoolQueryKeys = {
  all: ['afterSchool'] as const,
  affordable: (month: number, afterschoolid: string | number) =>
    [...afterSchoolQueryKeys.all, 'affordable', month, String(afterschoolid)] as const,
  placeSearch: (query: string) =>
    [...afterSchoolQueryKeys.all, 'placeSearch', query] as const,
};

export const useAffordableReinforcementQuery = (
  month: number,
  afterschoolid?: string | number
) =>
  useQuery<AffordableReinforcement[]>({
    queryKey: afterSchoolQueryKeys.affordable(month, afterschoolid ?? ''),
    queryFn: () =>
      fetchAffordableReinforcement({
        month,
        afterschoolid: afterschoolid ?? '',
      }),
    enabled: !!afterschoolid,
  });

export const usePlaceSearchQuery = (query: string) =>
  useQuery<PlaceSearchResult[]>({
    queryKey: afterSchoolQueryKeys.placeSearch(query),
    queryFn: () => searchPlace(query),
    enabled: query.trim().length > 0,
  });
import { queryOptions } from '@tanstack/react-query';
import { getMyTodayAfterSchool, getMyAfterSchool, getAllAfterSchool } from './afterSchool.api';
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
};
