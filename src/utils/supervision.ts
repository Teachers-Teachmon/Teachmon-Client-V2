import type { CalendarEvent } from '@/types/calendar';
import type { SupervisionDay } from '@/types/supervision';
import { SELF_STUDY_COLORS, LEAVE_SEAT_COLORS } from '@/constants/supervision';
import { parseLocalDate } from './common';

export const convertToCalendarEvents = (data: SupervisionDay[]): CalendarEvent[] => {
    const events: CalendarEvent[] = [];

    data.forEach((item) => {
        const date = parseLocalDate(item.day);

        if (item.self_study_supervision) {
            events.push({
                id: `self_${item.self_study_supervision.id}`,
                date,
                label: `${item.self_study_supervision.teacher.name} 선생님`,
                teacherId: item.self_study_supervision.teacher.id,
                supervisionType: 'self_study',
                ...SELF_STUDY_COLORS,
            });
        }

        if (item.leave_seat_supervision) {
            events.push({
                id: `leave_${item.leave_seat_supervision.id}`,
                date,
                label: `${item.leave_seat_supervision.teacher.name} 선생님`,
                teacherId: item.leave_seat_supervision.teacher.id,
                supervisionType: 'leave_seat',
                ...LEAVE_SEAT_COLORS,
            });
        }
    });

    return events;
};
