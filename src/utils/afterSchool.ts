import type { CalendarEvent } from '@/types/calendar';
import type { AffordableReinforcement } from '@/types/after-school';
import { WEEKDAYS } from '@/constants/admin';
import { transformPeriodScheduleToCalendarEvent } from './common';

export const API_WEEKDAY_TO_UI: Record<string, (typeof WEEKDAYS)[number]> = {
    '월': '월요일',
    '화': '화요일',
    '수': '수요일',
    '목': '목요일',
    'MON': '월요일',
    'TUE': '화요일',
    'WED': '수요일',
    'THU': '목요일',
    '월요일': '월요일',
    '화요일': '화요일',
    '수요일': '수요일',
    '목요일': '목요일',
};

export const transformAffordableToCalendarEvents = (
    data: AffordableReinforcement[]
): CalendarEvent[] => {
    return data.map((item, index) => 
        transformPeriodScheduleToCalendarEvent(
            {
                day: item.day,
                startPeriod: item.start_period,
                endPeriod: item.end_period,
            },
            index,
            'makeup',
            '보강'
        )
    );
};
