import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Calendar from '@/components/ui/calendar';
import MakeupSelectionModal from '@/components/ui/makeup-selection-modal';
import { transformAffordableToCalendarEvents } from '@/utils/afterSchool';
import type { AfterSchoolClass } from '@/types/after-school';
import type { PlaceSearchResult } from '@/types/afterSchool';
import { useAffordableReinforcementQuery, usePlaceSearchQuery } from '@/services/after-school/afterSchool.query';
import { useRequestReinforcementMutation } from '@/services/after-school/afterSchool.mutation';
import * as S from './style';

export default function AfterSchoolExtraPage() {
    const location = useLocation();
    const classData = (location.state as { classData?: AfterSchoolClass } | undefined)?.classData;
    const currentDate = new Date();
    const [year, setYear] = useState(currentDate.getFullYear());
    const [month, setMonth] = useState(currentDate.getMonth() + 1);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [availablePeriods, setAvailablePeriods] = useState<string[]>([]);
    const [placeQuery, setPlaceQuery] = useState('');
    const [selectedPlace, setSelectedPlace] = useState<PlaceSearchResult | null>(null);

    const { data: affordableReinforcements } = useAffordableReinforcementQuery(month, classData?.id);
    const { data: placeResults } = usePlaceSearchQuery(placeQuery);
    const { mutate: requestReinforcement } = useRequestReinforcementMutation();

    const events = useMemo(() => {
        return transformAffordableToCalendarEvents(affordableReinforcements ?? []);
    }, [affordableReinforcements]);

    const handleMonthChange = (newYear: number, newMonth: number) => {
        setYear(newYear);
        setMonth(newMonth);
    };

    const handleDateClick = (date: Date) => {
        const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

        const availableData = (affordableReinforcements ?? []).filter(item => item.day === dateString);

        if (availableData.length === 0) {
            return;
        }

        const periods: string[] = [];
        availableData.forEach(item => {
            if (item.start_period === 8 && item.end_period === 9) periods.push('8~9');
            if (item.start_period === 10 && item.end_period === 11) periods.push('10~11');
        });

        setAvailablePeriods(periods);
        setSelectedDate(date);
        setSelectedPlace(null);
        setIsModalOpen(true);
    };

    const handleComplete = (data: { periods: string[]; place: PlaceSearchResult }) => {
        if (!selectedDate || !classData) return;
        const day = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

        const requests = data.periods.map((period) => {
            const isFirst = period === '8~9';
            return {
                day,
                afterschool_id: Number(classData.id),
                change_start_period: isFirst ? 8 : 10,
                change_end_period: isFirst ? 9 : 11,
                change_place_id: data.place.id,
            };
        });

        requests.forEach((payload) => {
            requestReinforcement(payload);
        });
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
                    onDateClick={handleDateClick}
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
