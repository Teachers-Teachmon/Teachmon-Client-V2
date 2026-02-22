// 공통 유틸리티 함수

import type { CalendarEvent } from '@/types/calendar';

// ============================================
// 날짜 포맷팅 함수
// ============================================

/**
 * 날짜 문자열을 로컬 Date 객체로 변환
 * @param dateStr YYYY-MM-DD 형식의 날짜 문자열
 */
export const parseLocalDate = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Date 객체를 YYYY-MM-DD 형식으로 변환
 */
export const formatDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * 오늘 날짜를 YYYY-MM-DD 형식으로 반환
 */
export const getTodayISO = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

/**
 * YYYY-MM-DD를 "M월 D일 (요일)" 형식으로 변환
 */
export const formatDateDisplay = (dateStr: string): string => {
  const date = new Date(dateStr);
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return `${date.getMonth() + 1}월 ${date.getDate()}일 (${days[date.getDay()]})`;
};

/**
 * YYYY-MM-DD를 "M월 D일 (요일)" 형식으로 변환
 */
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[date.getDay()];
  return `${month}월 ${day}일 (${weekday})`;
};

/**
 * YYYY-MM-DD를 "M월 D일 요일요일" 형식으로 변환
 */
export const formatDateFull = (dateStr: string): string => {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[date.getDay()];
  return `${month}월 ${day}일 ${weekday}요일`;
};

/**
 * YYYY-MM-DD를 "MM/DD" 형식으로 변환
 */
export const formatDateShort = (dateStr: string): string => {
  const date = new Date(dateStr);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}/${day}`;
};

/**
 * Date 객체를 "YYYY년 M월 D일" 형식으로 변환
 */
export const formatDateKorean = (date: Date): string => {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

// ============================================
// 교시 관련 유틸리티
// ============================================

/**
 * 교시 정보를 기반으로 라벨과 색상 반환
 */
export const getPeriodStyle = (startPeriod: number, endPeriod: number) => {
  const is89 = startPeriod === 8 && endPeriod === 9;
  const is1011 = startPeriod === 10 && endPeriod === 11;

  if (is89) {
    return {
      label: '8~9교시',
      bgColor: '#0085FF0D',
      textColor: '#0085FF',
    };
  } else if (is1011) {
    return {
      label: '10~11교시',
      bgColor: '#D8CCFF',
      textColor: '#7D55FF',
    };
  } else {
    return {
      label: `${startPeriod}~${endPeriod}교시`,
      bgColor: '#F3F4F6',
      textColor: '#374151',
    };
  }
};

// ============================================
// 캘린더 이벤트 변환 유틸리티
// ============================================

interface PeriodSchedule {
  day: string;
  startPeriod: number;
  endPeriod: number;
}

/**
 * 교시 스케줄을 캘린더 이벤트로 변환
 */
export const transformPeriodScheduleToCalendarEvent = (
  item: PeriodSchedule,
  index: number,
  prefix: string,
  labelSuffix: string = ''
): CalendarEvent => {
  const { label, bgColor, textColor } = getPeriodStyle(item.startPeriod, item.endPeriod);
  
  return {
    id: `${prefix}-${item.day}-${item.startPeriod}-${index}`,
    date: parseLocalDate(item.day),
    label: labelSuffix ? `${label} ${labelSuffix}` : label,
    bgColor,
    textColor,
  };
};

// ============================================
// 기타 유틸리티
// ============================================

/**
 * 교사 이름 표시 형식 반환
 */
export const getDisplayName = (
  teacherId: number | string,
  teacherName: string,
  currentTeacherId: number | string
): string => {
  return String(teacherId) === String(currentTeacherId) ? '(나)' : `${teacherName} 선생님`;
};
