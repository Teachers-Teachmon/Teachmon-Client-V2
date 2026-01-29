import type { Period } from '@/services/manage/manage.api';

interface TimeRange {
  start: { hour: number; minute: number };
  end: { hour: number; minute: number };
}

// 교시별 시간표
const PERIOD_SCHEDULE: Record<string, TimeRange> = {
  ONE_PERIOD: { start: { hour: 8, minute: 40 }, end: { hour: 9, minute: 30 } },
  TWO_PERIOD: { start: { hour: 9, minute: 40 }, end: { hour: 10, minute: 30 } },
  THREE_PERIOD: { start: { hour: 10, minute: 40 }, end: { hour: 11, minute: 30 } },
  FOUR_PERIOD: { start: { hour: 11, minute: 40 }, end: { hour: 12, minute: 30 } },
  // 점심시간: 12:30 ~ 13:20
  FIVE_PERIOD: { start: { hour: 13, minute: 20 }, end: { hour: 14, minute: 10 } },
  SIX_PERIOD: { start: { hour: 14, minute: 20 }, end: { hour: 15, minute: 10 } },
  SEVEN_PERIOD: { start: { hour: 15, minute: 20 }, end: { hour: 16, minute: 10 } },
  // 쉬는시간: 16:10 ~ 16:30
  EIGHT_AND_NINE_PERIOD: { start: { hour: 16, minute: 30 }, end: { hour: 18, minute: 10 } },
  // 저녁시간: 18:10 ~ 19:00
  TEN_AND_ELEVEN_PERIOD: { start: { hour: 19, minute: 0 }, end: { hour: 20, minute: 40 } },
};

/**
 * 시간을 분 단위로 변환
 */
const timeToMinutes = (hour: number, minute: number): number => {
  return hour * 60 + minute;
};

/**
 * 현재 시간이 특정 시간 범위 내에 있는지 확인
 */
const isInTimeRange = (currentMinutes: number, range: TimeRange): boolean => {
  const startMinutes = timeToMinutes(range.start.hour, range.start.minute);
  const endMinutes = timeToMinutes(range.end.hour, range.end.minute);
  return currentMinutes >= startMinutes && currentMinutes < endMinutes;
};

/**
 * 현재 시간을 기준으로 교시를 반환
 * 쉬는시간, 점심시간, 저녁시간은 다음 교시로 반환
 */
export const getCurrentPeriod = (date: Date = new Date()): Period | null => {
  const currentMinutes = timeToMinutes(date.getHours(), date.getMinutes());

  // 각 교시 확인
  for (const [period, range] of Object.entries(PERIOD_SCHEDULE)) {
    if (isInTimeRange(currentMinutes, range)) {
      return period as Period;
    }
  }

  // 쉬는시간 및 특별 시간대 처리
  const lunchStart = timeToMinutes(12, 30);
  const lunchEnd = timeToMinutes(13, 20);
  if (currentMinutes >= lunchStart && currentMinutes < lunchEnd) {
    return 'FIVE_PERIOD'; // 점심시간은 5교시로
  }

  const breakAfterSeven = timeToMinutes(16, 10);
  const eightNineStart = timeToMinutes(16, 30);
  if (currentMinutes >= breakAfterSeven && currentMinutes < eightNineStart) {
    return 'EIGHT_AND_NINE_PERIOD'; // 7교시 후 쉬는시간은 8~9교시로
  }

  const dinnerStart = timeToMinutes(18, 10);
  const dinnerEnd = timeToMinutes(19, 0);
  if (currentMinutes >= dinnerStart && currentMinutes < dinnerEnd) {
    return 'TEN_AND_ELEVEN_PERIOD'; // 저녁시간은 10~11교시로
  }

  // 쉬는시간 처리 (각 교시 사이 10분)
  const oneEnd = timeToMinutes(9, 30);
  const twoStart = timeToMinutes(9, 40);
  if (currentMinutes >= oneEnd && currentMinutes < twoStart) {
    return 'TWO_PERIOD'; // 1교시 후 쉬는시간은 2교시로
  }

  const twoEnd = timeToMinutes(10, 30);
  const threeStart = timeToMinutes(10, 40);
  if (currentMinutes >= twoEnd && currentMinutes < threeStart) {
    return 'THREE_PERIOD'; // 2교시 후 쉬는시간은 3교시로
  }

  const threeEnd = timeToMinutes(11, 30);
  const fourStart = timeToMinutes(11, 40);
  if (currentMinutes >= threeEnd && currentMinutes < fourStart) {
    return 'FOUR_PERIOD'; // 3교시 후 쉬는시간은 4교시로
  }

  const fourEnd = timeToMinutes(12, 30);
  if (currentMinutes >= fourEnd && currentMinutes < lunchEnd) {
    return 'FIVE_PERIOD'; // 4교시 후는 점심시간이므로 5교시로
  }

  const fiveEnd = timeToMinutes(14, 10);
  const sixStart = timeToMinutes(14, 20);
  if (currentMinutes >= fiveEnd && currentMinutes < sixStart) {
    return 'SIX_PERIOD'; // 5교시 후 쉬는시간은 6교시로
  }

  const sixEnd = timeToMinutes(15, 10);
  const sevenStart = timeToMinutes(15, 20);
  if (currentMinutes >= sixEnd && currentMinutes < sevenStart) {
    return 'SEVEN_PERIOD'; // 6교시 후 쉬는시간은 7교시로
  }

  // 수업 시간 외
  return null;
};

/**
 * 오늘 날짜를 YYYY-MM-DD 형식으로 반환
 */
export const getTodayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
