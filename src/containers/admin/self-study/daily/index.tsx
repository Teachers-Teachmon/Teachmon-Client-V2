import { useState, useMemo } from 'react';
import Calendar from '@/components/ui/calendar';
import type { CalendarRangeEvent, CalendarEvent } from '@/components/ui/calendar';
import Button from '@/components/ui/button';
import { colors } from '@/styles/theme';
import type { SelfStudySchedule, Grade } from '@/types/selfStudy';
import { INITIAL_SELF_STUDY_SCHEDULES } from '@/constants/adminSelfStudy';
import { generateScheduleId, getDatesInRange, getGradeColor, formatGrade, formatPeriods } from '@/utils/selfStudy';
import SidePanel from './side-panel';
import DetailModal from './detail-modal';
import * as S from './style';

export default function DailySection() {
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<Grade>(2);
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const [schedules, setSchedules] = useState<SelfStudySchedule[]>(INITIAL_SELF_STUDY_SCHEDULES);
  const [selectedSchedule, setSelectedSchedule] = useState<SelfStudySchedule | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMonthChange = (year: number, month: number) => {
    setSelectedYear(year);
    setSelectedMonth(month);
  };

  const handleDateClick = (date: Date, dayInfo?: { isCurrentMonth: boolean }) => {
    if (!dayInfo?.isCurrentMonth) return;
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return;
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  const handleEventClick = (event: CalendarEvent) => {
    const schedule = schedules.find(s => s.id === event.id);
    if (schedule) {
      setSelectedSchedule(schedule);
      setIsModalOpen(true);
    }
  };

  const handlePeriodToggle = (period: string) => {
    setSelectedPeriods(prev => 
      prev.includes(period) 
        ? prev.filter(p => p !== period)
        : [...prev, period]
    );
  };

  const handleComplete = () => {
    if (!startDate || !endDate || selectedPeriods.length === 0) {
      return;
    }

    const datesInRange = getDatesInRange(startDate, endDate);
    const newSchedules: SelfStudySchedule[] = datesInRange.map(date => ({
      id: generateScheduleId(),
      date: new Date(date),
      grade: selectedGrade,
      periods: [...selectedPeriods],
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    }));

    setSchedules(prev => [...prev, ...newSchedules]);
    setStartDate(null);
    setEndDate(null);
    setSelectedPeriods([]);
  };

  const handleCancelSelection = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedPeriods([]);
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedules(prev => prev.filter(schedule => schedule.id !== id));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSchedule(null);
  };

  const calendarEvents: CalendarEvent[] = useMemo(() => {
    return schedules.map(schedule => {
      const { bgColor, textColor } = getGradeColor(schedule.grade);
      const periodsText = formatPeriods(schedule.periods);
      
      return {
        id: schedule.id,
        date: schedule.date,
        label: `${formatGrade(schedule.grade)} ${periodsText}`,
        bgColor,
        textColor,
      };
    });
  }, [schedules]);

  const dateRangeEvents: CalendarRangeEvent[] = useMemo(() => {
    const events = [];

    if (startDate) {
      if (!endDate) {
        events.push({
          id: 'selected-start',
          startDate,
          endDate: startDate,
          label: '',
          bgColor: colors.primaryBackground,
          textColor: 'transparent',
        });
      } else {
        events.push({
          id: 'selected-range',
          startDate,
          endDate,
          label: '',
          bgColor: colors.primaryBackground,
          textColor: 'transparent',
        });
      }
    }

    return events;
  }, [startDate, endDate]);

  const showPanel = startDate && endDate;

  return (
    <S.Container>
      <S.CalendarWrapper>
        <Calendar
          year={selectedYear}
          month={selectedMonth}
          onMonthChange={handleMonthChange}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
          events={calendarEvents}
          rangeEvents={dateRangeEvents}
          showYear={true}
          showLegend={false}
        />
        {startDate && (
          <S.CancelButtonWrapper>
            <Button
              text="취소하기"
              variant="confirm"
              onClick={handleCancelSelection}
            />
          </S.CancelButtonWrapper>
        )}
      </S.CalendarWrapper>

      {showPanel && (
        <SidePanel
          selectedGrade={selectedGrade}
          onGradeChange={setSelectedGrade}
          selectedPeriods={selectedPeriods}
          onPeriodToggle={handlePeriodToggle}
          onComplete={handleComplete}
        />
      )}

      <DetailModal
        isOpen={isModalOpen}
        schedule={selectedSchedule}
        onClose={handleCloseModal}
        onDelete={handleDeleteSchedule}
      />
    </S.Container>
  );
}
