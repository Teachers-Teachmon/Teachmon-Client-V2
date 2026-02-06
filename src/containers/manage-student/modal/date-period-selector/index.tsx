import { useState } from 'react';
import Modal from '@/components/layout/modal';
import Button from '@/components/ui/button';
import { useDevice } from '@/hooks/useDevice';
import * as S from './style';

interface DatePeriodSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    currentDate: string;
    currentPeriod: string;
    onConfirm: (date: string, period: string) => void;
}

const PERIODS = [
    '1교시',
    '2교시',
    '3교시',
    '4교시',
    '5교시',
    '6교시',
    '7교시',
    '8-9교시',
    '10-11교시',
];

export default function DatePeriodSelector({
    isOpen,
    onClose,
    currentDate,
    currentPeriod,
    onConfirm,
}: DatePeriodSelectorProps) {
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [selectedPeriod, setSelectedPeriod] = useState(currentPeriod);
    const { isMobile } = useDevice();

    const handleConfirm = () => {
        onConfirm(selectedDate, selectedPeriod);
        onClose();
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(e.target.value);
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const formatted = `${date.getMonth() + 1}월 ${date.getDate()}일 (${days[date.getDay()]})`;
        setSelectedDate(formatted);
    };

    const handleDateInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.currentTarget.showPicker();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} padding={isMobile ? "24px 20px" : "60px"}>
            <S.Container>
                <S.Title>날짜 및 교시 선택</S.Title>
                
                <S.Section>
                    <S.Label>날짜</S.Label>
                    <S.DateInput 
                        type="date" 
                        onChange={handleDateChange}
                        onClick={handleDateInputClick}
                    />
                    <S.SelectedText>{selectedDate}</S.SelectedText>
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
