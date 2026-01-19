import { useState } from 'react';
import Button from '@/components/ui/button';
import SearchDropdown from '@/components/ui/input/dropdown/search';
import Modal from '@/components/layout/modal';
import type { PlaceSearchResult } from '@/types/afterSchool';
import * as S from './style';

interface MakeupSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    date: Date | null;
    availablePeriods: string[];
    placeItems: PlaceSearchResult[];
    placeQuery: string;
    onPlaceQueryChange: (value: string) => void;
    selectedPlace: PlaceSearchResult | null;
    onPlaceChange: (place: PlaceSearchResult) => void;
    onComplete: (data: { periods: string[]; place: PlaceSearchResult }) => void;
}

export default function MakeupSelectionModal({
    isOpen,
    onClose,
    date,
    availablePeriods,
    placeItems,
    placeQuery,
    onPlaceQueryChange,
    selectedPlace,
    onPlaceChange,
    onComplete,
}: MakeupSelectionModalProps) {
    const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);

    if (!date) return null;

    const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

    const handleTogglePeriod = (period: string) => {
        setSelectedPeriods((prev) =>
            prev.includes(period)
                ? prev.filter((p) => p !== period)
                : [...prev, period]
        );
    };

    const handleComplete = () => {
        if (selectedPeriods.length > 0 && selectedPlace) {
            onComplete({ periods: selectedPeriods, place: selectedPlace });
            onClose();
        } else {
            alert('보강 시간과 장소를 선택해주세요.');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} padding="40px">
            <div style={{ width: '500px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                    <S.Title>방과후 보강 선택</S.Title>
                    <S.DateText>{formattedDate}</S.DateText>
                </div>

                <S.SelectionContainer>
                    <S.SelectionBox
                        isSelected={selectedPeriods.includes('8~9')}
                        isDisabled={!availablePeriods.includes('8~9')}
                        onClick={() => availablePeriods.includes('8~9') && handleTogglePeriod('8~9')}
                    >
                        <S.SelectionText>8~9교시 보강</S.SelectionText>
                    </S.SelectionBox>
                    <S.SelectionBox
                        isSelected={selectedPeriods.includes('10~11')}
                        isDisabled={!availablePeriods.includes('10~11')}
                        onClick={() => availablePeriods.includes('10~11') && handleTogglePeriod('10~11')}
                    >
                        <S.SelectionText>10~11교시 보강</S.SelectionText>
                    </S.SelectionBox>
                </S.SelectionContainer>

                <S.DropdownContainer>
                    <S.Label>장소</S.Label>
                    <SearchDropdown
                        items={placeItems}
                        placeholder="장소 선택"
                        value={selectedPlace ?? undefined}
                        searchQuery={placeQuery}
                        onSearchChange={onPlaceQueryChange}
                        onChange={onPlaceChange}
                        renderItem={(item) => `${item.name} (${item.floor}층)`}
                        getItemKey={(item) => item.id}
                    />
                </S.DropdownContainer>

                <S.ButtonContainer>
                    <Button variant="cancel" text="취소" onClick={onClose} width="50%" />
                    <Button variant="confirm" text="완료" onClick={handleComplete} width="50%" />
                </S.ButtonContainer>
            </div>
        </Modal>
    );
}
