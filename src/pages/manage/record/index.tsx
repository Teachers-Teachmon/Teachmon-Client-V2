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
                movementData={mockMovementData}
                leaveData={mockLeaveData}
                studentData={mockStudentData}
            />
        </S.Container>
    );
}
