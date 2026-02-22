import type { LegendItem } from '@/types/calendar';

export const LEGENDS: LegendItem[] = [
    { id: 'self_study', label: '자습 감독', bgColor: 'rgba(0, 133, 255, 0.1)', textColor: '#0085FF' },
    { id: 'leave_seat', label: '이석 감독', bgColor: '#D8CCFF', textColor: '#7D55FF' },
    { id: 'seventh_period', label: '7교시 감독', bgColor: '#E8F7EA', textColor: '#1D9B49' },
];

export const SELF_STUDY_COLORS = { bgColor: 'rgba(0, 133, 255, 0.1)', textColor: '#0085FF' };
export const LEAVE_SEAT_COLORS = { bgColor: '#D8CCFF', textColor: '#7D55FF' };
export const SEVENTH_PERIOD_COLORS = { bgColor: '#E8F7EA', textColor: '#1D9B49' };