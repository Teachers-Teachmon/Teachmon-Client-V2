import { colors } from '@/styles/theme';
import type { Grade, SelfStudyPeriod } from '@/types/selfStudy';

export const PERIOD_ENUM_TO_LABEL: Record<SelfStudyPeriod, string> = {
import type { Grade, SelfStudyPeriod, SelfStudyWeekDay } from '@/types/selfStudy';

export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu';
export const DAY_ORDER: DayOfWeek[] = ['mon', 'tue', 'wed', 'thu'];

export const UI_DAY_TO_API: Record<DayOfWeek, SelfStudyWeekDay> = {
  mon: 'MON',
  tue: 'TUE',
  wed: 'WED',
  thu: 'THU',
};

export const API_DAY_TO_UI: Partial<Record<SelfStudyWeekDay, DayOfWeek>> = {
  MON: 'mon',
  TUE: 'tue',
  WED: 'wed',
  THU: 'thu',
};

export const PERIOD_TO_API: Record<string, SelfStudyPeriod> = {
  '7교시': 'SEVEN_PERIOD',
  '8~9교시': 'EIGHT_AND_NINE_PERIOD',
  '10~11교시': 'TEN_AND_ELEVEN_PERIOD',
};

export const API_TO_PERIOD: Record<SelfStudyPeriod, string> = {
  ONE_PERIOD: '1교시',
  TWO_PERIOD: '2교시',
  THREE_PERIOD: '3교시',
  FOUR_PERIOD: '4교시',
  FIVE_PERIOD: '5교시',
  SIX_PERIOD: '6교시',
  SEVEN_PERIOD: '7교시',
  EIGHT_AND_NINE_PERIOD: '8~9교시',
  TEN_AND_ELEVEN_PERIOD: '10~11교시',
};

export const PERIOD_LABEL_TO_ENUM: Record<string, SelfStudyPeriod> = Object.fromEntries(
  Object.entries(PERIOD_ENUM_TO_LABEL).map(([key, value]) => [value, key as SelfStudyPeriod]),
) as Record<string, SelfStudyPeriod>;

export const generateScheduleId = (): string => {
  return `schedule-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const getDatesInRange = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      dates.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
};

export const getGradeColor = (grade: Grade): { bgColor: string; textColor: string } => {
  switch (grade) {
    case 1:
      return { bgColor: '#FFE5E5', textColor: '#FF6B6B' };
    case 2:
      return { bgColor: '#E5F3FF', textColor: '#4A90E2' };
    case 3:
      return { bgColor: '#E5FFE5', textColor: '#51CF66' };
    case 'all':
      return { bgColor: '#FFF5E5', textColor: '#FFA726' };
    default:
      return { bgColor: colors.primaryBackground, textColor: colors.primary };
  }
};

export const formatGrade = (grade: Grade): string => {
  return grade === 'all' ? '전체' : `${grade}학년`;
};

export const formatPeriods = (periods: string[]): string => {
  if (periods.length === 0) return '';
  
  // 모든 교시를 개별 숫자로 변환
  const allPeriodNumbers: number[] = [];
  
  periods.forEach(p => {
    if (p.includes('~')) {
      // "8~9교시" 형식이면 8, 9로 분리
      const numbers = p.replace('교시', '').split('~').map(n => parseInt(n.trim()));
      allPeriodNumbers.push(...numbers);
    } else {
      // "7교시" 형식이면 7로 변환
      const number = parseInt(p.replace('교시', ''));
      allPeriodNumbers.push(number);
    }
  });
  
  // 중복 제거하고 정렬
  const uniquePeriods = [...new Set(allPeriodNumbers)].sort((a, b) => a - b);
  
  if (uniquePeriods.length === 1) {
    return `${uniquePeriods[0]}교시`;
  }
  
  // 연속된 교시들을 범위로 병합
  const ranges: string[] = [];
  let start = uniquePeriods[0];
  let end = uniquePeriods[0];
  
  for (let i = 1; i < uniquePeriods.length; i++) {
    if (uniquePeriods[i] === end + 1) {
      end = uniquePeriods[i];
    } else {
      if (start === end) {
        ranges.push(`${start}교시`);
      } else {
        ranges.push(`${start}~${end}교시`);
      }
      start = uniquePeriods[i];
      end = uniquePeriods[i];
    }
  }
  
  // 마지막 범위 추가
  if (start === end) {
    ranges.push(`${start}교시`);
  } else {
    ranges.push(`${start}~${end}교시`);
  }
  
  return ranges.join(', ');
};
