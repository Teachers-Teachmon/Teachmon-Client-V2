// 관리자 페이지 관련 상수

import type { ForbiddenDay } from '@/services/user-management/user-management.api';
import {
  WEEKDAYS_KOREAN,
  WEEKDAY_API_TO_KOREAN,
  WEEKDAY_KOREAN_TO_API,
  ADMIN_AFTER_SCHOOL_PERIODS,
  QUARTER_LABELS,
  USER_ROLES,
  SORT_ORDER,
} from './common';

// 요일 목록 (월~목) - common에서 가져옴
export const WEEKDAYS = WEEKDAYS_KOREAN;

// API 요일 형식을 한글로 변환 - common에서 가져옴
export const DAY_MAP: Record<ForbiddenDay, string> = WEEKDAY_API_TO_KOREAN;

// 한글 요일을 API 형식으로 변환 (월~목만)
export const REVERSE_DAY_MAP: Record<string, ForbiddenDay> = {
  '월요일': WEEKDAY_KOREAN_TO_API['월요일'],
  '화요일': WEEKDAY_KOREAN_TO_API['화요일'],
  '수요일': WEEKDAY_KOREAN_TO_API['수요일'],
  '목요일': WEEKDAY_KOREAN_TO_API['목요일'],
} as const;

export const WEEKDAY_MAP = REVERSE_DAY_MAP;

// 사용자 역할 - common에서 가져옴
export { USER_ROLES };

// 탭 타입
export const TAB_TYPES = {
  TEACHER: '선생님',
  STUDENT: '학생',
} as const;

// 정렬 순서 - common에서 가져옴
export { SORT_ORDER };

// 방과후 교시 옵션 - common에서 가져옴
export { ADMIN_AFTER_SCHOOL_PERIODS };

// 기타 옵션
export const SMILE_OPTIONS = ['객체지향 프로그래밍', '파이썬을 이용한 문제해결', '스프링 수업'] as const;

// 분기 옵션 - common에서 가져옴
export const QUARTER_ITEMS = QUARTER_LABELS;
