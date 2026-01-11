import { useState } from 'react';
import Button from '@/components/ui/button';
import Dropdown from '@/components/ui/input/dropdown';
import Modal from '@/components/layout/modal';
import * as S from './style';

interface MakeupSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    date: Date | null;
    availablePeriods: string[];
    onComplete: (data: { periods: string[]; location: string }) => void;
}

export default function MakeupSelectionModal({
    isOpen,
    onClose,
    date,
    availablePeriods,
    onComplete,
}: MakeupSelectionModalProps) {
    const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
    const [location, setLocation] = useState<string>('');

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
        if (selectedPeriods.length > 0 && location) {
            onComplete({ periods: selectedPeriods, location });
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
                    {availablePeriods.includes('8~9') && (
                        <S.SelectionBox
                            isSelected={selectedPeriods.includes('8~9')}
                            onClick={() => handleTogglePeriod('8~9')}
                        >
                            <S.SelectionText>8~9교시 보강</S.SelectionText>
                        </S.SelectionBox>
                    )}
                    {availablePeriods.includes('10~11') && (
                        <S.SelectionBox
                            isSelected={selectedPeriods.includes('10~11')}
                            onClick={() => handleTogglePeriod('10~11')}
                        >
                            <S.SelectionText>10~11교시 보강</S.SelectionText>
                        </S.SelectionBox>
                    )}
                </S.SelectionContainer>

                <S.DropdownContainer>
                    <S.Label>장소</S.Label>
                    <Dropdown
                        items={['1학년 1반', '1학년 2반', '음악실', '미술실']}
                        placeholder="장소 선택"
                        value={location}
                        onChange={setLocation}
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
