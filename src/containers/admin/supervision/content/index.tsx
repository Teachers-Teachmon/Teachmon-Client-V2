import { useEffect, useMemo, useRef, useState } from 'react';
import Calendar from '@/components/ui/calendar';
import Dropdown from '@/components/ui/input/dropdown';
import SearchDropdown from '@/components/ui/input/dropdown/search';
import type { CalendarEvent, DayInfo } from '@/types/calendar';
import type { SupervisionCount } from '@/types/admin';
import { SAMPLE_COUNTS, SAMPLE_EVENTS, SAMPLE_TEACHERS } from '@/containers/admin/supervision/data';
import { SUPERVISION_LABEL_TO_TYPE, SUPERVISION_TYPE_LABELS, SUPERVISION_TYPE_STYLES, type SupervisionType } from '@/constants/adminSupervision';
import {
  filterCounts,
  filterTeachers,
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

export default function AdminSupervisionContent({ viewMode, onViewModeChange }: AdminSupervisionContentProps) {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
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

  const selectedEvent = selectedEventId ? events.find((event) => event.id === selectedEventId) ?? null : null;
  const selectedEventType = selectedEvent ? getEventType(selectedEvent) : null;
  const availableTypeLabels = getAvailableTypeLabels(events, selectedDate, selectedEventId);

  const filteredTeacherOptions = useMemo(() => {
    return filterTeachers(SAMPLE_TEACHERS, teacherSearchQuery);
  }, [teacherSearchQuery]);

  const filteredCounts = useMemo<SupervisionCount[]>(() => {
    return filterCounts(SAMPLE_COUNTS, searchQuery, sortOrder);
  }, [searchQuery, sortOrder]);

  const handleMonthChange = (newYear: number, newMonth: number) => {
    setYear(newYear);
    setMonth(newMonth);
  };

  const handleClearSelection = () => {
    setSelectedEventId(null);
    setSelectedTeacher('');
    setSelectedType('');
    setSelectedDate(null);
    setEditAnchor(null);
    setTeacherSearchQuery('');
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
    setSelectedTeacher(event.label);
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
    setSelectedTeacher('');
    setSelectedType('');
    setSelectedDate(date);
    setTeacherSearchQuery('');
    if (anchorRect && calendarWrapperRef.current) {
      const wrapperRect = calendarWrapperRef.current.getBoundingClientRect();
      setEditAnchor(getEditorAnchor(wrapperRect, anchorRect));
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
      const availableTypes = getAvailableTypesForDate(events, selectedDate, null);
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

  useEffect(() => {
    if (viewMode !== 'edit') {
      handleClearSelection();
    }
    if (viewMode !== 'count') {
      setIsClosing(false);
    }
  }, [viewMode]);

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
            <S.SearchInput
              type="text"
              placeholder="선생님을 입력해주세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <S.SortButtons>
              <S.SortButton $active={sortOrder === 'desc'} onClick={() => setSortOrder('desc')}>
                오름차순
              </S.SortButton>
              <S.SortButton $active={sortOrder === 'asc'} onClick={() => setSortOrder('asc')}>
                내림차순
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
          onEventClick={viewMode === 'edit' ? handleEventClick : undefined}
          onDateClick={viewMode === 'edit' ? handleDateClick : undefined}
        />
        {viewMode === 'edit' && editAnchor && (
          <S.FloatingEditor $top={editAnchor.top} $left={editAnchor.left}>
            <SearchDropdown
              placeholder="이름을 입력해주세요"
              searchPlaceholder="선생님 검색"
              items={filteredTeacherOptions}
              value={selectedTeacher}
              onChange={handleTeacherSelect}
              onSearchChange={setTeacherSearchQuery}
              customWidth="100%"
            />
            <S.EditTitle>자습/이석 선택</S.EditTitle>
            <Dropdown
              placeholder="자습/이석 선택"
              items={availableTypeLabels}
              value={selectedType}
              onChange={handleTypeSelect}
              customWidth="100%"
              disabled={!selectedTeacher}
            />
          </S.FloatingEditor>
        )}
      </S.CalendarWrapper>
    </S.ContentWrapper>
  );
}
