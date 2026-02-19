// 관리자 페이지 관련 상수

import type { ForbiddenDay } from '@/services/user-management/user-management.api';

// 요일 목록
export const WEEKDAYS = ['월요일', '화요일', '수요일', '목요일'] as const;

// API 요일 형식을 한글로 변환
export const DAY_MAP: Record<ForbiddenDay, string> = {
  MON: '월요일',
  TUE: '화요일',
  WED: '수요일',
  THU: '목요일',
  FRI: '금요일',
  SAT: '토요일',
  SUN: '일요일',
};

// 한글 요일을 API 형식으로 변환
export const REVERSE_DAY_MAP: Record<string, ForbiddenDay> = {
  '월요일': 'MON',
  '화요일': 'TUE',
  '수요일': 'WED',
  '목요일': 'THU',
} as const;

export const WEEKDAY_MAP: Record<string, ForbiddenDay> = {
  '월요일': 'MON',
  '화요일': 'TUE',
  '수요일': 'WED',
  '목요일': 'THU',
} as const;

// 사용자 역할
export const USER_ROLES = {
  ADMIN: '관리자',
  NORMAL: '일반',
} as const;

// 탭 타입
export const TAB_TYPES = {
  TEACHER: '선생님',
  STUDENT: '학생',
} as const;

// 정렬 순서
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
} as const;


export const ADMIN_AFTER_SCHOOL_PERIODS = ['8~9교시', '10~11교시', '8~11교시'] as const;
export const SMILE_OPTIONS = ['객체지향 프로그래밍', '파이썬을 이용한 문제해결', '스프링 수업'] as const;
export const QUARTER_ITEMS = ['1분기', '2분기', '3분기'] as const;
