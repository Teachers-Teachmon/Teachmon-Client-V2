import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ActionBar from '../action-bar';
import MobileSidebar from '../mobile-sidebar';
import TextInput from '@/components/ui/input/text-input';
import DatePeriodSelector from '../../modal/date-period-selector';
import { useDevice } from '@/hooks/useDevice';
import { useDebounce } from '@/hooks/useDebounce';
import { placeQuery } from '@/services/search/search.query';
import { formatDateDisplay } from '@/utils/format';
import * as S from './style';

interface HeaderRightProps {
    isMapEnabled: boolean;
    onMapToggle: () => void;
    selectedDate: string;
    selectedPeriod: string;
    onSelectPlace: (place: { name: string; floor: number }) => void;
    onDatePeriodChange: (date: string, period: string) => void;
}

/**
 * 헤더 오른쪽 영역
 * - 모바일: 햄버거 메뉴 + MobileSidebar
 * - 데스크톱: ActionBar + 날짜/교시 뱃지(지도 모드) + 장소 검색(지도 모드)
 */
export default function HeaderRight({
    isMapEnabled,
    onMapToggle,
    selectedDate,
    selectedPeriod,
    onSelectPlace,
    onDatePeriodChange,
}: HeaderRightProps) {
    const { isMobile } = useDevice();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDatePeriodModalOpen, setIsDatePeriodModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 300);
    const { data: searchResults = [] } = useQuery({
        ...placeQuery.search(debouncedSearchQuery),
        enabled: isMapEnabled && debouncedSearchQuery.length > 0,
    });

    if (isMobile) {
        return (
            <>
                <S.HamburgerButton
                    $isMapEnabled={isMapEnabled}
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <img src="/icons/common/hamburger.svg" alt="메뉴" />
                </S.HamburgerButton>

                <MobileSidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    isMapEnabled={isMapEnabled}
                    onMapToggle={onMapToggle}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    searchResults={searchResults}
                    onSelectPlace={onSelectPlace}
                />
            </>
        );
    }

    return (
        <S.RightSection>
            <ActionBar
                isMapEnabled={isMapEnabled}
                onMapToggle={onMapToggle}
            />

            {/* 지도 모드일 때 날짜/교시 표시 */}
            {isMapEnabled && (
                <S.DatePeriodBadge onClick={() => setIsDatePeriodModalOpen(true)}>
                    <S.BadgeIcon src="/icons/student/uil_calendar.svg" alt="calendar" />
                    <S.BadgeText>{formatDateDisplay(selectedDate)} {selectedPeriod}</S.BadgeText>
                </S.DatePeriodBadge>
            )}

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
                                    onClick={() => onSelectPlace(place)}
                                >
                                    <S.PlaceName>{place.name}</S.PlaceName>
                                    <S.FloorBadge>{place.floor}층</S.FloorBadge>
                                </S.SearchResultItem>
                            ))}
                        </S.SearchResults>
                    )}
                </S.SearchContainer>
            )}

            {/* 날짜/교시 선택 모달 */}
            <DatePeriodSelector
                isOpen={isDatePeriodModalOpen}
                onClose={() => setIsDatePeriodModalOpen(false)}
                currentDate={selectedDate}
                currentPeriod={selectedPeriod}
                onConfirm={onDatePeriodChange}
            />
        </S.RightSection>
    );
}
