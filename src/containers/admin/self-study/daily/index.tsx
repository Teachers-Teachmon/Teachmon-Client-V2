import { useState, useMemo, useEffect, useRef } from 'react';
import Calendar from '@/components/ui/calendar';
import type { CalendarRangeEvent } from '@/components/ui/calendar';
import Button from '@/components/ui/button';
import { colors } from '@/styles/theme';
import * as S from './style';

const PERIODS = ['1교시', '2교시', '3교시', '4교시', '5교시', '6교시', '7교시', '8교시', '9교시'];

export default function DailySection() {
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<1 | 2 | 3>(2);
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

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

  const handlePeriodToggle = (period: string) => {
    setSelectedPeriods(prev => 
      prev.includes(period) 
        ? prev.filter(p => p !== period)
        : [...prev, period]
    );
  };

  const handleComplete = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedPeriods([]);
  };

  const dateRangeEvents: CalendarRangeEvent[] = useMemo(() => {
    if (!startDate) return [];
    
    if (!endDate) {
      return [
        {
          id: 'selected-start',
          startDate,
          endDate: startDate,
          label: '',
          bgColor: colors.primaryBackground,
          textColor: 'transparent',
        },
      ];
    }
    return [
      {
        id: 'selected-range',
        startDate,
        endDate,
        label: '',
        bgColor: colors.primaryBackground,
        textColor: 'transparent',
      },
    ];
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
          rangeEvents={dateRangeEvents}
          showYear={true}
          showLegend={false}
        />
      </S.CalendarWrapper>

      {showPanel && (
        <S.SidePanel>
          <S.PanelSection>
            <S.SectionTitle>학년</S.SectionTitle>
            <S.GradeTabsContainer>
              <S.GradeTab 
                $active={selectedGrade === 1} 
                onClick={() => setSelectedGrade(1)}
              >
                1학년
              </S.GradeTab>
              <S.GradeTab 
                $active={selectedGrade === 2} 
                onClick={() => setSelectedGrade(2)}
              >
                2학년
              </S.GradeTab>
              <S.GradeTab 
                $active={selectedGrade === 3} 
                onClick={() => setSelectedGrade(3)}
              >
                3학년
              </S.GradeTab>
            </S.GradeTabsContainer>
          </S.PanelSection>

          <S.PanelSection>
            <S.SectionTitle>교시 선택</S.SectionTitle>
            <S.PeriodDropdownWrapper>
              <S.PeriodDropdown ref={dropdownRef}>
                <S.DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  교시
                  <img src="/icons/bottomArrow.svg" alt="arrow" />
                </S.DropdownButton>
                {isDropdownOpen && (
                  <S.DropdownMenu>
                    {PERIODS.map(period => (
                      <S.DropdownItem 
                        key={period}
                        $selected={selectedPeriods.includes(period)}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePeriodToggle(period);
                        }}
                      >
                        <S.Checkbox $checked={selectedPeriods.includes(period)}>
                          {selectedPeriods.includes(period) && '✓'}
                        </S.Checkbox>
                        {period}
                      </S.DropdownItem>
                    ))}
                  </S.DropdownMenu>
                )}
              </S.PeriodDropdown>
              {selectedPeriods.length > 0 && (
                <S.SelectedPeriodsWrapper>
                  {selectedPeriods
                    .sort((a, b) => parseInt(a) - parseInt(b))
                    .map(period => (
                      <S.SelectedPeriodTag key={period}>
                        {period}
                        <S.RemovePeriodButton onClick={() => handlePeriodToggle(period)}>
                          ✕
                        </S.RemovePeriodButton>
                      </S.SelectedPeriodTag>
                    ))
                  }
                </S.SelectedPeriodsWrapper>
              )}
            </S.PeriodDropdownWrapper>
          </S.PanelSection>

          <S.ButtonWrapper>
            <Button 
              text="완료" 
              variant="confirm" 
              width="100%" 
              onClick={handleComplete}
            />
          </S.ButtonWrapper>
        </S.SidePanel>
      )}
    </S.Container>
  );
}
