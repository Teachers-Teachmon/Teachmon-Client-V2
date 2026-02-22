import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Calendar from '@/components/ui/calendar';
import MakeupSelectionModal from '@/components/ui/makeup-selection-modal';
import type { PlaceSearchResult } from '@/types/after-school';
import type { MyAfterSchool } from '@/types/after-school';
import { placeQuery as placeSearchQuery } from '@/services/search/search.query';
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

    const { data: placeResults = [] } = useQuery(placeSearchQuery.search(placeQuery));
    const { mutateAsync: requestReinforcement } = useRequestReinforcementMutation();

    useEffect(() => {
        if (!classData) {
            toast.error('방과후 정보가 없어 이전 화면으로 이동합니다.');
            navigate('/after-school', { replace: true });
        }
    }, [classData, navigate]);

    const handleMonthChange = (newYear: number, newMonth: number) => {
        setYear(newYear);
        setMonth(newMonth);
    };

    const handleDateClick = (date: Date) => {
        setAvailablePeriods(['8~9', '10~11']);
        setSelectedDate(date);
        setSelectedPlace(null);
        setIsModalOpen(true);
    };

    const handleComplete = async (data: { periods: string[]; place: PlaceSearchResult }) => {
        if (!selectedDate || !classData) return;
        const afterSchoolId = String(classData.id);
        const placeId = String(data.place.id);

        if (!afterSchoolId.trim() || !placeId.trim()) {
            toast.error('잘못된 방과후 정보입니다.');
            return;
        }

        const day = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
        const periodMap: Record<string, 'EIGHT_AND_NINE_PERIOD' | 'TEN_AND_ELEVEN_PERIOD'> = {
            '8~9': 'EIGHT_AND_NINE_PERIOD',
            '10~11': 'TEN_AND_ELEVEN_PERIOD',
        };

        try {
            await Promise.all(data.periods.map((period) => {
                const targetPeriod = periodMap[period];
                if (!targetPeriod) return Promise.resolve();
                return requestReinforcement({
                    day,
                    afterschool_id: afterSchoolId,
                    change_period: targetPeriod,
                    change_place_id: placeId,
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
                    showYear={true}
                    showLegend={false}
                    showMobilePopover={false}
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
