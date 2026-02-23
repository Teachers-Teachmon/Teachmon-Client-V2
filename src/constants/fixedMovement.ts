import type { FixedMovement, Team, Weekday, Period } from '@/types/fixedMovement';
import {
  WEEKDAY_API_TO_SHORT,
  PERIOD_API_TO_LABEL,
  PERIOD_LABEL_TO_API as COMMON_PERIOD_LABEL_TO_API,
  ADMIN_AFTER_SCHOOL_PERIODS,
} from './common';

export const WEEKDAYS = {
  mon: '월',
  tue: '화',
  wed: '수',
  thu: '목',
} as const;

export const WEEKDAY_API_TO_KEY: Record<Weekday, keyof typeof WEEKDAYS> = {
  MON: 'mon',
  TUE: 'tue',
  WED: 'wed',
  THU: 'thu',
  FRI: 'mon',
  SAT: 'mon',
  SUN: 'mon',
} as const;

// 요일 라벨 - common에서 가져옴
export const WEEKDAY_LABEL = WEEKDAY_API_TO_SHORT;

// 교시 라벨 - common에서 가져옴
export const PERIOD_LABEL = PERIOD_API_TO_LABEL;

// 요일 라벨을 API로 변환
export const WEEKDAY_LABEL_TO_API: Record<string, Weekday> = Object.fromEntries(
  Object.entries(WEEKDAY_LABEL).map(([key, value]) => [value, key as Weekday]),
) as Record<string, Weekday>;

// 교시 라벨을 API로 변환 - common에서 가져와서 Period 타입으로 변환
export const PERIOD_LABEL_TO_API: Record<string, Period> = {
  '1교시': COMMON_PERIOD_LABEL_TO_API['1교시'] as Period,
  '2교시': COMMON_PERIOD_LABEL_TO_API['2교시'] as Period,
  '3교시': COMMON_PERIOD_LABEL_TO_API['3교시'] as Period,
  '4교시': COMMON_PERIOD_LABEL_TO_API['4교시'] as Period,
  '5교시': COMMON_PERIOD_LABEL_TO_API['5교시'] as Period,
  '6교시': COMMON_PERIOD_LABEL_TO_API['6교시'] as Period,
  '7교시': COMMON_PERIOD_LABEL_TO_API['7교시'] as Period,
  '8~9교시': COMMON_PERIOD_LABEL_TO_API['8~9교시'] as Period,
  '10~11교시': COMMON_PERIOD_LABEL_TO_API['10~11교시'] as Period,
  '8~11교시': COMMON_PERIOD_LABEL_TO_API['8~11교시'] as Period,
};

// 교시 옵션 - 관리자 방과후 교시 옵션 사용
export const PERIOD_OPTIONS = [...ADMIN_AFTER_SCHOOL_PERIODS];

export const LOCATION_OPTIONS = [
  '베드실7',
  '베드실9',
  '전공동아리실',
  '세미나실1',
  '세미나실2',
];

export const MOCK_FIXED_MOVEMENTS: FixedMovement[] = [
  ...Array.from({ length: 25 }).map((_, i) => ({
    id: `${i + 1}`,
    day: ['mon', 'tue', 'wed', 'thu'][i % 4],
    period: PERIOD_OPTIONS[i % PERIOD_OPTIONS.length],
    location: LOCATION_OPTIONS[i % LOCATION_OPTIONS.length],
    personnel: (i % 7) + 1,
    students: Array.from({ length: (i % 7) + 1 }).map((_, j) => ({
      studentNumber: 1400 + j,
      name: `학생${j + 1}`,
    })),
  })),
];

export const MOCK_TEAMS: Team[] = [
  {
    id: '1',
    name: '전공동아리A',
    students: [
      { studentNumber: 1401, name: '김동욱' },
      { studentNumber: 1402, name: '이민수' },
      { studentNumber: 1403, name: '박지훈' },
      { studentNumber: 1404, name: '최예준' },
    ],
  },
  {
    id: '2',
    name: '전공동아리B',
    students: [
      { studentNumber: 1405, name: '정서연' },
      { studentNumber: 1406, name: '한소희' },
      { studentNumber: 1407, name: '강민지' },
    ],
  },
  {
    id: '3',
    name: '스터디그룹',
    students: [
      { studentNumber: 1408, name: '오준서' },
      { studentNumber: 1409, name: '임하늘' },
      { studentNumber: 1410, name: '윤도훈' },
      { studentNumber: 1411, name: '송민아' },
      { studentNumber: 1412, name: '백승호' },
    ],
  },
];