import type { FixedMovement, Team, Weekday, Period } from '@/types/fixedMovement';

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

export const WEEKDAY_LABEL: Record<Weekday, string> = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
  SAT: '토',
  SUN: '일',
} as const;

export const PERIOD_LABEL: Record<Period, string> = {
  ONE_PERIOD: '1교시',
  TWO_PERIOD: '2교시',
  THREE_PERIOD: '3교시',
  FOUR_PERIOD: '4교시',
  FIVE_PERIOD: '5교시',
  SIX_PERIOD: '6교시',
  SEVEN_PERIOD: '7교시',
  EIGHT_AND_NINE_PERIOD: '8~9교시',
  TEN_AND_ELEVEN_PERIOD: '10~11교시',
} as const;

export const PERIOD_OPTIONS = [
  '7교시',
  '8~9교시',
  '10~11교시',
  '8~11교시',
];

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