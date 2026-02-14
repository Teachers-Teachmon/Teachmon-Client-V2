import { useState } from 'react';
import Modal from '@/components/layout/modal';
import Button from '@/components/ui/button';
import DateInput from '@/components/ui/input/date';
import { useDevice } from '@/hooks/useDevice';
import { PERIODS } from '@/constants/manage';
import * as S from './style';

interface DatePeriodSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    currentDate: string; // YYYY-MM-DD 형식
    currentPeriod: string;
    onConfirm: (date: string, period: string) => void;
}

export default function DatePeriodSelector({
    isOpen,
    onClose,
    currentDate,
    currentPeriod,
    onConfirm,
}: DatePeriodSelectorProps) {
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [selectedPeriod, setSelectedPeriod] = useState(currentPeriod);
    const [wasOpen, setWasOpen] = useState(false);
    const { isMobile } = useDevice();

    // 모달이 열릴 때(false→true) 현재값으로 초기화
    if (isOpen && !wasOpen) {
        setSelectedDate(currentDate);
        setSelectedPeriod(currentPeriod);
        setWasOpen(true);
    }
    if (!isOpen && wasOpen) {
        setWasOpen(false);
    }

    const handleConfirm = () => {
        onConfirm(selectedDate, selectedPeriod);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} padding={isMobile ? "24px 20px" : "60px"}>
            <S.Container>
                <S.Title>날짜 및 교시 선택</S.Title>
 
                <S.Section>
                    <S.Label>날짜</S.Label>
                    <DateInput
                        value={selectedDate}
                        onChange={setSelectedDate}
                    />
                </S.Section>

                <S.Section>
                    <S.Label>교시</S.Label>
                    <S.PeriodGrid>
                        {PERIODS.map((period) => (
                            <S.PeriodButton
                                key={period}
                                $isSelected={selectedPeriod === period}
                                onClick={() => setSelectedPeriod(period)}
                            >
                                {period}
                            </S.PeriodButton>
                        ))}
                    </S.PeriodGrid>
                </S.Section>

                <S.ButtonGroup>
                    <Button text="취소" width='100%' onClick={onClose} variant="cancel" />
                    <Button text="확인" width='100%' onClick={handleConfirm} variant="confirm" />
                </S.ButtonGroup>
            </S.Container>
        </Modal>
    );
}
