import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '@/components/ui/calendar';
import MakeupSelectionModal from '@/components/ui/makeup-selection-modal';
import { transformAffordableToCalendarEvents } from '@/utils/afterSchool';
import { SAMPLE_DATA } from './data';
import * as S from './style';

export default function AfterSchoolExtraPage() {
    const navigate = useNavigate();
    const currentDate = new Date();
    const [year, setYear] = useState(currentDate.getFullYear());
    const [month, setMonth] = useState(currentDate.getMonth() + 1);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [availablePeriods, setAvailablePeriods] = useState<string[]>([]);

    const events = useMemo(() => {
        return transformAffordableToCalendarEvents(SAMPLE_DATA);
    }, []);

    const handleMonthChange = (newYear: number, newMonth: number) => {
        setYear(newYear);
        setMonth(newMonth);
    };

    const getAvailablePeriods = (date: Date) => {
        const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const availableData = SAMPLE_DATA.filter(item => item.day === dateString);

        if (availableData.length === 0) {
            return null;
        }

        const periods: string[] = [];
        availableData.forEach(item => {
            if (item.start_period === 8 && item.end_period === 9) periods.push('8~9');
            if (item.start_period === 10 && item.end_period === 11) periods.push('10~11');
        });

        return periods;
    };

    const openModalForDate = (date: Date) => {
        const periods = getAvailablePeriods(date);
        if (!periods || periods.length === 0) return;
        setAvailablePeriods(periods);
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    const handleDateClick = (date: Date) => {
        openModalForDate(date);
    };

    const handleEventClick = (event: { date: Date }) => {
        openModalForDate(event.date);
    };

    const handleComplete = (data: { periods: string[]; location: string }) => {
        // TODO: 보강 신청 API 호출
        console.log('보강 신청 완료:', { date: selectedDate, ...data });
        navigate('/after-school');
    };

    return (
        <S.Container>
            <S.Title>“정보처리산업기사 실기” 방과후 보강 날짜를 선택해주세요.</S.Title>
            <S.CalendarWrapper>
                <Calendar
                    year={year}
                    month={month}
                    onMonthChange={handleMonthChange}
                    events={events}
                    showYear={true}
                    showLegend={false}
                    showMobilePopover={false}
                    onDateClick={handleDateClick}
                    onEventClick={handleEventClick}
                />
            </S.CalendarWrapper>
            <MakeupSelectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                date={selectedDate}
                availablePeriods={availablePeriods}
                onComplete={handleComplete}
            />
        </S.Container>
    );
}
