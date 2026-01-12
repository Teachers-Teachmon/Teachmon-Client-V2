import { useMemo, useRef, useState } from 'react';
import Calendar from '@/components/ui/calendar';
import Button from '@/components/ui/button';
import Modal from '@/components/layout/modal';
import DateInput from '@/components/ui/input/date';
import Dropdown from '@/components/ui/input/dropdown';
import SearchDropdown from '@/components/ui/input/dropdown/search';
import type { CalendarEvent } from '@/types/calendar';
import type { SupervisionCount } from '@/types/admin';
import * as S from './style';

type ViewMode = 'default' | 'count' | 'edit';

const SAMPLE_EVENTS: CalendarEvent[] = [
  { id: '1', date: new Date('2026-01-01'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
  { id: '2', date: new Date('2026-01-02'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
  { id: '3', date: new Date('2026-01-07'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
  { id: '4', date: new Date('2026-01-08'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
  { id: '5', date: new Date('2026-01-10'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
  { id: '6', date: new Date('2026-01-13'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
  { id: '7', date: new Date('2026-01-14'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
  { id: '8', date: new Date('2026-01-16'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
  { id: '9', date: new Date('2026-01-17'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
  { id: '10', date: new Date('2026-01-17'), label: '손현정 선생님', bgColor: '#D8CCFF', textColor: '#7D55FF', supervisionType: 'leave_seat' },
  { id: '11', date: new Date('2026-01-22'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
  { id: '12', date: new Date('2026-01-30'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
  { id: '13', date: new Date('2026-01-31'), label: '이혜정 선생님', bgColor: '#0085FF0D', textColor: '#0085FF', supervisionType: 'self_study' },
];

const SAMPLE_COUNTS: SupervisionCount[] = [
  { rank: 1, name: '이혜정', selfStudy: 18, leaveSeat: 18, total: 36 },
  { rank: 1, name: '이혜정', selfStudy: 18, leaveSeat: 18, total: 36 },
  { rank: 1, name: '이혜정', selfStudy: 18, leaveSeat: 18, total: 36 },
  { rank: 1, name: '이혜정', selfStudy: 18, leaveSeat: 18, total: 36 },
  { rank: 1, name: '이혜정', selfStudy: 18, leaveSeat: 18, total: 36 },
  { rank: 1, name: '이혜정', selfStudy: 18, leaveSeat: 18, total: 36 },
  { rank: 1, name: '이혜정', selfStudy: 18, leaveSeat: 18, total: 36 },
  { rank: 1, name: '이혜정', selfStudy: 18, leaveSeat: 18, total: 36 },
  { rank: 1, name: '이혜정', selfStudy: 18, leaveSeat: 18, total: 36 },
  { rank: 1, name: '이혜정', selfStudy: 18, leaveSeat: 18, total: 36 },
];

const TEACHER_OPTIONS = ['이혜정 선생님', '손현정 선생님', '김철수 선생님', '박영희 선생님'];
const SUPERVISION_TYPE_LABELS = {
  self_study: '자습 감독',
  leave_seat: '이석 감독',
} as const;
const SUPERVISION_TYPE_OPTIONS = [SUPERVISION_TYPE_LABELS.self_study, SUPERVISION_TYPE_LABELS.leave_seat];
const SUPERVISION_TYPE_VALUES = ['self_study', 'leave_seat'] as const;
type SupervisionType = typeof SUPERVISION_TYPE_VALUES[number];
const SUPERVISION_LABEL_TO_TYPE: Record<string, SupervisionType> = {
  [SUPERVISION_TYPE_LABELS.self_study]: 'self_study',
  [SUPERVISION_TYPE_LABELS.leave_seat]: 'leave_seat',
};
const SUPERVISION_TYPE_STYLES: Record<SupervisionType, { bgColor: string; textColor: string }> = {
  self_study: { bgColor: '#0085FF0D', textColor: '#0085FF' },
  leave_seat: { bgColor: '#D8CCFF', textColor: '#7D55FF' },
};

export default function AdminSupervisionSection() {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [viewMode, setViewMode] = useState<ViewMode>('default');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

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
      const availableTypes = getAvailableTypesForDate(selectedDate, selectedEventId);
      const allowedTypes = selectedEventType
        ? Array.from(new Set([selectedEventType, ...availableTypes]))
        : availableTypes;
      return allowedTypes.map((type) => SUPERVISION_TYPE_LABELS[type]);
    })()
    : SUPERVISION_TYPE_OPTIONS;

  const filteredTeacherOptions = useMemo(() => {
    if (!teacherSearchQuery) return TEACHER_OPTIONS;
    return TEACHER_OPTIONS.filter((teacher) => teacher.includes(teacherSearchQuery));
  }, [teacherSearchQuery]);

  const filteredCounts = useMemo(() => {
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
        const editorWidth = 240;
        const editorHeight = 220;
        const leftBase = anchorRect.left - wrapperRect.left;
        const maxLeft = wrapperRect.width - editorWidth - 12;
        const clampedLeft = Math.max(12, Math.min(leftBase, maxLeft));
        const topBase = anchorRect.bottom - wrapperRect.top + 6;
        const maxTop = wrapperRect.height - editorHeight - 8;
        const bottomOverflow = topBase + editorHeight > wrapperRect.height - 8;
        const top = bottomOverflow
          ? Math.max(8, Math.max(anchorRect.top - wrapperRect.top - editorHeight - 6, maxTop))
          : topBase;
        setEditAnchor({ top, left: clampedLeft });
      }
    }
  };

  const handleDateClick = (date: Date, anchorRect?: DOMRect) => {
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
      const editorWidth = 240;
      const editorHeight = 220;
      const leftBase = anchorRect.left - wrapperRect.left;
      const maxLeft = wrapperRect.width - editorWidth - 12;
      const clampedLeft = Math.max(12, Math.min(leftBase, maxLeft));
      const topBase = anchorRect.bottom - wrapperRect.top + 6;
      const maxTop = wrapperRect.height - editorHeight - 8;
      const bottomOverflow = topBase + editorHeight > wrapperRect.height - 8;
      const top = bottomOverflow
        ? Math.max(8, Math.max(anchorRect.top - wrapperRect.top - editorHeight - 6, maxTop))
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
    const availableTypes = getAvailableTypesForDate(selectedDate, selectedEventId);
    const canSelect = selectedEventType === selectedTypeValue || availableTypes.includes(selectedTypeValue);
    if (!canSelect) return;
    const style = SUPERVISION_TYPE_STYLES[selectedTypeValue];
    if (selectedEventId) {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === selectedEventId
            ? {
              ...event,
              label: selectedTeacher,
              bgColor: style.bgColor,
              textColor: style.textColor,
              supervisionType: selectedTypeValue,
            }
            : event
        )
      );
    } else if (selectedDate) {
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

  return (
    <S.Container>
      <S.HeaderContainer>
        {viewMode === 'edit' ? (
          <>
            <Button variant="confirm" text="돌아가기" onClick={handleCancel} />
            <Button variant="confirm" text="저장" onClick={handleSave} />
          </>
        ) : (
          <>
            <Button variant="confirm" text="감독 횟수 보기" onClick={() => setViewMode('count')} />
            <Button variant="confirm" text="일정 수정하기" onClick={() => setViewMode('edit')} />
            <Button variant="confirm" text="일정 생성하기" onClick={() => setIsCreateModalOpen(true)} />
          </>
        )}
      </S.HeaderContainer>

      <S.ContentWrapper>
        {viewMode === 'count' && (
          <S.SidePanel $isClosing={isClosing}>
            <S.SidePanelHeader>
              <S.CloseButton onClick={handleCloseCountPanel}>
                <img src="/icons/x.svg" alt="닫기" />
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
            onDateClick={viewMode === 'edit' ? (date, _dayInfo, rect) => handleDateClick(date, rect) : undefined}
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

      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} padding="2.5rem">
        <S.ModalContainer>
          <S.ModalTitle>자습감독 일정 생성</S.ModalTitle>
          <S.DateRangeContainer>
            <DateInput label="Date" value={startDate} onChange={setStartDate} />
            <S.DateSeparator>~</S.DateSeparator>
            <DateInput label="Date" value={endDate} onChange={setEndDate} />
          </S.DateRangeContainer>
          <S.ModalButtonGroup>
            <Button variant="cancel" text="취소" onClick={() => setIsCreateModalOpen(false)} width="50%" />
            <Button variant="confirm" text="생성" onClick={handleCreate} width="50%" />
          </S.ModalButtonGroup>
        </S.ModalContainer>
      </Modal>
    </S.Container>
  );
}
