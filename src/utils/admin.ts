import type { CalendarEvent } from '@/types/calendar';
import type { BusinessTripSchedule, MakeupSchedule } from '@/types/admin';
import {
  parseLocalDate,
  formatDateString,
  formatDateKorean,
  transformPeriodScheduleToCalendarEvent,
} from './common';

// 공통 함수 재export
export { parseLocalDate, formatDateString, formatDateKorean };

// Date 객체를 받아서 포맷하는 함수 (modal에서 사용)
export const formatDate = (date: Date): string => {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export const transformBusinessTripDatesToCalendarEvents = (dates: string[]): CalendarEvent[] => {
  return dates.map((date, index) => ({
    id: `business-trip-${date}-${index}`,
    date: parseLocalDate(date),
    label: '출장 가능',
    bgColor: '#0085FF0D',
    textColor: '#0085FF',
  }));
};

export const transformBusinessTripToCalendarEvents = (
  data: BusinessTripSchedule[]
): CalendarEvent[] => {
  return data.map((item, index) => 
    transformPeriodScheduleToCalendarEvent(
      {
        day: item.day,
        startPeriod: item.startPeriod,
        endPeriod: item.endPeriod,
      },
      index,
      'business-trip',
      '보강'
    )
  );
};

export const transformMakeupToCalendarEvents = (
  data: MakeupSchedule[]
): CalendarEvent[] => {
  return data.map((item, index) => 
    transformPeriodScheduleToCalendarEvent(
      {
        day: item.day,
        startPeriod: item.startPeriod,
        endPeriod: item.endPeriod,
      },
      index,
      'makeup',
      '보강'
    )
  );
};
