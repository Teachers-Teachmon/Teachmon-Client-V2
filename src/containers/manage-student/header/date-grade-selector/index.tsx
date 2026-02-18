import { useState } from 'react';
import DatePeriodSelector from '../../modal/date-period-selector';
import * as S from './style';

interface HeaderLeftProps {
    selectedDate: string; // 표시용 (M월 D일 (요일))
    selectedDateISO: string; // API용 (YYYY-MM-DD)
    selectedPeriod: string;
    selectedGrade: number;
    onGradeChange: (grade: number) => void;
    onDatePeriodChange?: (date: string, period: string) => void;
}

export default function DateGradeSelector({ selectedDate, selectedDateISO, selectedPeriod, selectedGrade, onGradeChange, onDatePeriodChange }: HeaderLeftProps) {
    const grades = [1, 2, 3];
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDatePeriodConfirm = (date: string, period: string) => {
        onDatePeriodChange?.(date, period);
    };

    return (
        <S.Container>
            <S.DateSection onClick={() => setIsModalOpen(true)}>
                <S.CalendarIcon src="/icons/student/uil_calendar.svg" alt="calendar" />
                <S.DateText>{selectedDate}</S.DateText>
                <S.PeriodText>{selectedPeriod}</S.PeriodText>
                <S.DropdownIcon />
            </S.DateSection>
            <S.GradeTabs>
                {grades.map((grade) => (
                    <S.GradeTab
                        key={grade}
                        $isSelected={selectedGrade === grade}
                        onClick={() => onGradeChange(grade)}
                    >
                        {grade}학년
                    </S.GradeTab>
                ))}
            </S.GradeTabs>
            
            <DatePeriodSelector
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentDate={selectedDateISO}
                currentPeriod={selectedPeriod}
                onConfirm={handleDatePeriodConfirm}
            />
        </S.Container>
    );
}
