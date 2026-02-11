import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import Calendar from '@/components/ui/calendar';
import Button from '@/components/ui/button';
import Dropdown from '@/components/ui/input/dropdown';
import SearchDropdown from '@/components/ui/input/dropdown/search';
import TextInput from '@/components/ui/input/text-input';
import type { CalendarEvent, DayInfo } from '@/types/calendar';
import type { SupervisionCount } from '@/types/admin';
import { SUPERVISION_LABEL_TO_TYPE, SUPERVISION_TYPE_LABELS, SUPERVISION_TYPE_STYLES, type SupervisionType } from '@/constants/adminSupervision';
import { convertToCalendarEvents } from '@/utils/supervision';
import { useAdminSupervisionQuery, useSupervisionRankQuery } from '@/services/admin/supervision/adminSupervision.query';
import {
  useCreateSupervisionScheduleMutation,
  useDeleteSupervisionScheduleMutation,
  useUpdateSupervisionScheduleMutation,
} from '@/services/admin/supervision/adminSupervision.mutation';
import {
  getAvailableTypeLabels,
  getAvailableTypesForDate,
  getEditorAnchor,
  getEventType,
  isSameDay,
} from './utils';
import * as S from './style';

type ViewMode = 'default' | 'count' | 'edit';
type SortOrder = 'asc' | 'desc';

interface AdminSupervisionContentProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

interface TeacherOption {
  id: number;
  label: string;
}

export interface AdminSupervisionContentHandle {
  saveChanges: () => Promise<void>;
}

const formatDay = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getMonthKey = (year: number, month: number): string => `${year}-${String(month).padStart(2, '0')}`;

const isSameTeacherAssignment = (
  a: { selfStudyTeacherId: number | null; leaveSeatTeacherId: number | null },
  b: { selfStudyTeacherId: number | null; leaveSeatTeacherId: number | null },
) => a.selfStudyTeacherId === b.selfStudyTeacherId && a.leaveSeatTeacherId === b.leaveSeatTeacherId;

const hasAnyAssignment = (assignment: { selfStudyTeacherId: number | null; leaveSeatTeacherId: number | null }) =>
  assignment.selfStudyTeacherId !== null || assignment.leaveSeatTeacherId !== null;

const getAssignmentsFromEvents = (events: CalendarEvent[]) => {
  const assignments = new Map<string, { selfStudyTeacherId: number | null; leaveSeatTeacherId: number | null }>();

  events.forEach((event) => {
    const type = getEventType(event);
    if (!type) return;
    const day = formatDay(event.date);
    const current = assignments.get(day) ?? { selfStudyTeacherId: null, leaveSeatTeacherId: null };
    const teacherId = event.teacherId ?? null;
    if (type === 'self_study') {
      current.selfStudyTeacherId = teacherId;
    } else {
      current.leaveSeatTeacherId = teacherId;
    }
    assignments.set(day, current);
  });

  return assignments;
};

const AdminSupervisionContent = forwardRef<AdminSupervisionContentHandle, AdminSupervisionContentProps>(function AdminSupervisionContent(
  { viewMode, onViewModeChange },
  ref,
) {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherOption | null>(null);
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editAnchor, setEditAnchor] = useState<{ top: number; left: number } | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [teacherSearchQuery, setTeacherSearchQuery] = useState('');

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [draftEventsByMonth, setDraftEventsByMonth] = useState<Record<string, CalendarEvent[]>>({});
  const [baseEventsByMonth, setBaseEventsByMonth] = useState<Record<string, CalendarEvent[]>>({});

  const calendarWrapperRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const { data: supervisionDays } = useAdminSupervisionQuery(month, '');
  const { data: supervisionRanks } = useSupervisionRankQuery(searchQuery, sortOrder);
  const createScheduleMutation = useCreateSupervisionScheduleMutation();
  const updateScheduleMutation = useUpdateSupervisionScheduleMutation();
  const deleteScheduleMutation = useDeleteSupervisionScheduleMutation();

  const currentMonthKey = useMemo(() => getMonthKey(year, month), [year, month]);

  const baseEvents = useMemo(
    () => convertToCalendarEvents(supervisionDays ?? []),
    [supervisionDays]
  );

  useEffect(() => {
    setBaseEventsByMonth((prev) => ({
      ...prev,
      [currentMonthKey]: baseEvents,
    }));
  }, [baseEvents, currentMonthKey]);

  useEffect(() => {
    if (viewMode === 'edit') {
      setEvents(draftEventsByMonth[currentMonthKey] ?? baseEvents);
      return;
    }

    setEvents(baseEvents);
  }, [baseEvents, currentMonthKey, draftEventsByMonth, viewMode]);

  const selectedEvent = selectedEventId ? events.find((event) => event.id === selectedEventId) ?? null : null;
  const selectedEventType = selectedEvent ? getEventType(selectedEvent) : null;
  const availableTypeLabels = getAvailableTypeLabels(events, selectedDate, selectedEventId);

  const teacherOptions = useMemo(() => {
    const optionMap = new Map<number, TeacherOption>();
    baseEvents.forEach((event) => {
      if (!event.teacherId) return;
      optionMap.set(event.teacherId, { id: event.teacherId, label: event.label });
    });
    return Array.from(optionMap.values());
  }, [baseEvents]);

  const filteredTeacherOptions = useMemo(() => {
    if (!teacherSearchQuery) return teacherOptions;
    return teacherOptions.filter((teacher) => teacher.label.includes(teacherSearchQuery));
  }, [teacherOptions, teacherSearchQuery]);

  const filteredCounts = useMemo<SupervisionCount[]>(() => {
    return (supervisionRanks ?? []).map((item) => ({
      rank: item.rank,
      name: item.name,
      selfStudy: item.self_study_supervision_count,
      leaveSeat: item.leave_seat_supervision_count,
      total: item.total_supervision_count,
    }));
  }, [supervisionRanks]);

  const handleClearSelection = () => {
    setSelectedEventId(null);
    setSelectedTeacher(null);
    setSelectedType('');
    setSelectedDate(null);
    setEditAnchor(null);
    setTeacherSearchQuery('');
  };

  const handleMonthChange = (newYear: number, newMonth: number) => {
    if (newYear === year && newMonth === month) return;
    handleClearSelection();
    setYear(newYear);
    setMonth(newMonth);
  };

  const handleCloseCountPanel = () => {
    setIsClosing(true);
    setTimeout(() => {
      onViewModeChange('default');
      setIsClosing(false);
    }, 300);
  };

  const handleEventClick = (event: CalendarEvent, anchorRect?: DOMRect) => {
    if (viewMode !== 'edit') return;
    const eventType = getEventType(event);
    setSelectedEventId(event.id);
    setSelectedTeacher(event.teacherId ? { id: event.teacherId, label: event.label } : null);
    setSelectedType(eventType ? SUPERVISION_TYPE_LABELS[eventType] : '');
    setSelectedDate(event.date);
    setTeacherSearchQuery('');
    if (anchorRect && calendarWrapperRef.current) {
      const wrapperRect = calendarWrapperRef.current.getBoundingClientRect();
      setEditAnchor(getEditorAnchor(wrapperRect, anchorRect));
    }
  };

  const handleDateClick = (date: Date, _dayInfo: DayInfo, anchorRect?: DOMRect) => {
    if (viewMode !== 'edit') return;
    const availableTypes = getAvailableTypesForDate(events, date);
    if (availableTypes.length === 0) {
      handleClearSelection();
      return;
    }
    setSelectedEventId(null);
    setSelectedTeacher(null);
    setSelectedType('');
    setSelectedDate(date);
    setTeacherSearchQuery('');
    if (anchorRect && calendarWrapperRef.current) {
      const wrapperRect = calendarWrapperRef.current.getBoundingClientRect();
      setEditAnchor(getEditorAnchor(wrapperRect, anchorRect));
    }
  };

  const handleTeacherSelect = (teacher: TeacherOption) => {
    setSelectedTeacher(teacher);
    setSelectedType('');
  };

  const syncMonthDraft = (nextEvents: CalendarEvent[]) => {
    setEvents(nextEvents);
    setDraftEventsByMonth((prev) => ({
      ...prev,
      [currentMonthKey]: nextEvents,
    }));
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    if (!selectedTeacher || !selectedDate || !selectedTeacher.id) return;

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

      const nextEvents = events.map((event) => {
        if (event.id === selectedEventId) {
          return {
            ...event,
            label: selectedTeacher.label,
            teacherId: selectedTeacher.id,
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
      });

      syncMonthDraft(nextEvents);
    } else {
      const availableTypes = getAvailableTypesForDate(events, selectedDate, null);
      if (!availableTypes.includes(selectedTypeValue)) return;

      const nextId = `${selectedDate.getTime()}-${Math.random().toString(36).slice(2, 8)}`;
      const nextEvents = [
        ...events,
        {
          id: nextId,
          date: selectedDate,
          label: selectedTeacher.label,
          teacherId: selectedTeacher.id,
          bgColor: style.bgColor,
          textColor: style.textColor,
          supervisionType: selectedTypeValue,
        },
      ];

      syncMonthDraft(nextEvents);
    }

    handleClearSelection();
  };

  const handleDeleteSelected = () => {
    if (!selectedEventId) return;

    const nextEvents = events.filter((event) => event.id !== selectedEventId);
    syncMonthDraft(nextEvents);
    handleClearSelection();
  };

  const saveChanges = useCallback(async () => {
    const draftSnapshot: Record<string, CalendarEvent[]> = {
      ...draftEventsByMonth,
      [currentMonthKey]: events,
    };

    const monthKeys = Object.keys(draftSnapshot);

    for (const monthKey of monthKeys) {
      const baseByDay = getAssignmentsFromEvents(baseEventsByMonth[monthKey] ?? []);
      const currentByDay = getAssignmentsFromEvents(draftSnapshot[monthKey] ?? []);
      const targetDays = new Set<string>([...baseByDay.keys(), ...currentByDay.keys()]);

      for (const day of targetDays) {
        const before = baseByDay.get(day) ?? { selfStudyTeacherId: null, leaveSeatTeacherId: null };
        const after = currentByDay.get(day) ?? { selfStudyTeacherId: null, leaveSeatTeacherId: null };

        if (isSameTeacherAssignment(before, after)) continue;

        if (!hasAnyAssignment(before) && hasAnyAssignment(after)) {
          await createScheduleMutation.mutateAsync({
            day,
            self_study_supervision_teacher_id: after.selfStudyTeacherId,
            leave_seat_supervision_teacher_id: after.leaveSeatTeacherId,
          });
          continue;
        }

        if (hasAnyAssignment(before) && !hasAnyAssignment(after)) {
          await deleteScheduleMutation.mutateAsync({
            day,
            type: 'all',
          });
          continue;
        }

        await updateScheduleMutation.mutateAsync({
          day,
          self_study_supervision_teacher_id: after.selfStudyTeacherId,
          leave_seat_supervision_teacher_id: after.leaveSeatTeacherId,
        });
      }
    }

    setDraftEventsByMonth({});
  }, [baseEventsByMonth, createScheduleMutation, currentMonthKey, deleteScheduleMutation, draftEventsByMonth, events, updateScheduleMutation]);

  useImperativeHandle(ref, () => ({
    saveChanges,
  }), [saveChanges]);

  useEffect(() => {
    if (viewMode !== 'edit') {
      handleClearSelection();
      setDraftEventsByMonth({});
    }
    if (viewMode !== 'count') {
      setIsClosing(false);
    }
  }, [viewMode]);

  useEffect(() => {
    if (viewMode !== 'count') return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [viewMode]);

  useEffect(() => {
    if (viewMode !== 'edit') return;
    if (!editAnchor) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClearSelection();
      }
    };

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (editorRef.current && editorRef.current.contains(target)) return;
      handleClearSelection();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [viewMode, editAnchor]);

  return (
    <S.ContentWrapper>
      {viewMode === 'count' && (
        <S.SidePanel $isClosing={isClosing}>
          <S.SidePanelHeader>
            <S.CloseButton onClick={handleCloseCountPanel}>
              <img src="/icons/common/x.svg" alt="닫기" />
            </S.CloseButton>
          </S.SidePanelHeader>
          <S.SearchContainer>
            <S.SearchInputWrapper>
              <TextInput
                type="text"
                placeholder="선생님을 입력해주세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                customHeight="40px"
                customPadding="0 12px"
              />
            </S.SearchInputWrapper>
            <S.SortButtons>
              <S.SortButton $active={sortOrder === 'desc'} onClick={() => setSortOrder('desc')}>
                내림차순
              </S.SortButton>
              <S.SortButton $active={sortOrder === 'asc'} onClick={() => setSortOrder('asc')}>
                오름차순
              </S.SortButton>
            </S.SortButtons>
          </S.SearchContainer>
          <S.TableHeader>
            <S.TableCell $width="50px">순위</S.TableCell>
            <S.TableCell $width="80px">이름</S.TableCell>
            <S.TableCell $width="60px">자습감독</S.TableCell>
            <S.TableCell $width="60px">이석감독</S.TableCell>
            <S.TableCell $width="50px">합계</S.TableCell>
          </S.TableHeader>
          <S.TableBody>
            {filteredCounts.map((item, index) => (
              <S.TableRow key={index}>
                <S.TableCell $width="50px">{item.rank}위</S.TableCell>
                <S.TableCell $width="80px">{item.name}</S.TableCell>
                <S.TableCell $width="60px">{item.selfStudy}회</S.TableCell>
                <S.TableCell $width="60px">{item.leaveSeat}회</S.TableCell>
                <S.TableCell $width="50px">{item.total}회</S.TableCell>
              </S.TableRow>
            ))}
          </S.TableBody>
        </S.SidePanel>
      )}

      <S.CalendarWrapper $hasSidePanel={viewMode === 'count'} ref={calendarWrapperRef}>
        <Calendar
          year={year}
          month={month}
          onMonthChange={handleMonthChange}
          events={events}
          showYear={true}
          showLegend={false}
          showMobilePopover={viewMode !== 'edit'}
          onEventClick={viewMode === 'edit' ? handleEventClick : undefined}
          onDateClick={viewMode === 'edit' ? handleDateClick : undefined}
        />
        {viewMode === 'edit' && editAnchor && (
          <S.FloatingEditor ref={editorRef} $top={editAnchor.top} $left={editAnchor.left}>
            <SearchDropdown
              placeholder="이름을 입력해주세요"
              searchPlaceholder="선생님 검색"
              items={filteredTeacherOptions}
              value={selectedTeacher}
              onChange={handleTeacherSelect}
              onSearchChange={setTeacherSearchQuery}
              renderItem={(item) => item.label}
              getItemKey={(item) => item.id}
              customWidth="100%"
            />
            <S.EditTitle>자습/이석 선택</S.EditTitle>
            <Dropdown
              placeholder="자습/이석 선택"
              items={availableTypeLabels}
              value={selectedType}
              onChange={handleTypeSelect}
              customWidth="100%"
              disabled={!selectedTeacher?.id}
            />
            {selectedEventId && (
              <Button
                variant="delete"
                text="선택 삭제"
                width="100%"
                onClick={handleDeleteSelected}
              />
            )}
          </S.FloatingEditor>
        )}
      </S.CalendarWrapper>
    </S.ContentWrapper>
  );
});

export default AdminSupervisionContent;
