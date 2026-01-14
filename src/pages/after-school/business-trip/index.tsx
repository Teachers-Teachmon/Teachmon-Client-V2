import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Calendar from '@/components/ui/calendar';
import type { CalendarEvent, CalendarRangeEvent } from '@/components/ui/calendar';
import Button from '@/components/ui/button';
import ConfirmModal from '@/components/layout/modal/confirm';
import { colors } from '@/styles/theme';
import * as S from './style';

export default function BusinessTripPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const classData = location.state?.classData;
  
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const businessTripEvents: CalendarEvent[] = useMemo(() => {
    if (!classData) return [];
    
    const dayMap: Record<string, number> = { '월': 1, '화': 2, '수': 3, '목': 4, '금': 5 };
    const targetDay = dayMap[classData.day];
    if (!targetDay) return [];
    
    const events: CalendarEvent[] = [];
    const firstDay = new Date(selectedYear, selectedMonth - 1, 1);
    const lastDay = new Date(selectedYear, selectedMonth, 0);
    
    for (let date = new Date(firstDay); date <= lastDay; date.setDate(date.getDate() + 1)) {
      if (date.getDay() === targetDay) {
        events.push({
          id: `event-${date.getDate()}`,
          date: new Date(date),
          label: classData.subject,
          bgColor: 'rgba(0, 133, 255, 0.1)',
          textColor: '#0085FF'
        });
      }
    }
    
    return events;
  }, [classData, selectedYear, selectedMonth]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleConfirm = () => { 
    setIsModalOpen(false);
    setIsSecondModalOpen(true);
  };

  const handleSecondModalConfirm = () => {
    navigate('/after-school/extra', { state: { classData, businessTripDate: selectedDate } });
  };

  const handleSecondModalCancel = () => {
    navigate(-1);
  };

  const handleMonthChange = (year: number, month: number) => {
    setSelectedYear(year);
    setSelectedMonth(month);
  };

  const handleDateClick = (date: Date) => {
    const hasEvent = businessTripEvents.some(event => 
      event.date.getFullYear() === date.getFullYear() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getDate() === date.getDate()
    );
    
    if (hasEvent) {
      setSelectedDate(date);
      setIsModalOpen(true);
    }
  };

  const handleEventClick = (event: CalendarEvent) => {
  };

  return (
    <S.PageContainer>
      <S.Header>
        <S.Title>"{classData?.subject || '스프링 수업'}" 방과후 출장 날짜를 선택해주세요.</S.Title>
        <Button text="돌아가기" variant="confirm" width="120px" onClick={handleGoBack} />
      </S.Header>
      
      <S.CalendarWrapper>
        <Calendar
          year={selectedYear}
          month={selectedMonth}
          onMonthChange={handleMonthChange}
          events={businessTripEvents}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
          showYear={false}
          showLegend={false}
        />
      </S.CalendarWrapper>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="출장"
        message={
          <S.ModalMessage>
            <S.ModalHighlight>
              {selectedDate?.getFullYear()}년 {(selectedDate?.getMonth() || 0) + 1}월 {selectedDate?.getDate()}일 {classData?.subject || '스프링 수업'}
            </S.ModalHighlight>
            을<br />출장 처리 하시겠습니까?
          </S.ModalMessage>
        }
        cancelText="취소"
        confirmText="완료"
      />

      <ConfirmModal
        isOpen={isSecondModalOpen}
        onClose={handleSecondModalCancel}
        onConfirm={handleSecondModalConfirm}
        title="출장"
        message="보강 날짜도 미리 정하시겠습니까?"
        cancelText="취소"
        confirmText="완료"
      />
    </S.PageContainer>
  );
}
