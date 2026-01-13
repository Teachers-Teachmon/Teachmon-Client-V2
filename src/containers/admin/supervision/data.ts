import type { CalendarEvent } from '@/types/calendar';
import type { SupervisionCount } from '@/types/admin';

export const SAMPLE_EVENTS: CalendarEvent[] = [
  { id: '1', date: new Date('2026-01-01'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
  { id: '2', date: new Date('2026-01-02'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
  { id: '3', date: new Date('2026-01-07'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
  { id: '4', date: new Date('2026-01-08'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
  { id: '5', date: new Date('2026-01-10'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
  { id: '6', date: new Date('2026-01-13'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
  { id: '7', date: new Date('2026-01-14'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
  { id: '8', date: new Date('2026-01-16'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
  { id: '9', date: new Date('2026-01-17'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
  { id: '10', date: new Date('2026-01-17'), label: '손현정 선생님', bgColor: '#D8CCFF', textColor: '#7D55FF', supervisionType: 'leave_seat' },
  { id: '11', date: new Date('2026-01-22'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
  { id: '12', date: new Date('2026-01-30'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
  { id: '13', date: new Date('2026-01-31'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
];

export const SAMPLE_COUNTS: SupervisionCount[] = [
  { rank: 1, name: '이혜정', selfStudy: 18, leaveSeat: 18, total: 36 },
  { rank: 1, name: '이혜정', selfStudy: 18, leaveSeat: 18, total: 36 },
  { rank: 1, name: '이혜정', selfStudy: 18, leaveSeat: 18, total: 36 },
  { rank: 1, name: '이혜정', selfStudy: 18, leaveSeat: 18, total: 36 },
  { rank: 1, name: '이혜정', selfStudy: 18, leaveSeat: 18, total: 36 },
  { rank: 1, name: '이혜정', selfStudy: 18, leaveSeat: 18, total: 36 },
  { rank: 1, name: '이혜정', selfStudy: 18, leaveSeat: 18, total: 36 },
  { rank: 1, name: '이혜정', selfStudy: 18, leaveSeat: 18, total: 36 },
  { rank: 1, name: '이혜정', selfStudy: 18, leaveSeat: 18, total: 36 },
  { rank: 1, name: '이혜정', selfStudy: 18, leaveSeat: 18, total: 36 },
];

export const SAMPLE_TEACHERS = ['이혜정 선생님', '손현정 선생님', '김철수 선생님', '박영희 선생님'];
