import type { CalendarEvent } from '@/types/calendar';
import type { SupervisionDay } from '@/types/supervision';
import { SELF_STUDY_COLORS, LEAVE_SEAT_COLORS, SEVENTH_PERIOD_COLORS } from '@/constants/supervision';
import { parseLocalDate } from './common';

export const convertToCalendarEvents = (data: SupervisionDay[]): CalendarEvent[] => {
    const events: CalendarEvent[] = [];

    data.forEach((item) => {
        const date = parseLocalDate(item.day);

        if (item.self_study_supervision) {
            events.push({
                id: `self_${item.self_study_supervision.id}`,
                date,
                label: item.self_study_supervision.teacher.name,
                teacherId: item.self_study_supervision.teacher.id,
                supervisionType: 'self_study',
                ...SELF_STUDY_COLORS,
            });
        }

        if (item.leave_seat_supervision) {
            events.push({
                id: `leave_${item.leave_seat_supervision.id}`,
                date,
                label: item.leave_seat_supervision.teacher.name,
                teacherId: item.leave_seat_supervision.teacher.id,
                supervisionType: 'leave_seat',
                ...LEAVE_SEAT_COLORS,
            });
        }

        if (item.seventh_period_supervision) {
            events.push({
                id: `seventh_${item.seventh_period_supervision.id}`,
                date,
                label: item.seventh_period_supervision.teacher.name,
                teacherId: item.seventh_period_supervision.teacher.id,
                supervisionType: 'seventh_period',
                ...SEVENTH_PERIOD_COLORS,
            });
        }
    });

    return events;
};
