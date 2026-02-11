import { colors } from '@/styles/theme';
import type { Grade, SelfStudyPeriod } from '@/types/selfStudy';

export const PERIOD_ENUM_TO_LABEL: Record<SelfStudyPeriod, string> = {
  ONE_PERIOD: '1교시',
  TWO_PERIOD: '2교시',
  THREE_PERIOD: '3교시',
  FOUR_PERIOD: '4교시',
  FIVE_PERIOD: '5교시',
  SIX_PERIOD: '6교시',
  SEVEN_PERIOD: '7교시',
  EIGHT_AND_NINE_PERIOD: '8교시',
  TEN_AND_ELEVEN_PERIOD: '10교시',
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
  
  const periodNumbers = periods
    .map(p => parseInt(p.replace('교시', '')))
    .sort((a, b) => a - b);
  
  if (periodNumbers.length === 1) {
    return `${periodNumbers[0]}교시`;
  }
  
  const ranges: string[] = [];
  let start = periodNumbers[0];
  let end = periodNumbers[0];
  
  for (let i = 1; i < periodNumbers.length; i++) {
    if (periodNumbers[i] === end + 1) {
      end = periodNumbers[i];
    } else {
      if (start === end) {
        ranges.push(`${start}교시`);
      } else {
        ranges.push(`${start}~${end}교시`);
      }
      start = periodNumbers[i];
      end = periodNumbers[i];
    }
  }
  if (start === end) {
    ranges.push(`${start}교시`);
  } else {
    ranges.push(`${start}~${end}교시`);
  }
  
  return ranges.join(', ');
};

