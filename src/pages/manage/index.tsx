import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import HeaderLeft from '@/containers/manage-student/header-left';
import HeaderRight from '@/containers/manage-student/header-right';
import MobileHeaderRight from '@/containers/manage-student/mobile-header-right';
import ClassCard from '@/containers/manage-student/class-card';
import FloorSelector from '@/containers/manage-student/floor-selector';
import Map from '@/containers/manage-student/map';
import TextInput from '@/components/ui/input/text-input';
import { manageQuery } from '@/services/manage/manage.query';
import { placeQuery } from '@/services/search/search.query';
import { useDebounce } from '@/hooks/useDebounce';
import type { Period } from '@/services/manage/manage.api';
import { CLASSES } from '@/constants/manage';
import * as S from './style';

// Period 매핑
const PERIOD_MAP: Record<string, Period> = {
    '7교시': 'SEVEN_PERIOD',
    '8-9교시': 'EIGHT_AND_NINE_PERIOD',
    '10-11교시': 'TEN_AND_ELEVEN_PERIOD',
};

// 오늘 날짜를 "M월 D일 (요일)" 형식으로 반환
const getTodayFormatted = () => {
    const today = new Date();
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return `${today.getMonth() + 1}월 ${today.getDate()}일 (${days[today.getDay()]})`;
};

export default function Manage() {
    const [selectedGrade, setSelectedGrade] = useState<number>(1);
    const [selectedFloor, setSelectedFloor] = useState<number>(1);
    const [selectedDate] = useState<string>(getTodayFormatted());
    const [selectedPeriod, setSelectedPeriod] = useState<string>('7교시');
    const [isMapEnabled, setIsMapEnabled] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [highlightedPlace, setHighlightedPlace] = useState<string>('');

    // 학년별 학생 스케줄 조회
    const { data: studentSchedules = [] } = useQuery({
        ...manageQuery.studentSchedule({
            grade: selectedGrade,
            period: PERIOD_MAP[selectedPeriod] || 'SEVEN_PERIOD',
        }),
        retry: false,
    });

    // 층별 장소 상태 조회 (맵 모드일 때만)
    const { data: placesByFloor } = useQuery({
        ...manageQuery.placesByFloor({ floor: selectedFloor }),
        enabled: isMapEnabled,
        retry: false,
    });

    // 장소 검색 (디바운스 적용)
    const debouncedSearchQuery = useDebounce(searchQuery, 300);
    const { data: searchResults = [] } = useQuery({
        ...placeQuery.search(debouncedSearchQuery),
        enabled: isMapEnabled && !!debouncedSearchQuery,
    });

    const handleDatePeriodChange = (period: string) => {
        setSelectedPeriod(period);
    };

    // 검색 결과 선택 핸들러
    const handleSelectPlace = (place: { name: string; floor: number }) => {
        setSelectedFloor(place.floor);
        setHighlightedPlace(place.name);
        setSearchQuery('');
    };

    // 학생 데이터를 8x2 형식으로 변환
    const students = studentSchedules.map((schedule) => ({
        id: schedule.number,
        number: schedule.number,
        name: schedule.name,
        state: schedule.state,
    }));

    return (
        <S.Container>
            <S.Header isMapEnabled={isMapEnabled}>
                {/* 왼쪽: 층 선택 or 날짜/학년 선택 */}
                {isMapEnabled ? (
                    <FloorSelector
                        selectedFloor={selectedFloor}
                        onFloorChange={setSelectedFloor}
                    />
                ) : (
                    <HeaderLeft
                        selectedDate={selectedDate}
                        selectedPeriod={selectedPeriod}
                        selectedGrade={selectedGrade}
                        onGradeChange={setSelectedGrade}
                        onDatePeriodChange={handleDatePeriodChange}
                    />
                )}
                <S.RightSection>
                    <HeaderRight
                        isMapEnabled={isMapEnabled}
                        onMapToggle={() => setIsMapEnabled(!isMapEnabled)}
                    />
                    {isMapEnabled && (
                        <S.SearchContainer>
                            <S.SearchInputWrapper>
                                <TextInput
                                    placeholder="장소 검색"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </S.SearchInputWrapper>
                            {searchResults.length > 0 && (
                                <S.SearchResults>
                                    {searchResults.map((place) => (
                                        <S.SearchResultItem
                                            key={place.id}
                                            onClick={() => handleSelectPlace(place)}
                                        >
                                            <S.PlaceName>{place.name}</S.PlaceName>
                                            <S.FloorBadge>{place.floor}층</S.FloorBadge>
                                        </S.SearchResultItem>
                                    ))}
                                </S.SearchResults>
                            )}
                        </S.SearchContainer>
                    )}
                </S.RightSection>
            </S.Header>

            {/* 메인 컨텐츠: 지도 or 학급 그리드 */}
            {isMapEnabled ? (
                <Map 
                    selectedFloor={selectedFloor} 
                    highlightedPlace={highlightedPlace} 
                />
            ) : (
                <S.ClassGrid>
                    {students.length === 0 ? (
                        <S.EmptyState>학생 데이터가 없습니다.</S.EmptyState>
                    ) : (
                        CLASSES.map((classNum) => (
                            <ClassCard
                                key={classNum}
                                classNum={classNum}
                                students={students}
                            />
                        ))
                    )}
                </S.ClassGrid>
            )}
        </S.Container>
    );
}