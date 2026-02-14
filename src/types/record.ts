import type { LeaveSeat } from '@/services/movement/movement.api';
import type { EvasionRecord, ScheduleHistoryRecord } from '@/services/manage/manage.api';
import type { Period } from '@/constants/movement';

export type RecordTabType = 'movement' | 'leave' | 'student';

export interface RecordHeaderProps {
    selectedDate: string;
    onDateChange: (date: string) => void;
    activeTab: RecordTabType;
    onTabChange: (tab: RecordTabType) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedPeriod?: Period;
    onPeriodChange?: (period: Period) => void;
}

export interface RecordTableProps {
    activeTab: RecordTabType;
    movementData: LeaveSeat[];
    leaveData: EvasionRecord[];
    studentData: ScheduleHistoryRecord[];
    isLoading?: boolean;
}