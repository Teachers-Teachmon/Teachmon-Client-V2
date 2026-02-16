import type { ExchangeStatus, PeriodType, SupervisionType } from '@/types/supervision';

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[date.getDay()];
  return `${month}월 ${day}일 (${weekday})`;
};

export const formatDateFull = (dateStr: string): string => {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[date.getDay()];
  return `${month}월 ${day}일 ${weekday}요일`;
};

export const formatDateShort = (dateStr: string): string => {
  const date = new Date(dateStr);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}/${day}`;
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

export const getDisplayName = (
  teacherId: number | string,
  teacherName: string,
  currentTeacherId: number | string
): string => {
  return String(teacherId) === String(currentTeacherId) ? '(나)' : `${teacherName} 선생님`;
};
