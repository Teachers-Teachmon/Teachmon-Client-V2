import type { CalendarEvent } from '@/types/calendar';
import type { SupervisionCount } from '@/types/admin';
import {
  SUPERVISION_EDITOR_HEIGHT,
  SUPERVISION_EDITOR_WIDTH,
  SUPERVISION_TYPE_LABELS,
  SUPERVISION_TYPE_OPTIONS,
  SUPERVISION_TYPE_STYLES,
  SUPERVISION_TYPE_VALUES,
  type SupervisionType,
} from '@/constants/adminSupervision';

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const getEventType = (event: CalendarEvent): SupervisionType | null => {
  if (event.supervisionType) return event.supervisionType;
  const match = (Object.entries(SUPERVISION_TYPE_STYLES) as Array<[SupervisionType, { bgColor: string; textColor: string }]>)
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
    .filter((type): type is SupervisionType => !!type);
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

export const getEditorAnchor = (
  wrapperRect: DOMRect,
  anchorRect: DOMRect,
) => {
  const leftBase = anchorRect.left - wrapperRect.left;
  const maxLeft = wrapperRect.width - SUPERVISION_EDITOR_WIDTH - 12;
  const clampedLeft = Math.max(12, Math.min(leftBase, maxLeft));
  const topBase = anchorRect.bottom - wrapperRect.top + 6;
  const maxTop = wrapperRect.height - SUPERVISION_EDITOR_HEIGHT - 8;
  const bottomOverflow = topBase + SUPERVISION_EDITOR_HEIGHT > wrapperRect.height - 8;
  const top = bottomOverflow
    ? Math.max(8, Math.max(anchorRect.top - wrapperRect.top - SUPERVISION_EDITOR_HEIGHT - 6, maxTop))
    : topBase;
  return { top, left: clampedLeft };
};
