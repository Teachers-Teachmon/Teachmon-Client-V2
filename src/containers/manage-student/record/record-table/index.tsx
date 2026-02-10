import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/button';
import TableLayout from '@/components/layout/table';
import MovementDetailModal from '@/containers/manage-student/record/movement-detail';
import type { RecordData, LeaveData, StudentData, RecordTableProps } from '@/types/record';
import type { StatusType } from '@/components/ui/status';
import { useRecordTableColumns } from '@/hooks/useRecordTableColumns';
import * as S from './style';

export default function RecordTable({
    activeTab,
    movementData,
    leaveData,
    studentData: initialStudentData,
}: RecordTableProps) {
    const navigate = useNavigate();
    const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());
    const [selectAll, setSelectAll] = useState(false);
    const [studentData, setStudentData] = useState<StudentData[]>(initialStudentData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMovement, setSelectedMovement] = useState<RecordData | null>(null);

    const handleEdit = (id: string) => {
        navigate("/manage/movement?edit=true");
        console.log('수정:', id);
    };

    const handleDelete = (id: string) => {
        console.log('삭제:', id);
    };

    const handleSelectAll = (checked: boolean) => {
        setSelectAll(checked);
        if (checked) {
            setSelectedStudents(new Set(studentData.map((s) => s.id)));
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
        setSelectAll(newSelected.size === studentData.length);
    };

    const handleMovementRowClick = (data: RecordData) => {
        setSelectedMovement(data);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMovement(null);
    };

    const handleStatusChange = (studentId: string, period: string, status: StatusType) => {
        setStudentData((prevData) =>
            prevData.map((student) =>
                student.id === studentId
                    ? { ...student, [period]: status }
                    : student
            )
        );
    };

    const handleBulkStatusChange = (studentIds: string[], period: string, status: StatusType) => {
        setStudentData((prevData) =>
            prevData.map((student) =>
                studentIds.includes(student.id)
                    ? { ...student, [period]: status }
                    : student
            )
        );
    };

    const { movementColumns, leaveColumns, studentColumns } = useRecordTableColumns({
        selectedStudents,
        selectAll,
        onSelectAll: handleSelectAll,
        onSelectStudent: handleSelectStudent,
        onStatusChange: handleStatusChange,
        onBulkStatusChange: handleBulkStatusChange,
    });

    const renderMovementActions = (row: RecordData) => (
        <S.ActionButtons>
            <Button 
                text="수정" 
                onClick={(e) => {
                    e?.stopPropagation();
                    handleEdit(row.id);
                }} 
                variant="confirm" 
            />
            <Button 
                text="삭제" 
                onClick={(e) => {
                    e?.stopPropagation();
                    handleDelete(row.id);
                }} 
                variant="delete" 
            />
        </S.ActionButtons>
    );

    const renderLeaveActions = (row: LeaveData) => (
        <S.ActionButtons>
            <Button 
                text="삭제" 
                onClick={(e) => {
                    e?.stopPropagation();
                    handleDelete(row.id);
                }} 
                variant="delete" 
            />
        </S.ActionButtons>
    );

    return (
        <>
            {activeTab === 'movement' && (
                <TableLayout
                    columns={movementColumns}
                    data={movementData}
                    renderActions={renderMovementActions}
                    onRowClick={handleMovementRowClick}
                />
            )}
            {activeTab === 'leave' && (
                <TableLayout
                    columns={leaveColumns}
                    data={leaveData}
                    renderActions={renderLeaveActions}
                />
            )}
            {activeTab === 'student' && (
                <TableLayout
                    columns={studentColumns}
                    data={studentData}
                    renderActions={() => <></>}
                />
            )}
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
        </>
    );
}
