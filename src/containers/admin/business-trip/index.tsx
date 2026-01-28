import { useMemo } from 'react';
import Calendar from '@/components/ui/calendar';
import SearchDropdown from '@/components/ui/input/dropdown/search';
import { transformBusinessTripToCalendarEvents, transformMakeupToCalendarEvents } from '@/utils/admin';
import type { AfterSchoolTeacher } from '@/types/admin';
import type { CalendarEvent } from '@/types/calendar';
import { SAMPLE_TEACHERS, SAMPLE_TRIP_SCHEDULES, SAMPLE_MAKEUP_SCHEDULES } from './data';
import * as S from './style';

type Mode = 'select' | 'select-makeup';

interface BusinessTripSectionProps {
  year: number;
  month: number;
  onMonthChange: (year: number, month: number) => void;
  selectedTeacher?: AfterSchoolTeacher;
  onTeacherSelect: (teacher: AfterSchoolTeacher) => void;
  onTripEventClick: (event: CalendarEvent) => void;
  onMakeupDateClick: (date: Date) => void;
  mode: Mode;
}

export default function BusinessTripSection({
  year,
  month,
  onMonthChange,
  selectedTeacher,
  onTeacherSelect,
  onTripEventClick,
  onMakeupDateClick,
  mode,
}: BusinessTripSectionProps) {
  const tripEvents = useMemo(() => {
    if (!selectedTeacher) return [];
    return transformBusinessTripToCalendarEvents(SAMPLE_TRIP_SCHEDULES);
  }, [selectedTeacher]);

  const makeupEvents = useMemo(() => {
    return transformMakeupToCalendarEvents(SAMPLE_MAKEUP_SCHEDULES);
  }, []);

  if (mode === 'select-makeup') {
    return (
      <S.Container>
        <S.Title>"{selectedTeacher?.name}" 보강 날짜를 선택해주세요.</S.Title>
        <S.CalendarWrapper>
          <Calendar
            year={year}
            month={month}
            onMonthChange={onMonthChange}
            events={makeupEvents}
            showYear={true}
            showLegend={false}
            showMobilePopover={false}
            onDateClick={onMakeupDateClick}
          />
        </S.CalendarWrapper>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.HeaderContainer>
        <S.DropdownWrapper>
          <SearchDropdown<AfterSchoolTeacher>
            placeholder="이름을 입력해주세요"
            items={SAMPLE_TEACHERS}
            value={selectedTeacher}
            onChange={onTeacherSelect}
            renderItem={(item) => item.name}
            customWidth="250px"
          />
        </S.DropdownWrapper>
      </S.HeaderContainer>
      <S.CalendarWrapper>
        <Calendar
          year={year}
          month={month}
          onMonthChange={onMonthChange}
          events={tripEvents}
          showYear={true}
          showLegend={false}
          showMobilePopover={false}
          onEventClick={onTripEventClick}
        />
      </S.CalendarWrapper>
    </S.Container>
  );
}
