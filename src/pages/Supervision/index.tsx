import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as S from './style';
import Calendar from '@/components/ui/calendar';
import Button from '@/components/ui/button';
import type { CalendarEvent, LegendItem } from '@/types/calendar';
import type { SupervisionDay } from '@/types/supervision';

const LEGENDS: LegendItem[] = [
  { id: 'self_study', label: '자습 감독', bgColor: 'rgba(0, 133, 255, 0.1)', textColor: '#0085FF' },
  { id: 'leave_seat', label: '이석 감독', bgColor: '#D8CCFF', textColor: '#7D55FF' },
];

const SELF_STUDY_COLORS = { bgColor: 'rgba(0, 133, 255, 0.1)', textColor: '#0085FF' };
const LEAVE_SEAT_COLORS = { bgColor: '#D8CCFF', textColor: '#7D55FF' };

const SAMPLE_DATA: SupervisionDay[] = [
  {
    day: '2026-01-02',
    self_study_supervision: { id: 1, teacher: { id: 32523523, name: '이혜정' } },
    leave_seat_supervision: null,
  },
  {
    day: '2026-01-03',
    self_study_supervision: { id: 2, teacher: { id: 32523523, name: '이혜정' } },
    leave_seat_supervision: null,
  },
  {
    day: '2026-01-07',
    self_study_supervision: { id: 3, teacher: { id: 32523523, name: '이혜정' } },
    leave_seat_supervision: null,
  },
  {
    day: '2026-01-08',
    self_study_supervision: { id: 4, teacher: { id: 32523523, name: '이혜정' } },
    leave_seat_supervision: null,
  },
  {
    day: '2026-01-10',
    self_study_supervision: { id: 5, teacher: { id: 32523523, name: '이혜정' } },
    leave_seat_supervision: null,
  },
  {
    day: '2026-01-13',
    self_study_supervision: { id: 6, teacher: { id: 32523523, name: '이혜정' } },
    leave_seat_supervision: null,
  },
  {
    day: '2026-01-14',
    self_study_supervision: { id: 7, teacher: { id: 32523523, name: '이혜정' } },
    leave_seat_supervision: null,
  },
  {
    day: '2026-01-16',
    self_study_supervision: { id: 8, teacher: { id: 32523523, name: '이혜정' } },
    leave_seat_supervision: null,
  },
  {
    day: '2026-01-17',
    self_study_supervision: { id: 9, teacher: { id: 32523523, name: '이혜정' } },
    leave_seat_supervision: { id: 10, teacher: { id: 23423524, name: '손현정' } },
  },
  {
    day: '2026-01-22',
    self_study_supervision: { id: 11, teacher: { id: 32523523, name: '이혜정' } },
    leave_seat_supervision: null,
  },
  {
    day: '2026-01-30',
    self_study_supervision: { id: 12, teacher: { id: 32523523, name: '이혜정' } },
    leave_seat_supervision: { id: 13, teacher: { id: 23423523, name: '윤남노' } },
  },
];

const convertToCalendarEvents = (data: SupervisionDay[]): CalendarEvent[] => {
  const events: CalendarEvent[] = [];

  data.forEach((item) => {
    const [year, month, day] = item.day.split('-').map(Number);
    const date = new Date(year, month - 1, day);

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

const CURRENT_TEACHER_ID = 32523523;

export default function SupervisionPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const monthParam = searchParams.get('month');
  const queryParam = searchParams.get('query');

  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(monthParam ? parseInt(monthParam, 10) : currentDate.getMonth() + 1);
  const [searchValue, setSearchValue] = useState(queryParam || '');

  const [exchangeMode, setExchangeMode] = useState(false);
  const [selectedMyEvent, setSelectedMyEvent] = useState<CalendarEvent | null>(null);
  const [selectedTargetEvent, setSelectedTargetEvent] = useState<CalendarEvent | null>(null);

  const events = useMemo(() => convertToCalendarEvents(SAMPLE_DATA), []);

  useEffect(() => {
    const params: Record<string, string> = { month: String(month) };
    if (searchValue.trim()) {
      params.query = searchValue.trim();
    }
    setSearchParams(params, { replace: true });
  }, [month, searchValue, setSearchParams]);

  const handleMonthChange = (newYear: number, newMonth: number) => {
    setYear(newYear);
    setMonth(newMonth);
  };

  const handleExchangeClick = () => {
    if (exchangeMode) {
      setExchangeMode(false);
      setSelectedMyEvent(null);
      setSelectedTargetEvent(null);
    } else {
      setExchangeMode(true);
    }
  };

  const handleMyEventSelect = (event: CalendarEvent) => {
    setSelectedMyEvent(event);
  };

  const handleTargetEventSelect = (event: CalendarEvent) => {
    setSelectedTargetEvent(event);
    // TODO: TC-11 머지 후 ExchangeModal 연결
    console.log('교체 요청:', {
      myEvent: selectedMyEvent,
      targetEvent: event,
    });
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('검색:', searchValue);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.SearchContainer>
          <S.SearchIcon src="/icons/Search.svg" alt="검색" />
          <S.SearchInput
            type="text"
            placeholder="이름을 입력해주세요."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
          />
        </S.SearchContainer>
        <Button
          text={exchangeMode ? '교체 취소' : '교체하기'}
          variant="confirm"
          onClick={handleExchangeClick}
        />
      </S.Header>
      <S.CalendarWrapper>
        <Calendar
          year={year}
          month={month}
          onMonthChange={handleMonthChange}
          events={events}
          legends={LEGENDS}
          showYear={true}
          showLegend={true}
          exchangeMode={exchangeMode}
          currentTeacherId={CURRENT_TEACHER_ID}
          selectedMyEvent={selectedMyEvent}
          onMyEventSelect={handleMyEventSelect}
          onTargetEventSelect={handleTargetEventSelect}
        />
      </S.CalendarWrapper>
    </S.Container>
  );
}
