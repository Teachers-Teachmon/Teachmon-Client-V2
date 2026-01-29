import { queryOptions } from '@tanstack/react-query';
import {
  getStudentSchedule,
  getPlaceSchedule,
  getPlacesByFloor,
  getAllFloorsStatus,
  getDailyEvasion,
  getScheduleHistory,
  type GetStudentScheduleParams,
  type GetPlacesByFloorParams,
  type GetAllFloorsStatusParams,
} from './manage.api';

export const manageQuery = {
  studentSchedule: (params: GetStudentScheduleParams) =>
    queryOptions({
      queryKey: ['manage.studentSchedule', params],
      queryFn: () => getStudentSchedule(params),
    }),

  placeSchedule: (placeId: number) =>
    queryOptions({
      queryKey: ['manage.placeSchedule', placeId],
      queryFn: () => getPlaceSchedule(placeId),
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

  dailyEvasion: (date: string) =>
    queryOptions({
      queryKey: ['manage.dailyEvasion', date],
      queryFn: () => getDailyEvasion(date),
    }),

  scheduleHistory: (studentId?: number) =>
    queryOptions({
      queryKey: ['manage.scheduleHistory', studentId],
      queryFn: () => getScheduleHistory(studentId),
    }),
};
