import type { AfterSchoolTeacher, BusinessTripSchedule, MakeupSchedule } from '@/types/admin';

export const SAMPLE_TEACHERS: AfterSchoolTeacher[] = [
  { id: 1, name: '한국사 방과후(이혜정)' },
  { id: 2, name: '영어 방과후(김철수)' },
  { id: 3, name: '수학 방과후(박영희)' },
];

export const SAMPLE_TRIP_SCHEDULES: BusinessTripSchedule[] = [
  { day: '2026-01-01', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-02', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-08', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-10', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-13', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-13', startPeriod: 10, endPeriod: 11 },
  { day: '2026-01-14', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-16', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-17', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-17', startPeriod: 10, endPeriod: 11 },
  { day: '2026-01-22', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-30', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-31', startPeriod: 8, endPeriod: 9 },
];

export const SAMPLE_MAKEUP_SCHEDULES: MakeupSchedule[] = [
  { day: '2026-01-01', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-02', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-08', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-10', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-13', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-13', startPeriod: 10, endPeriod: 11 },
  { day: '2026-01-14', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-16', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-17', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-17', startPeriod: 10, endPeriod: 11 },
  { day: '2026-01-22', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-30', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-31', startPeriod: 8, endPeriod: 9 },
];

export const LOCATION_OPTIONS = ['1학년 1반', '1학년 2반', '음악실', '미술실'];
