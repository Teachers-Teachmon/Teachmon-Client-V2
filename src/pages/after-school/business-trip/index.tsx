import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Calendar from '@/components/ui/calendar';
import type { CalendarEvent } from '@/components/ui/calendar';
import Button from '@/components/ui/button';
import ConfirmModal from '@/components/layout/modal/confirm';
import { toast } from 'react-toastify';
import * as S from './style';
import { createAfterSchoolBusinessTrip } from '@/services/after-school/afterSchool.api';
import type { MyAfterSchool } from '@/types/after-school';

export default function BusinessTripPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const classData = location.state?.classData as MyAfterSchool | undefined;
  
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const businessTripMutation = useMutation({
    mutationFn: createAfterSchoolBusinessTrip,
    onSuccess: () => {
      toast.success('출장이 완료되었습니다.');
      setIsModalOpen(false);
      setIsSecondModalOpen(true);
    },
    onError: (error: unknown) => {
      console.log('출장 API 에러:', error);
      const message =
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as any).response?.data?.message === 'string'
          ? (error as any).response.data.message
          : '출장 처리에 실패했습니다.';
      toast.error(message);
    },
  });

  const businessTripEvents: CalendarEvent[] = useMemo(() => {
    if (!classData) return [];
    
    const dayMap: Record<string, number> = { '월': 1, '화': 2, '수': 3, '목': 4, '금': 5 };
    const targetDay = dayMap[classData.week_day];
    if (!targetDay) return [];
    
    const events: CalendarEvent[] = [];
    const firstDay = new Date(selectedYear, selectedMonth - 1, 1);
    const lastDay = new Date(selectedYear, selectedMonth, 0);
    
    for (let date = new Date(firstDay); date <= lastDay; date.setDate(date.getDate() + 1)) {
      if (date.getDay() === targetDay) {
        events.push({
          id: `event-${date.getDate()}`,
          date: new Date(date),
          label: classData.name,
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
    if (!classData || !selectedDate) return;

    const day = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

    businessTripMutation.mutate({
      day,
      afterschool_id: BigInt(classData.id).toString(),
    });
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
    setSelectedDate(event.date);
    setIsModalOpen(true);
  };

  return (
    <S.PageContainer>
      <S.Header>
        <S.Title>"{classData?.name || ''}" 방과후 출장 날짜를 선택해주세요.</S.Title>
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
          showMobilePopover={false}
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
              {selectedDate?.getFullYear()}년 {(selectedDate?.getMonth() || 0) + 1}월 {selectedDate?.getDate()}일 {classData?.name || ''}
            </S.ModalHighlight>
            을 출장 처리 하시겠습니까?
          </S.ModalMessage>
        }
        cancelText="취소"
        confirmText={businessTripMutation.isPending ? '처리중...' : '완료'}
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
