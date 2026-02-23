import type { CalendarEvent } from '@/types/calendar';
import type { SupervisionCount } from '@/types/admin';
import {
  SUPERVISION_EDITOR_HEIGHT,
  SUPERVISION_EDITOR_WIDTH,
  SUPERVISION_TYPE_LABELS,
  SUPERVISION_TYPE_OPTIONS,
  SUPERVISION_TYPE_STYLES,
  SUPERVISION_TYPE_VALUES,
  type AdminSupervisionType,
} from '@/constants/adminSupervision';

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const getEventType = (event: CalendarEvent): AdminSupervisionType | null => {
  if (
    event.supervisionType &&
    (event.supervisionType === 'self_study' || event.supervisionType === 'leave_seat' || event.supervisionType === 'seventh_period')
  ) {
    return event.supervisionType;
  }
  const match = (Object.entries(SUPERVISION_TYPE_STYLES) as Array<[AdminSupervisionType, { bgColor: string; textColor: string }]>)
    .find(([, style]) => style.bgColor === event.bgColor && style.textColor === event.textColor);
  return match?.[0] ?? null;
};

export const getExistingTypesForDate = (
  events: CalendarEvent[],
  date: Date,
  excludeEventId?: string | null,
) => {
  return events
    .filter((event) => isSameDay(event.date, date) && event.id !== excludeEventId)
    .map(getEventType)
    .filter((type): type is AdminSupervisionType => !!type);
};

export const getAvailableTypesForDate = (
  events: CalendarEvent[],
  date: Date,
  excludeEventId?: string | null,
) => {
  const existingTypes = getExistingTypesForDate(events, date, excludeEventId);
  return SUPERVISION_TYPE_VALUES.filter((type) => !existingTypes.includes(type));
};

export const getAvailableTypeLabels = (
  events: CalendarEvent[],
  selectedDate: Date | null,
  selectedEventId: string | null,
) => {
  if (!selectedDate) return SUPERVISION_TYPE_OPTIONS;
  if (!selectedEventId) {
    const availableTypes = getAvailableTypesForDate(events, selectedDate, null);
    return availableTypes.map((type) => SUPERVISION_TYPE_LABELS[type]);
  }
  return SUPERVISION_TYPE_OPTIONS;
};

export const filterTeachers = (teachers: string[], query: string) => {
  if (!query) return teachers;
  return teachers.filter((teacher) => teacher.includes(query));
};

export const filterCounts = (
  counts: SupervisionCount[],
  query: string,
  sortOrder: 'asc' | 'desc',
) => {
  let result = [...counts];
  if (query) {
    result = result.filter(item => item.name.includes(query));
  }
  result.sort((a, b) => sortOrder === 'asc' ? a.total - b.total : b.total - a.total);
  return result;
};

export const getEditorAnchor = (anchorRect: DOMRect) => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const leftBase = anchorRect.left;
  const maxLeft = viewportWidth - SUPERVISION_EDITOR_WIDTH - 12;
  const clampedLeft = Math.max(12, Math.min(leftBase, maxLeft));

  const topBelow = anchorRect.bottom + 6;
  const topAbove = anchorRect.top - SUPERVISION_EDITOR_HEIGHT - 6;
  const canPlaceBelow = topBelow + SUPERVISION_EDITOR_HEIGHT <= viewportHeight - 8;
  const top = canPlaceBelow ? topBelow : Math.max(8, topAbove);

  return { top, left: clampedLeft };
};
