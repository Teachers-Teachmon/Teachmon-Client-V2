import FloorSelector from '../floor-selector';
import DateGradeSelector from '../date-grade-selector';
import { PERIOD_MAP } from '@/utils/period';
import { formatDateDisplay } from '@/utils/format';

interface HeaderLeftProps {
    isMapEnabled: boolean;
    selectedFloor: number;
    onFloorChange: (floor: number) => void;
    selectedDate: string;
    selectedPeriod: string;
    selectedGrade: number;
    onGradeChange: (grade: number) => void;
    onDatePeriodChange: (date: string, period: string) => void;
}

/**
 * 헤더 왼쪽 영역
 * - 지도 모드: 층 선택 (FloorSelector)
 * - 리스트 모드: 날짜/학년 선택 (DateGradeSelector)
 */
export default function HeaderLeft({
    isMapEnabled,
    selectedFloor,
    onFloorChange,
    selectedDate,
    selectedPeriod,
    selectedGrade,
    onGradeChange,
    onDatePeriodChange,
}: HeaderLeftProps) {
    if (isMapEnabled) {
        return (
            <FloorSelector
                selectedFloor={selectedFloor}
                onFloorChange={onFloorChange}
                selectedDate={selectedDate}
                selectedPeriod={PERIOD_MAP[selectedPeriod] || 'SEVEN_PERIOD'}
            />
        );
    }

    return (
        <DateGradeSelector
            selectedDate={formatDateDisplay(selectedDate)}
            selectedDateISO={selectedDate}
            selectedPeriod={selectedPeriod}
            selectedGrade={selectedGrade}
            onGradeChange={onGradeChange}
            onDatePeriodChange={onDatePeriodChange}
        />
    );
}
