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
