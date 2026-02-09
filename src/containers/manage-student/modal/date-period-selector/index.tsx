import { useState } from 'react';
import Modal from '@/components/layout/modal';
import Button from '@/components/ui/button';
import { useDevice } from '@/hooks/useDevice';
import * as S from './style';

interface DatePeriodSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    currentPeriod: string;
    onConfirm: (period: string) => void;
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
    currentPeriod,
    onConfirm,
}: DatePeriodSelectorProps) {
    const [selectedPeriod, setSelectedPeriod] = useState(currentPeriod);
    const { isMobile } = useDevice();

    const handleConfirm = () => {
        onConfirm(selectedPeriod);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} padding={isMobile ? "24px 20px" : "60px"}>
            <S.Container>
                <S.Title>교시 선택</S.Title>

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
