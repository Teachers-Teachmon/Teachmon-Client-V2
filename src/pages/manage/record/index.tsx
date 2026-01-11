import { useState } from 'react';
import RecordHeader from '@/containers/manage-student/record/record-header';
import RecordTable from '@/containers/manage-student/record/record-table';
import MovementDetailModal from '@/containers/manage-student/record/movement-detail';
import type { RecordData } from '@/types/record';
import { mockMovementData, mockLeaveData, mockStudentData } from './data';
import * as S from './style';

export default function Record() {
    const [selectedDate, setSelectedDate] = useState<string>('2024-12-12');
    const [activeTab, setActiveTab] = useState<'movement' | 'leave' | 'student'>('movement');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());
    const [selectAll, setSelectAll] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMovement, setSelectedMovement] = useState<RecordData | null>(null);

    const handleEdit = (id: string) => {
        console.log('수정:', id);
    };

    const handleDelete = (id: string) => {
        console.log('삭제:', id);
    };

    const handleSelectAll = (checked: boolean) => {
        setSelectAll(checked);
        if (checked) {
            setSelectedStudents(new Set(mockStudentData.map((s) => s.id)));
        } else {
            setSelectedStudents(new Set());
        }
    };

    const handleSelectStudent = (id: string, checked: boolean) => {
        const newSelected = new Set(selectedStudents);
        if (checked) {
            newSelected.add(id);
        } else {
            newSelected.delete(id);
        }
        setSelectedStudents(newSelected);
        setSelectAll(newSelected.size === mockStudentData.length);
    };

    const handleMovementRowClick = (data: RecordData) => {
        setSelectedMovement(data);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMovement(null);
    };

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
                selectedStudents={selectedStudents}
                selectAll={selectAll}
                onSelectAll={handleSelectAll}
                onSelectStudent={handleSelectStudent}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onMovementRowClick={handleMovementRowClick}
            />
            {selectedMovement && (
                <MovementDetailModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    data={{
                        location: selectedMovement.location,
                        teacher: selectedMovement.teacher,
                        reason: selectedMovement.reason || '',
                        students: selectedMovement.students,
                    }}
                />
            )}
        </S.Container>
    );
}
