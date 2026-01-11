import * as S from './style';
import Dropdown from '@/components/ui/input/dropdown';
import DateInput from '@/components/ui/input/date';
import Button from '@/components/ui/button';
import { useState } from 'react';

interface QuarterSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (quarter: string, startDate: string, endDate: string) => void;
}

const QUARTER_OPTIONS = ['1분기', '2분기', '3분기', '4분기'];

export default function QuarterSettingsModal({
    isOpen,
    onClose,
    onConfirm,
}: QuarterSettingsModalProps) {
    const [selectedQuarter, setSelectedQuarter] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (selectedQuarter && startDate && endDate) {
            onConfirm(selectedQuarter, startDate, endDate);
            handleClose();
        }
    };

    const handleClose = () => {
        setSelectedQuarter('');
        setStartDate('');
        setEndDate('');
        onClose();
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        <S.Overlay onClick={handleOverlayClick}>
            <S.ModalContainer onClick={(e) => e.stopPropagation()}>
                <S.Title>분기설정</S.Title>

                <S.FormSection>
                    <Dropdown
                        placeholder="선택"
                        items={QUARTER_OPTIONS}
                        value={selectedQuarter}
                        onChange={(value) => setSelectedQuarter(value)}
                        customWidth="100%"
                        customHeight="50px"
                    />

                    <S.DateRow>
                        <DateInput
                            label="Date"
                            value={startDate}
                            onChange={setStartDate}
                        />
                        <S.DateSeparator>~</S.DateSeparator>
                        <DateInput
                            label="Date"
                            value={endDate}
                            onChange={setEndDate}
                        />
                    </S.DateRow>
                </S.FormSection>

                <S.ButtonRow>
                    <Button
                        width='100%'
                        text="취소"
                        variant="cancel"
                        onClick={handleClose}
                    />
                    <Button
                        width='100%'
                        text="완료"
                        variant="confirm"
                        onClick={handleConfirm}
                    />
                </S.ButtonRow>
            </S.ModalContainer>
        </S.Overlay>
    );
}
