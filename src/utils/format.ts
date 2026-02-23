import type { StudentSearchResponse as Student } from '@/types/search';
import type { ExchangeStatus, PeriodType, SupervisionType } from '@/types/home';
import {
  formatDate,
  formatDateFull,
  formatDateDisplay,
  formatDateShort,
  getTodayISO,
  getDisplayName,
} from './common';

// 공통 함수 재export
export {
  formatDate,
  formatDateFull,
  formatDateDisplay,
  formatDateShort,
  getTodayISO,
  getDisplayName,
};

// 학생 정보를 "학년반번호 이름" 형식으로 변환
export const formatStudent = (student: Student) => {
    return `${student.grade}${student.classNumber}${String(student.number).padStart(2, '0')} ${student.name}`;
};

export const formatSupervisionType = (type: SupervisionType | string): string => {
  return type === 'self_study' ? '자습감독' : '이석감독';
};

export const formatPeriod = (period: PeriodType | string): string => {
  const periodMap: Record<string, string> = {
    SEVEN_PERIOD: '7교시',
    EIGHT_AND_NINE_PERIOD: '8~9교시',
    TEN_AND_ELEVNE_PERIOD: '10~11교시',
  };
  return periodMap[period] || period;
};

export const getStatusStyle = (status: ExchangeStatus): ExchangeStatus => {
  return status;
};
