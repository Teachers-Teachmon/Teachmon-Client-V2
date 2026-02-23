import { queryOptions } from '@tanstack/react-query';
import { getWeeklyExitHistory } from './manage.api';
import type {
  GetStudentScheduleParams,
  GetPlacesByFloorParams,
  GetAllFloorsStatusParams,
  GetScheduleHistoryParams,
  Period,
} from '@/types/manage';
import {
  getStudentSchedule,
  getPlaceSchedule,
  getPlacesByFloor,
  getAllFloorsStatus,
  getDailyEvasion,
  getScheduleHistory,
} from './manage.api';

export const manageQuery = {
  studentSchedule: (params: GetStudentScheduleParams) =>
    queryOptions({
      queryKey: ['manage.studentSchedule', params],
      queryFn: () => getStudentSchedule(params),
    }),

  placeSchedule: (placeId: number, params?: { day?: string; period?: Period }) =>
    queryOptions({
      queryKey: ['manage.placeSchedule', placeId, params],
      queryFn: () => getPlaceSchedule(placeId, params),
    }),

  placesByFloor: (params: GetPlacesByFloorParams) =>
    queryOptions({
      queryKey: ['manage.placesByFloor', params],
      queryFn: () => getPlacesByFloor(params),
    }),

  allFloorsStatus: (params?: GetAllFloorsStatusParams) =>
    queryOptions({
      queryKey: ['manage.allFloorsStatus', params],
      queryFn: () => getAllFloorsStatus(params),
    }),

  dailyEvasion: (day: string) =>
    queryOptions({
      queryKey: ['manage.dailyEvasion', day],
      queryFn: () => getDailyEvasion(day),
    }),

  scheduleHistory: (params?: GetScheduleHistoryParams) =>
    queryOptions({
      queryKey: ['manage.scheduleHistory', params],
      queryFn: () => getScheduleHistory(params),
    }),
  weeklyExitHistory: () =>
    queryOptions({
      queryKey: ['query.weeklyExitHistory'],
      queryFn: getWeeklyExitHistory,
    }),
};
