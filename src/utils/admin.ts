import type { CalendarEvent } from '@/types/calendar';
import type { BusinessTripSchedule, MakeupSchedule } from '@/types/admin';

const parseLocalDate = (date: string): Date => {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day);
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
  return data.map((item, index) => {
    const is89 = item.startPeriod === 8 && item.endPeriod === 9;
    const is1011 = item.startPeriod === 10 && item.endPeriod === 11;

    let label = '';
    let bgColor = '';
    let textColor = '';

    if (is89) {
      label = '8~9교시 보강';
      bgColor = '#0085FF0D';
      textColor = '#0085FF';
    } else if (is1011) {
      label = '10~11교시 보강';
      bgColor = '#D8CCFF';
      textColor = '#7D55FF';
    } else {
      label = `${item.startPeriod}~${item.endPeriod}교시 보강`;
      bgColor = '#F3F4F6';
      textColor = '#374151';
    }

    return {
      id: `business-trip-${item.day}-${item.startPeriod}-${index}`,
      date: parseLocalDate(item.day),
      label,
      bgColor,
      textColor,
    };
  });
};

export const transformMakeupToCalendarEvents = (
  data: MakeupSchedule[]
): CalendarEvent[] => {
  return data.map((item, index) => {
    const is89 = item.startPeriod === 8 && item.endPeriod === 9;
    const is1011 = item.startPeriod === 10 && item.endPeriod === 11;

    let label = '';
    let bgColor = '';
    let textColor = '';

    if (is89) {
      label = '8~9교시 보강';
      bgColor = '#0085FF0D';
      textColor = '#0085FF';
    } else if (is1011) {
      label = '10~11교시 보강';
      bgColor = '#D8CCFF';
      textColor = '#7D55FF';
    } else {
      label = `${item.startPeriod}~${item.endPeriod}교시 보강`;
      bgColor = '#F3F4F6';
      textColor = '#374151';
    }

    return {
      id: `makeup-${item.day}-${item.startPeriod}-${index}`,
      date: parseLocalDate(item.day),
      label,
      bgColor,
      textColor,
    };
  });
};

export const formatDate = (date: Date): string => {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export const formatDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
