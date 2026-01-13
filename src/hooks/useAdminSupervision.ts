import { createContext, useContext, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { CalendarEvent, DayInfo } from '@/types/calendar';
import type { SupervisionCount } from '@/types/admin';
import { SAMPLE_COUNTS, SAMPLE_EVENTS, SAMPLE_TEACHERS } from '@/containers/admin/supervision/data';
import {
  SUPERVISION_EDITOR_HEIGHT,
  SUPERVISION_EDITOR_WIDTH,
  SUPERVISION_LABEL_TO_TYPE,
  SUPERVISION_TYPE_LABELS,
  SUPERVISION_TYPE_OPTIONS,
  SUPERVISION_TYPE_STYLES,
  SUPERVISION_TYPE_VALUES,
  type SupervisionType,
} from '@/constants/adminSupervision';

type ViewMode = 'default' | 'count' | 'edit';

type SortOrder = 'asc' | 'desc';

interface AdminSupervisionContextValue {
  year: number;
  month: number;
  viewMode: ViewMode;
  isCreateModalOpen: boolean;
  startDate: string;
  endDate: string;
  searchQuery: string;
  sortOrder: SortOrder;
  selectedTeacher: string;
  selectedType: string;
  editAnchor: { top: number; left: number } | null;
  isClosing: boolean;
  filteredTeacherOptions: string[];
  availableTypeLabels: string[];
  filteredCounts: SupervisionCount[];
  events: CalendarEvent[];
  calendarWrapperRef: React.RefObject<HTMLDivElement>;
  handleMonthChange: (year: number, month: number) => void;
  handleCreate: () => void;
  handleEventClick: (event: CalendarEvent, anchorRect?: DOMRect) => void;
  handleDateClick: (date: Date, dayInfo: DayInfo, anchorRect?: DOMRect) => void;
  handleTeacherSelect: (teacher: string) => void;
  handleTypeSelect: (type: string) => void;
  handleSave: () => void;
  handleCancel: () => void;
  handleCloseCountPanel: () => void;
  setViewMode: (mode: ViewMode) => void;
  setIsCreateModalOpen: (value: boolean) => void;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
  setSearchQuery: (value: string) => void;
  setSortOrder: (value: SortOrder) => void;
  setTeacherSearchQuery: (value: string) => void;
}

const AdminSupervisionContext = createContext<AdminSupervisionContextValue | null>(null);

export function AdminSupervisionProvider({ children }: { children: ReactNode }) {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [viewMode, setViewMode] = useState<ViewMode>('default');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editAnchor, setEditAnchor] = useState<{ top: number; left: number } | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [teacherSearchQuery, setTeacherSearchQuery] = useState('');

  const [events, setEvents] = useState<CalendarEvent[]>(SAMPLE_EVENTS);
  const calendarWrapperRef = useRef<HTMLDivElement>(null);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const getEventType = (event: CalendarEvent): SupervisionType | null => {
    if (event.supervisionType) return event.supervisionType;
    const match = (Object.entries(SUPERVISION_TYPE_STYLES) as Array<[SupervisionType, { bgColor: string; textColor: string }]>)
      .find(([, style]) => style.bgColor === event.bgColor && style.textColor === event.textColor);
    return match?.[0] ?? null;
  };

  const getExistingTypesForDate = (date: Date, excludeEventId?: string | null) => {
    return events
      .filter((event) => isSameDay(event.date, date) && event.id !== excludeEventId)
      .map(getEventType)
      .filter((type): type is SupervisionType => !!type);
  };

  const getAvailableTypesForDate = (date: Date, excludeEventId?: string | null) => {
    const existingTypes = getExistingTypesForDate(date, excludeEventId);
    return SUPERVISION_TYPE_VALUES.filter((type) => !existingTypes.includes(type));
  };

  const selectedEvent = selectedEventId ? events.find((event) => event.id === selectedEventId) ?? null : null;
  const selectedEventType = selectedEvent ? getEventType(selectedEvent) : null;
  const availableTypeLabels = selectedDate
    ? (() => {
      if (!selectedEventId) {
        const availableTypes = getAvailableTypesForDate(selectedDate, null);
        return availableTypes.map((type) => SUPERVISION_TYPE_LABELS[type]);
      }
      return SUPERVISION_TYPE_OPTIONS;
    })()
    : SUPERVISION_TYPE_OPTIONS;

  const filteredTeacherOptions = useMemo(() => {
    if (!teacherSearchQuery) return SAMPLE_TEACHERS;
    return SAMPLE_TEACHERS.filter((teacher) => teacher.includes(teacherSearchQuery));
  }, [teacherSearchQuery]);

  const filteredCounts = useMemo<SupervisionCount[]>(() => {
    let result = [...SAMPLE_COUNTS];
    if (searchQuery) {
      result = result.filter(item => item.name.includes(searchQuery));
    }
    result.sort((a, b) => sortOrder === 'asc' ? a.total - b.total : b.total - a.total);
    return result;
  }, [searchQuery, sortOrder]);

  const handleMonthChange = (newYear: number, newMonth: number) => {
    setYear(newYear);
    setMonth(newMonth);
  };

  const handleCreate = () => {
    console.log('생성:', { startDate, endDate });
    setIsCreateModalOpen(false);
    setStartDate('');
    setEndDate('');
  };

  const handleEventClick = (event: CalendarEvent, anchorRect?: DOMRect) => {
    if (viewMode === 'edit') {
      const eventType = getEventType(event);
      setSelectedEventId(event.id);
      setSelectedTeacher(event.label);
      setSelectedType(eventType ? SUPERVISION_TYPE_LABELS[eventType] : '');
      setSelectedDate(event.date);
      setTeacherSearchQuery('');
      if (anchorRect && calendarWrapperRef.current) {
        const wrapperRect = calendarWrapperRef.current.getBoundingClientRect();
        const leftBase = anchorRect.left - wrapperRect.left;
        const maxLeft = wrapperRect.width - SUPERVISION_EDITOR_WIDTH - 12;
        const clampedLeft = Math.max(12, Math.min(leftBase, maxLeft));
        const topBase = anchorRect.bottom - wrapperRect.top + 6;
        const maxTop = wrapperRect.height - SUPERVISION_EDITOR_HEIGHT - 8;
        const bottomOverflow = topBase + SUPERVISION_EDITOR_HEIGHT > wrapperRect.height - 8;
        const top = bottomOverflow
          ? Math.max(8, Math.max(anchorRect.top - wrapperRect.top - SUPERVISION_EDITOR_HEIGHT - 6, maxTop))
          : topBase;
        setEditAnchor({ top, left: clampedLeft });
      }
    }
  };

  const handleDateClick = (date: Date, _dayInfo: DayInfo, anchorRect?: DOMRect) => {
    if (viewMode !== 'edit') return;
    const availableTypes = getAvailableTypesForDate(date);
    if (availableTypes.length === 0) {
      handleClearSelection();
      return;
    }
    setSelectedEventId(null);
    setSelectedTeacher('');
    setSelectedType('');
    setSelectedDate(date);
    setTeacherSearchQuery('');
    if (anchorRect && calendarWrapperRef.current) {
      const wrapperRect = calendarWrapperRef.current.getBoundingClientRect();
      const leftBase = anchorRect.left - wrapperRect.left;
      const maxLeft = wrapperRect.width - SUPERVISION_EDITOR_WIDTH - 12;
      const clampedLeft = Math.max(12, Math.min(leftBase, maxLeft));
      const topBase = anchorRect.bottom - wrapperRect.top + 6;
      const maxTop = wrapperRect.height - SUPERVISION_EDITOR_HEIGHT - 8;
      const bottomOverflow = topBase + SUPERVISION_EDITOR_HEIGHT > wrapperRect.height - 8;
      const top = bottomOverflow
        ? Math.max(8, Math.max(anchorRect.top - wrapperRect.top - SUPERVISION_EDITOR_HEIGHT - 6, maxTop))
        : topBase;
      setEditAnchor({ top, left: clampedLeft });
    }
  };

  const handleTeacherSelect = (teacher: string) => {
    setSelectedTeacher(teacher);
    setSelectedType('');
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    if (!selectedTeacher || !selectedDate) return;
    const selectedTypeValue = SUPERVISION_LABEL_TO_TYPE[type];
    if (!selectedTypeValue) return;
    const style = SUPERVISION_TYPE_STYLES[selectedTypeValue];
    if (selectedEventId) {
      const otherEvent = events.find(
        (event) =>
          event.id !== selectedEventId &&
          isSameDay(event.date, selectedDate) &&
          getEventType(event) === selectedTypeValue
      );
      setEvents((prev) =>
        prev.map((event) => {
          if (event.id === selectedEventId) {
            return {
              ...event,
              label: selectedTeacher,
              bgColor: style.bgColor,
              textColor: style.textColor,
              supervisionType: selectedTypeValue,
            };
          }
          if (otherEvent && event.id === otherEvent.id) {
            const fallbackType: SupervisionType = selectedEventType ?? 'self_study';
            const fallbackStyle = SUPERVISION_TYPE_STYLES[fallbackType];
            return {
              ...event,
              bgColor: fallbackStyle.bgColor,
              textColor: fallbackStyle.textColor,
              supervisionType: fallbackType,
            };
          }
          return event;
        })
      );
    } else if (selectedDate) {
      const availableTypes = getAvailableTypesForDate(selectedDate, null);
      if (!availableTypes.includes(selectedTypeValue)) return;
      const nextId = `${selectedDate.getTime()}-${Math.random().toString(36).slice(2, 8)}`;
      setEvents((prev) => [
        ...prev,
        {
          id: nextId,
          date: selectedDate,
          label: selectedTeacher,
          bgColor: style.bgColor,
          textColor: style.textColor,
          supervisionType: selectedTypeValue,
        },
      ]);
    }
    setSelectedEventId(null);
    setSelectedTeacher('');
    setSelectedType('');
    setSelectedDate(null);
    setEditAnchor(null);
  };

  const handleSave = () => {
    console.log('저장');
    setViewMode('default');
  };

  const handleClearSelection = () => {
    setSelectedEventId(null);
    setSelectedTeacher('');
    setSelectedType('');
    setSelectedDate(null);
    setEditAnchor(null);
    setTeacherSearchQuery('');
  };

  const handleCancel = () => {
    setViewMode('default');
    handleClearSelection();
  };

  const handleCloseCountPanel = () => {
    setIsClosing(true);
    setTimeout(() => {
      setViewMode('default');
      setIsClosing(false);
    }, 300);
  };

  const value = {
    year,
    month,
    viewMode,
    isCreateModalOpen,
    startDate,
    endDate,
    searchQuery,
    sortOrder,
    selectedTeacher,
    selectedType,
    editAnchor,
    isClosing,
    filteredTeacherOptions,
    availableTypeLabels,
    filteredCounts,
    events,
    calendarWrapperRef,
    handleMonthChange,
    handleCreate,
    handleEventClick,
    handleDateClick,
    handleTeacherSelect,
    handleTypeSelect,
    handleSave,
    handleCancel,
    handleCloseCountPanel,
    setViewMode,
    setIsCreateModalOpen,
    setStartDate,
    setEndDate,
    setSearchQuery,
    setSortOrder,
    setTeacherSearchQuery,
  };

  return <AdminSupervisionContext.Provider value={value}>{children}</AdminSupervisionContext.Provider>;
}

export function useAdminSupervision() {
  const context = useContext(AdminSupervisionContext);
  if (!context) {
    throw new Error('useAdminSupervision must be used within AdminSupervisionProvider');
  }
  return context;
}
