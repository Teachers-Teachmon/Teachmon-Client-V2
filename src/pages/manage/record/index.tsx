import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import RecordHeader from '@/containers/manage-student/record/record-header';
import RecordTable from '@/containers/manage-student/record/record-table';
import { manageQuery } from '@/services/manage/manage.query';
import { useLeaveSeatList } from '@/hooks/useLeaveSeatList';
import { PERIOD_OPTIONS } from '@/constants/movement';
import { useDebounce } from '@/hooks/useDebounce';
import { getTodayDate } from '@/utils/period';

import type { RecordTabType } from '@/types/record';
import type { Period } from '@/constants/movement';
import * as S from './style';

export default function Record() {
    const [selectedDate, setSelectedDate] = useState<string>(getTodayDate());
    const [activeTab, setActiveTab] = useState<RecordTabType>('movement');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedPeriod, setSelectedPeriod] = useState<Period>(PERIOD_OPTIONS[2].value);
    
    // 검색어 디바운스
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    // 이석 목록 조회
    const { data: movementData, isPending: isMovementLoading } = useLeaveSeatList({
        day: selectedDate,
        period: selectedPeriod,
        enabled: activeTab === 'movement',
    });

    // 이탈 학생 조회 (일간)
    const { data: dailyEvasion = [], isPending: isEvasionLoading } = useQuery({
        ...manageQuery.dailyEvasion(selectedDate),
        enabled: activeTab === 'leave',
        retry: false,
    });

    // 스케줄 기록 조회
    const { data: studentData = [], isPending: isScheduleLoading } = useQuery({
        ...manageQuery.scheduleHistory({
            day: selectedDate,
            query: debouncedSearchQuery,
        }),
        enabled: activeTab === 'student',
        retry: false,
    });

    // 현재 활성화된 탭에 따른 로딩 상태
    const isLoading = 
        (activeTab === 'movement' && isMovementLoading) ||
        (activeTab === 'leave' && isEvasionLoading) ||
        (activeTab === 'student' && isScheduleLoading);

    return (
        <S.Container>
            <RecordHeader
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedPeriod={selectedPeriod}
                onPeriodChange={setSelectedPeriod}
            />
            <RecordTable
                activeTab={activeTab}
                movementData={movementData}
                leaveData={dailyEvasion}
                studentData={studentData}
                isLoading={isLoading}
            />
        </S.Container>
    );
}
