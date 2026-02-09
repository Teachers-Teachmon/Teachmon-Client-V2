import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import RecordHeader from '@/containers/manage-student/record/record-header';
import RecordTable from '@/containers/manage-student/record/record-table';
import { manageQuery } from '@/services/manage/manage.query';
import type { RecordTabType } from '@/types/record';
import * as S from './style';

export default function Record() {
    const [selectedDate, setSelectedDate] = useState<string>('2024-12-12');
    const [activeTab, setActiveTab] = useState<RecordTabType>('movement');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedPeriod, setSelectedPeriod] = useState<string>('EIGHT_AND_NINE_PERIOD');

    // 이탈 학생 조회 (일간)
    const { data: dailyEvasion = [] } = useQuery({
        ...manageQuery.dailyEvasion(selectedDate),
        enabled: activeTab === 'leave',
        retry: false,
    });

    // 스케줄 기록 조회
    const { data: scheduleHistory = [] } = useQuery({
        ...manageQuery.scheduleHistory(),
        enabled: activeTab === 'student',
        retry: false,
    });

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
                leaveData={dailyEvasion.map(record => ({
                    id: String(record.leaveseat_id),
                    studentInfo: `${record.student_number} ${record.student_name}`,
                    time: record.date,
                    handlingTeacher: record.reason,
                }))}
                studentData={scheduleHistory}
                selectedDate={selectedDate}
                selectedPeriod={selectedPeriod}
            />
        </S.Container>
    );
}
