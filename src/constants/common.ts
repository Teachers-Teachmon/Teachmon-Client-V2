// 공통 상수 정의

// ============================================
// 요일 관련 상수
// ============================================

export type WeekdayKorean = '월요일' | '화요일' | '수요일' | '목요일' | '금요일' | '토요일' | '일요일';
export type WeekdayShort = '월' | '화' | '수' | '목' | '금' | '토' | '일';
export type WeekdayAPI = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

// 월~목 (방과후 및 일반적으로 사용)
export const WEEKDAYS_KOREAN: readonly WeekdayKorean[] = ['월요일', '화요일', '수요일', '목요일'] as const;

// 전체 요일 (한글)
export const ALL_WEEKDAYS_KOREAN: readonly WeekdayKorean[] = [
  '월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'
] as const;

// 전체 요일 (짧은 형식)
export const ALL_WEEKDAYS_SHORT: readonly WeekdayShort[] = ['월', '화', '수', '목', '금', '토', '일'] as const;

// API 형식 요일을 한글로 변환
export const WEEKDAY_API_TO_KOREAN: Record<WeekdayAPI, WeekdayKorean> = {
  MON: '월요일',
  TUE: '화요일',
  WED: '수요일',
  THU: '목요일',
  FRI: '금요일',
  SAT: '토요일',
  SUN: '일요일',
} as const;

// 한글 요일을 API 형식으로 변환
export const WEEKDAY_KOREAN_TO_API: Record<WeekdayKorean, WeekdayAPI> = {
  '월요일': 'MON',
  '화요일': 'TUE',
  '수요일': 'WED',
  '목요일': 'THU',
  '금요일': 'FRI',
  '토요일': 'SAT',
  '일요일': 'SUN',
} as const;

// API 형식 요일을 짧은 한글로 변환
export const WEEKDAY_API_TO_SHORT: Record<WeekdayAPI, WeekdayShort> = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
  SAT: '토',
  SUN: '일',
} as const;

// 짧은 한글 요일을 API 형식으로 변환
export const WEEKDAY_SHORT_TO_API: Record<WeekdayShort, WeekdayAPI> = {
  '월': 'MON',
  '화': 'TUE',
  '수': 'WED',
  '목': 'THU',
  '금': 'FRI',
  '토': 'SAT',
  '일': 'SUN',
} as const;

// 한글 요일을 짧은 형식으로 변환
export const WEEKDAY_KOREAN_TO_SHORT: Record<WeekdayKorean, WeekdayShort> = {
  '월요일': '월',
  '화요일': '화',
  '수요일': '수',
  '목요일': '목',
  '금요일': '금',
  '토요일': '토',
  '일요일': '일',
} as const;

// ============================================
// 교시 관련 상수
// ============================================

export type PeriodAPI = 
  | 'ONE_PERIOD'
  | 'TWO_PERIOD'
  | 'THREE_PERIOD'
  | 'FOUR_PERIOD'
  | 'FIVE_PERIOD'
  | 'SIX_PERIOD'
  | 'SEVEN_PERIOD'
  | 'EIGHT_PERIOD'
  | 'NINE_PERIOD'
  | 'TEN_PERIOD'
  | 'EIGHT_AND_NINE_PERIOD'
  | 'TEN_AND_ELEVEN_PERIOD';

export type PeriodLabel = 
  | '1교시'
  | '2교시'
  | '3교시'
  | '4교시'
  | '5교시'
  | '6교시'
  | '7교시'
  | '8교시'
  | '9교시'
  | '10교시'
  | '8~9교시'
  | '10~11교시'
  | '8~11교시';

// API 형식 교시를 한글로 변환
export const PERIOD_API_TO_LABEL: Record<PeriodAPI, PeriodLabel> = {
  ONE_PERIOD: '1교시',
  TWO_PERIOD: '2교시',
  THREE_PERIOD: '3교시',
  FOUR_PERIOD: '4교시',
  FIVE_PERIOD: '5교시',
  SIX_PERIOD: '6교시',
  SEVEN_PERIOD: '7교시',
  EIGHT_PERIOD: '8교시',
  NINE_PERIOD: '9교시',
  TEN_PERIOD: '10교시',
  EIGHT_AND_NINE_PERIOD: '8~9교시',
  TEN_AND_ELEVEN_PERIOD: '10~11교시',
} as const;

// 한글 교시를 API 형식으로 변환
export const PERIOD_LABEL_TO_API: Record<PeriodLabel, PeriodAPI | 'COMBINED'> = {
  '1교시': 'ONE_PERIOD',
  '2교시': 'TWO_PERIOD',
  '3교시': 'THREE_PERIOD',
  '4교시': 'FOUR_PERIOD',
  '5교시': 'FIVE_PERIOD',
  '6교시': 'SIX_PERIOD',
  '7교시': 'SEVEN_PERIOD',
  '8교시': 'EIGHT_PERIOD',
  '9교시': 'NINE_PERIOD',
  '10교시': 'TEN_PERIOD',
  '8~9교시': 'EIGHT_AND_NINE_PERIOD',
  '10~11교시': 'TEN_AND_ELEVEN_PERIOD',
  '8~11교시': 'COMBINED', // 특수 케이스: 두 교시를 합친 것
} as const;

// 방과후 교시 옵션 (8~9, 10~11)
export const AFTER_SCHOOL_PERIODS: readonly PeriodLabel[] = ['8~9교시', '10~11교시'] as const;

// 관리자 방과후 교시 옵션 (8~9, 10~11, 8~11)
export const ADMIN_AFTER_SCHOOL_PERIODS: readonly PeriodLabel[] = ['8~9교시', '10~11교시', '8~11교시'] as const;

// 전체 교시 목록 (1~10교시, 8-9교시, 10-11교시)
export const ALL_PERIODS: readonly string[] = [
  '1교시',
  '2교시',
  '3교시',
  '4교시',
  '5교시',
  '6교시',
  '7교시',
  '8-9교시',
  '10-11교시',
] as const;

// ============================================
// 분기 관련 상수
// ============================================

export type Quarter = 1 | 2 | 3 | 4;
export type QuarterLabel = '1분기' | '2분기' | '3분기' | '4분기';

export const QUARTERS: readonly Quarter[] = [1, 2, 3, 4] as const;
export const QUARTER_LABELS: readonly QuarterLabel[] = ['1분기', '2분기', '3분기', '4분기'] as const;

// ============================================
// 학년 관련 상수
// ============================================

export type Grade = 1 | 2 | 3;
export const GRADES: readonly Grade[] = [1, 2, 3] as const;
export const GRADE_LABELS: readonly string[] = ['1학년', '2학년', '3학년'] as const;

// ============================================
// 학급 관련 상수
// ============================================

export type ClassNumber = 1 | 2 | 3 | 4;
export const CLASSES: readonly ClassNumber[] = [1, 2, 3, 4] as const;

// ============================================
// 사용자 역할 관련 상수
// ============================================

export const USER_ROLES = {
  ADMIN: '관리자',
  NORMAL: '일반',
  VIEWER: '뷰어',
} as const;

// ============================================
// 정렬 순서 관련 상수
// ============================================

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
} as const;
