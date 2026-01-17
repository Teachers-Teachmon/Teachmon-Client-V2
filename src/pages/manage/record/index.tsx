import { useState } from 'react';
import RecordHeader from '@/containers/manage-student/record/record-header';
import RecordTable from '@/containers/manage-student/record/record-table';
import type { RecordTabType } from '@/types/record';
import { mockMovementData, mockLeaveData, mockStudentData } from './data';
import * as S from './style';

export default function Record() {
    const [selectedDate, setSelectedDate] = useState<string>('2024-12-12');
    const [activeTab, setActiveTab] = useState<RecordTabType>('movement');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedPeriod, setSelectedPeriod] = useState<string>('EIGHT_AND_NINE_PERIOD');

    return (
        <S.Container>
            <RecordHeader
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />
            <RecordTable
                activeTab={activeTab}
                movementData={[]}
                leaveData={mockLeaveData}
                studentData={mockStudentData}
                selectedDate={selectedDate}
                selectedPeriod={selectedPeriod}
            />
        </S.Container>
    );
}
