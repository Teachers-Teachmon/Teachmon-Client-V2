import { useQuery } from '@tanstack/react-query';
import type { AffordableScheduleItem, AfterSchoolSearchItem, PlaceSearchItem } from './adminAfterSchool.api';
import {
  fetchBusinessTripAffordable,
  fetchReinforcementAffordable,
  searchAfterSchool,
  searchPlace,
} from './adminAfterSchool.api';

export const useAdminAfterSchoolSearchQuery = (query: string) =>
  useQuery<AfterSchoolSearchItem[]>({
    queryKey: ['adminAfterSchoolSearch', query],
    queryFn: () => searchAfterSchool(query),
    enabled: query.trim().length > 0,
  });

export const useBusinessTripAffordableQuery = (month: number, afterschoolid?: number | string) =>
  useQuery<AffordableScheduleItem[]>({
    queryKey: ['adminBusinessTripAffordable', month, afterschoolid ?? ''],
    queryFn: () =>
      fetchBusinessTripAffordable({
        month,
        afterschoolid: afterschoolid ?? '',
      }),
    enabled: !!afterschoolid,
  });

export const useReinforcementAffordableQuery = (month: number, afterschoolid?: number | string) =>
  useQuery<AffordableScheduleItem[]>({
    queryKey: ['adminReinforcementAffordable', month, afterschoolid ?? ''],
    queryFn: () =>
      fetchReinforcementAffordable({
        month,
        afterschoolid: afterschoolid ?? '',
      }),
    enabled: !!afterschoolid,
  });

export const useAdminPlaceSearchQuery = (query: string) =>
  useQuery<PlaceSearchItem[]>({
    queryKey: ['adminPlaceSearch', query],
    queryFn: () => searchPlace(query),
    enabled: query.trim().length > 0,
  });
