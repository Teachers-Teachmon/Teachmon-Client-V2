import type { LegendItem } from '@/types/calendar';
import type { SupervisionDay } from '@/types/supervision';

export const LEGENDS: LegendItem[] = [
    { id: 'self_study', label: '자습 감독', bgColor: 'rgba(0, 133, 255, 0.1)', textColor: '#0085FF' },
    { id: 'leave_seat', label: '이석 감독', bgColor: '#D8CCFF', textColor: '#7D55FF' },
];

export const SELF_STUDY_COLORS = { bgColor: 'rgba(0, 133, 255, 0.1)', textColor: '#0085FF' };
export const LEAVE_SEAT_COLORS = { bgColor: '#D8CCFF', textColor: '#7D55FF' };

export const SAMPLE_DATA: SupervisionDay[] = [
    {
        day: '2026-01-02',
        self_study_supervision: { id: 1, teacher: { id: 32523523, name: '이혜정' } },
        leave_seat_supervision: null,
    },
    {
        day: '2026-01-03',
        self_study_supervision: { id: 2, teacher: { id: 32523523, name: '이혜정' } },
        leave_seat_supervision: null,
    },
    {
        day: '2026-01-07',
        self_study_supervision: { id: 3, teacher: { id: 32523523, name: '이혜정' } },
        leave_seat_supervision: null,
    },
    {
        day: '2026-01-08',
        self_study_supervision: { id: 4, teacher: { id: 32523523, name: '이혜정' } },
        leave_seat_supervision: null,
    },
    {
        day: '2026-01-10',
        self_study_supervision: { id: 5, teacher: { id: 32523523, name: '이혜정' } },
        leave_seat_supervision: null,
    },
    {
        day: '2026-01-13',
        self_study_supervision: { id: 6, teacher: { id: 32523523, name: '이혜정' } },
        leave_seat_supervision: null,
    },
    {
        day: '2026-01-14',
        self_study_supervision: { id: 7, teacher: { id: 32523523, name: '이혜정' } },
        leave_seat_supervision: null,
    },
    {
        day: '2026-01-16',
        self_study_supervision: { id: 8, teacher: { id: 32523523, name: '이혜정' } },
        leave_seat_supervision: null,
    },
    {
        day: '2026-01-17',
        self_study_supervision: { id: 9, teacher: { id: 32523523, name: '이혜정' } },
        leave_seat_supervision: { id: 10, teacher: { id: 23423524, name: '손현정' } },
    },
    {
        day: '2026-01-22',
        self_study_supervision: { id: 11, teacher: { id: 32523523, name: '이혜정' } },
        leave_seat_supervision: null,
    },
    {
        day: '2026-01-30',
        self_study_supervision: { id: 12, teacher: { id: 32523523, name: '이혜정' } },
        leave_seat_supervision: { id: 13, teacher: { id: 23423523, name: '윤남노' } },
    },
];

export const CURRENT_TEACHER_ID = 32523523;
