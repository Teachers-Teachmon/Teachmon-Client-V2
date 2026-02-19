import Calendar from '@/components/ui/calendar';
import SearchDropdown from '@/components/ui/input/dropdown/search';
import type { AfterSchoolTeacher } from '@/types/admin';
import type { CalendarEvent } from '@/types/calendar';
import * as S from './style';

type Mode = 'select' | 'select-makeup';

interface BusinessTripSectionProps {
  year: number;
  month: number;
  onMonthChange: (year: number, month: number) => void;
  selectedTeacher?: AfterSchoolTeacher;
  teacherOptions: AfterSchoolTeacher[];
  teacherSearchQuery: string;
  onTeacherSearchChange: (value: string) => void;
  onTeacherSelect: (teacher: AfterSchoolTeacher) => void;
  onTripEventClick: (event: CalendarEvent) => void;
  onMakeupDateClick: (date: Date) => void;
  tripEvents: CalendarEvent[];
  makeupEvents: CalendarEvent[];
  mode: Mode;
}

export default function BusinessTripSection({
  year,
  month,
  onMonthChange,
  selectedTeacher,
  teacherOptions,
  teacherSearchQuery,
  onTeacherSearchChange,
  onTeacherSelect,
  onTripEventClick,
  onMakeupDateClick,
  tripEvents,
  makeupEvents,
  mode,
}: BusinessTripSectionProps) {
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
            onEventClick={(event) => onMakeupDateClick(event.date)}
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
            items={teacherOptions}
            value={selectedTeacher}
            onChange={onTeacherSelect}
            searchQuery={teacherSearchQuery}
            onSearchChange={onTeacherSearchChange}
            renderItem={(item) => item.name}
            getItemKey={(item) => item.id}
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
