import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Calendar from '@/components/ui/calendar';
import MakeupSelectionModal from '@/components/ui/makeup-selection-modal';
import { transformAffordableToCalendarEvents } from '@/utils/afterSchool';
import type { PlaceSearchResult } from '@/types/afterSchool';
import type { MyAfterSchool } from '@/types/after-school';
import { useAffordableReinforcementQuery, usePlaceSearchQuery } from '@/services/after-school/afterSchool.query';
import { useRequestReinforcementMutation } from '@/services/after-school/afterSchool.mutation';
import { toast } from 'react-toastify';
import * as S from './style';

export default function AfterSchoolExtraPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const classData = location.state?.classData as MyAfterSchool | undefined;
    const businessTripDate = location.state?.businessTripDate as Date | undefined;
    const currentDate = new Date();
    const initialDate = businessTripDate ? new Date(businessTripDate) : currentDate;
    const [year, setYear] = useState(initialDate.getFullYear());
    const [month, setMonth] = useState(initialDate.getMonth() + 1);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [availablePeriods, setAvailablePeriods] = useState<string[]>([]);
    const [placeQuery, setPlaceQuery] = useState('');
    const [selectedPlace, setSelectedPlace] = useState<PlaceSearchResult | null>(null);

    const { data: affordableReinforcements } = useAffordableReinforcementQuery(month, classData?.id);
    const { data: placeResults } = usePlaceSearchQuery(placeQuery);
    const { mutateAsync: requestReinforcement } = useRequestReinforcementMutation();

    useEffect(() => {
        if (!classData) {
            toast.error('방과후 정보가 없어 이전 화면으로 이동합니다.');
            navigate('/after-school', { replace: true });
        }
    }, [classData, navigate]);

    const events = useMemo(() => {
        return transformAffordableToCalendarEvents(affordableReinforcements ?? []);
    }, [affordableReinforcements]);

    const handleMonthChange = (newYear: number, newMonth: number) => {
        setYear(newYear);
        setMonth(newMonth);
    };

    const getAvailablePeriods = (date: Date) => {
        const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const availableData = (affordableReinforcements ?? []).filter((item) => item.day === dateString);

        if (availableData.length === 0) {
            return null;
        }

        const periodSet = new Set<string>();
        availableData.forEach((item) => {
            if (item.start_period === 8 && item.end_period === 9) periodSet.add('8~9');
            if (item.start_period === 10 && item.end_period === 11) periodSet.add('10~11');
        });

        return Array.from(periodSet);
    };

    const openModalForDate = (date: Date) => {
        const periods = getAvailablePeriods(date);
        if (!periods || periods.length === 0) return;
        setAvailablePeriods(periods);
        setSelectedDate(date);
        setSelectedPlace(null);
        setIsModalOpen(true);
    };

    const handleDateClick = (date: Date) => {
        openModalForDate(date);
    };

    const handleEventClick = (event: { date: Date }) => {
        openModalForDate(event.date);
    };

    const handleComplete = async (data: { periods: string[]; place: PlaceSearchResult }) => {
        if (!selectedDate || !classData) return;
        if (!Number.isFinite(Number(classData.id))) {
            toast.error('잘못된 방과후 정보입니다.');
            return;
        }

        const day = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
        const periodMap: Record<string, { start: number; end: number }> = {
            '8~9': { start: 8, end: 9 },
            '10~11': { start: 10, end: 11 },
        };

        try {
            await Promise.all(data.periods.map((period) => {
                const target = periodMap[period];
                if (!target) return Promise.resolve();
                return requestReinforcement({
                    day,
                    afterschool_id: Number(classData.id),
                    change_start_period: target.start,
                    change_end_period: target.end,
                    change_place_id: data.place.id,
                });
            }));
            toast.success('보강 신청이 완료되었습니다.');
            navigate('/after-school');
        } catch {
            toast.error('보강 신청에 실패했습니다.');
        }
    };

    return (
        <S.Container>
            <S.Title>"{classData?.name ?? ''}" 방과후 보강 날짜를 선택해주세요.</S.Title>
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
                placeItems={placeResults ?? []}
                placeQuery={placeQuery}
                onPlaceQueryChange={setPlaceQuery}
                selectedPlace={selectedPlace}
                onPlaceChange={setSelectedPlace}
                onComplete={handleComplete}
            />
        </S.Container>
    );
}
