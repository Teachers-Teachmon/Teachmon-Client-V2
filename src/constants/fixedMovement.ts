import type { FixedMovement } from '@/types/fixedMovement';

export const WEEKDAYS = {
  mon: '월',
  tue: '화',
  wed: '수',
  thu: '목',
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
  {
    id: '1',
    day: 'mon',
    period: '7교시',
    location: '베드실7',
    reason: '전공동아리',
    students: [
      { studentNumber: 1410, name: '윤도훈' },
      { studentNumber: 1410, name: '윤도훈' },
      { studentNumber: 1410, name: '윤도훈' },
      { studentNumber: 1410, name: '윤도훈' },
      { studentNumber: 1410, name: '윤도훈' },
      { studentNumber: 1410, name: '윤도훈' },
      { studentNumber: 1410, name: '윤도훈' },
    ],
  },
  {
    id: '2',
    day: 'thu',
    period: '8~11교시',
    location: '베드실9',
    reason: '전공동아리',
    students: [
      { studentNumber: 1410, name: '윤도훈' },
      { studentNumber: 1410, name: '윤도훈' },
      { studentNumber: 1410, name: '윤도훈' },
      { studentNumber: 1410, name: '윤도훈' },
      { studentNumber: 1410, name: '윤도훈' },
      { studentNumber: 1410, name: '윤도훈' },
      { studentNumber: 1410, name: '윤도훈' },
    ],
  },
  {
    id: '3',
    day: 'thu',
    period: '8~11교시',
    location: '베드실7',
    reason: '전공동아리',
    students: [
      { studentNumber: 1410, name: '윤도훈' },
      { studentNumber: 1410, name: '윤도훈' },
      { studentNumber: 1410, name: '윤도훈' },
      { studentNumber: 1410, name: '윤도훈' },
      { studentNumber: 1410, name: '윤도훈' },
      { studentNumber: 1410, name: '윤도훈' },
      { studentNumber: 1410, name: '윤도훈' },
    ],
  },
];
