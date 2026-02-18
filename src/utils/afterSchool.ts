import type { CalendarEvent } from '@/types/calendar';
import type { AffordableReinforcement } from '@/types/afterSchool.ts';
import { WEEKDAYS } from '@/constants/admin';

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
    return data.map((item, index) => {
        const is89 = item.start_period === 8 && item.end_period === 9;
        const is1011 = item.start_period === 10 && item.end_period === 11;

        let label = '';
        let bgColor = '';
        let textColor = '';

        if (is89) {
            label = '8~9교시 보강';
            bgColor = '#0085FF0D';
            textColor = '#0085FF';
        } else if (is1011) {
            label = '10~11교시 보강';
            bgColor = '#D8CCFF';
            textColor = '#7D55FF';
        } else {
            label = `${item.start_period}~${item.end_period}교시 보강`;
            bgColor = '#F3F4F6';
            textColor = '#374151';
        }

        return {
            id: `makeup-${item.day}-${item.start_period}-${index}`,
            date: new Date(item.day),
            label,
            bgColor,
            textColor,
            supervisionType: 'makeup',
        };
    });
};
