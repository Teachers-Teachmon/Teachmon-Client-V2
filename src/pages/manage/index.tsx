import { useState } from 'react';
import HeaderLeft from '@/containers/manage-student/header-left';
import HeaderRight from '@/containers/manage-student/header-right';
import MobileHeaderRight from '@/containers/manage-student/mobile-header-right';
import ClassCard from '@/containers/manage-student/class-card';
import FloorSelector from '@/containers/manage-student/floor-selector';
import Map from '@/containers/manage-student/map';
import TextInput from '@/components/ui/input/text-input';
import { CLASSES, ALL_PLACES, generateMockStudents } from '@/constants/manage';
import { useDevice } from '@/hooks/useDevice';
import * as S from './style';

export default function Manage() {
    const [selectedGrade, setSelectedGrade] = useState<number>(1);
    const [selectedFloor, setSelectedFloor] = useState<number>(1);
    const [selectedDate, setSelectedDate] = useState<string>('12월 12일 (수)');
    const [selectedPeriod, setSelectedPeriod] = useState<string>('7교시');
    const [isMapEnabled, setIsMapEnabled] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [highlightedPlace, setHighlightedPlace] = useState<string>('');
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const { isMobile } = useDevice();

    const handleDatePeriodChange = (date: string, period: string) => {
        setSelectedDate(date);
        setSelectedPeriod(period);
    };

    // 나중에 백엔드 연동 시 ALL_PLACES는 삭제될 수 있습니다.
    // 검색 결과 필터링
    const searchResults = searchQuery.trim() 
        ? ALL_PLACES.filter(place => 
            place.name && 
            place.name !== "" && 
            place.name !== "X" &&
            place.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [];

    // 검색 결과 선택 핸들러
    const handleSelectPlace = (place: { name: string; floor: number }) => {
        setSelectedFloor(place.floor);
        setHighlightedPlace(place.name);
        setSearchQuery(''); // 검색어 초기화
    };

    // 8x2 학생 배치
    const students = generateMockStudents();

    return (
        <S.Container>
            <S.Header isMapEnabled={isMapEnabled}>
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
                
                {isMobile ? (
                    <>
                        <S.HamburgerButton onClick={() => setIsSidebarOpen(true)}>
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

            {isMapEnabled ? (
                <Map selectedFloor={selectedFloor} highlightedPlace={highlightedPlace} />
            ) : (
                <S.ClassGrid>
                    {CLASSES.map((classNum) => (
                        <ClassCard
                            key={classNum}
                            classNum={classNum}
                            students={students}
                        />
                    ))}
                </S.ClassGrid>
            )}
        </S.Container>
    );
}