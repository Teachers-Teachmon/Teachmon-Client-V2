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
import { useDevice } from '@/hooks/useDevice';

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
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
    const { isMobile } = useDevice();

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
                {/* 오른쪽: 모바일 햄버거 메뉴 or 데스크톱 헤더 */}
                {isMobile ? (
                    <>
                        <S.HamburgerButton 
                            $isMapEnabled={isMapEnabled} 
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <img src="/icons/common/hamburger.svg" alt="메뉴" />
                        </S.HamburgerButton>
                        
                        <MobileHeaderRight
                            isOpen={isSidebarOpen}
                            onClose={() => setIsSidebarOpen(false)}
                            isMapEnabled={isMapEnabled}
                            onMapToggle={() => setIsMapEnabled(!isMapEnabled)}
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            searchResults={searchResults}
                            onSelectPlace={handleSelectPlace}
                        />
                    </>
                ) : (
                    <S.RightSection>
                        <HeaderRight
                            isMapEnabled={isMapEnabled}
                            onMapToggle={() => setIsMapEnabled(!isMapEnabled)}
                        />
                        
                        {/* 지도 모드일 때만 검색창 표시 */}
                        {isMapEnabled && (
                            <S.SearchContainer>
                                <S.SearchInputWrapper>
                                    <TextInput
                                        placeholder="장소 검색"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </S.SearchInputWrapper>
                                
                                {/* 검색 결과 드롭다운 */}
                                {searchResults.length > 0 && (
                                    <S.SearchResults>
                                        {searchResults.map((place, index) => (
                                            <S.SearchResultItem
                                                key={index}
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
                )}
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
                                students={students.map(student => ({
                                    ...student,
                                    id: classNum * 1000 + student.id
                                }))}
                                selectedStudentId={selectedStudentId}
                                onStudentSelect={setSelectedStudentId}
                            />
                        ))
                    )}
                </S.ClassGrid>
            )}
        </S.Container>
    );
}