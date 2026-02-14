import Modal from '@/components/layout/modal';
import Dropdown from '@/components/ui/input/dropdown';
import DateInput from '@/components/ui/input/date';
import Button from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDevice } from '@/hooks/useDevice';
import * as S from './style';

interface QuarterSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (quarter: string, startDate: string, endDate: string) => void;
    existingQuarters?: Array<{ quarter: number; startDate: string; endDate: string }>;
}

const QUARTER_OPTIONS = ['1분기', '2분기', '3분기', '4분기'];

export default function QuarterSettingsModal({
    isOpen,
    onClose,
    onConfirm,
    existingQuarters = [],
}: QuarterSettingsModalProps) {
    const [selectedQuarter, setSelectedQuarter] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const { isMobile } = useDevice();

    const handleQuarterChange = (quarter: string) => {
        setSelectedQuarter(quarter);
        
        // 선택한 분기의 기존 데이터가 있으면 로드
        const quarterNumber = parseInt(quarter.replace('분기', ''));
        const existingQuarter = existingQuarters.find(q => q.quarter === quarterNumber);
        
        if (existingQuarter) {
            setStartDate(existingQuarter.startDate);
            setEndDate(existingQuarter.endDate);
        } else {
            setStartDate('');
            setEndDate('');
        }
    };

    const handleConfirm = () => {
        if (!selectedQuarter || !startDate || !endDate) {
            toast.error('모든 항목을 입력해주세요.');
            return;
        }

        // 날짜를 YYYY-MM-DD 형식으로 변환
        const formatDate = (dateStr: string) => {
            const date = new Date(dateStr);
            return date.toISOString().split('T')[0];
        };

        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        const start = new Date(formattedStartDate);
        const end = new Date(formattedEndDate);

        // 1. 시작일이 종료일보다 이전인지 확인
        if (start >= end) {
            toast.error('시작일은 종료일보다 이전이어야 합니다.');
            return;
        }

        // 2. 선택한 분기 번호
        const quarterNumber = parseInt(selectedQuarter.replace('분기', ''));

        // 3. 다른 분기들과 날짜가 겹치는지 확인 (현재 선택한 분기는 제외)
        const hasOverlap = existingQuarters.some(q => {
            // 현재 선택한 분기는 겹침 검사에서 제외
            if (q.quarter === quarterNumber) return false;
            
            const qStart = new Date(q.startDate);
            const qEnd = new Date(q.endDate);
            return (start <= qEnd && end >= qStart);
        });

        if (hasOverlap) {
            toast.error('다른 분기와 날짜가 겹칩니다.');
            return;
        }

        onConfirm(
            selectedQuarter, 
            formattedStartDate, 
            formattedEndDate
        );
        handleClose();
    };

    const handleClose = () => {
        setSelectedQuarter('');
        setStartDate('');
        setEndDate('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} padding={isMobile ? '1.5rem' : '2.75rem'}>
            <S.ModalContent>
                <S.Title>분기설정</S.Title>

                <S.FormSection>
                    <Dropdown
                        placeholder="선택"
                        items={QUARTER_OPTIONS}
                        value={selectedQuarter}
                        onChange={handleQuarterChange}
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
            </S.ModalContent>
        </Modal>
    );
}
