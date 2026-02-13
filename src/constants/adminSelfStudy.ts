import type { SelfStudySchedule } from '@/types/selfStudy';

export const DAY_LABELS = {
  mon: '월',
  tue: '화',
  wed: '수',
  thu: '목',
  fri: '금',
} as const;

export const PERIOD_OPTIONS = [
  '7교시',
  '8~9교시',
  '10~11교시',
];

export const PERIODS = ['1교시', '2교시', '3교시', '4교시', '5교시', '6교시', '7교시', '8~9교시', '10~11교시'];

export const INITIAL_SELF_STUDY_SCHEDULES: SelfStudySchedule[] = [
  {
    id: '1',
    date: new Date(2026, 0, 14),
    grade: 3,
    periods: ['1교시', '2교시', '3교시', '4교시'],
    startDate: new Date(2026, 0, 14),
    endDate: new Date(2026, 0, 16),
    periodIds: undefined
  },
  {
    id: '2',
    date: new Date(2026, 0, 15),
    grade: 3,
    periods: ['1교시', '2교시', '3교시', '4교시'],
    startDate: new Date(2026, 0, 14),
    endDate: new Date(2026, 0, 16),
  },
  {
    id: '3',
    date: new Date(2026, 0, 16),
    grade: 3,
    periods: ['1교시', '2교시', '3교시', '4교시'],
    startDate: new Date(2026, 0, 14),
    endDate: new Date(2026, 0, 16),
  },
  {
    id: '4',
    date: new Date(2026, 0, 23),
    grade: 2,
    periods: ['1교시', '2교시'],
    startDate: new Date(2026, 0, 23),
    endDate: new Date(2026, 0, 23),
  },
  {
    id: '5',
    date: new Date(2026, 0, 23),
    grade: 3,
    periods: ['3교시', '4교시'],
    startDate: new Date(2026, 0, 23),
    endDate: new Date(2026, 0, 23),
  },
  {
    id: '6',
    date: new Date(2026, 0, 24),
    grade: 1,
    periods: ['5교시', '6교시'],
    startDate: new Date(2026, 0, 24),
    endDate: new Date(2026, 0, 24),
  },
  {
    id: '7',
    date: new Date(2026, 0, 24),
    grade: 3,
    periods: ['7교시', '8교시'],
    startDate: new Date(2026, 0, 24),
    endDate: new Date(2026, 0, 24),
  },
  {
    id: '8',
    date: new Date(2026, 0, 25),
    grade: 'all',
    periods: ['1교시', '2교시', '3교시'],
    startDate: new Date(2026, 0, 25),
    endDate: new Date(2026, 0, 25),
  },
  {
    id: '9',
    date: new Date(2026, 0, 25),
    grade: 3,
    periods: ['4교시', '5교시'],
    startDate: new Date(2026, 0, 25),
    endDate: new Date(2026, 0, 25),
  },
];
