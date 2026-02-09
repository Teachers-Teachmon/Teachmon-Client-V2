import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Button from '@/components/ui/button';
import TableLayout from '@/components/layout/table';
import MovementDetailModal from '@/containers/manage-student/record/movement-detail';

import { movementQuery } from '@/services/movement/movement.query';
import { useDeleteLeaveSeatMutation } from '@/services/movement/movement.mutation';
import type { RecordData, LeaveData, StudentData, RecordTableProps } from '@/types/record';
import type { StatusType } from '@/components/ui/status';
import { useRecordTableColumns } from '@/hooks/useRecordTableColumns';
import * as S from './style';

export default function RecordTable({
    activeTab,
    leaveData,
    studentData: initialStudentData,
    selectedDate,
    selectedPeriod,
}: RecordTableProps) {
    const navigate = useNavigate();
    const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());
    const [selectAll, setSelectAll] = useState(false);
    const [studentData, setStudentData] = useState<StudentData[]>(initialStudentData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLeaveseatId, setSelectedLeaveseatId] = useState<number | null>(null);

    const { mutate: deleteLeaveSeat } = useDeleteLeaveSeatMutation();

    // 이석 목록 조회
    const { data: movementData = [] } = useQuery({
        ...movementQuery.list({
            day: selectedDate,
            period: selectedPeriod as any,
        }),
        enabled: activeTab === 'movement' && !!selectedDate && !!selectedPeriod,
    });

    // 이석 상세 조회
    const { data: detailData } = useQuery({
        ...movementQuery.detail(selectedLeaveseatId!),
        enabled: isModalOpen && !!selectedLeaveseatId,
    });

    const handleEdit = (leaveseatId: number) => {
        navigate(`/manage/movement?edit=true&id=${leaveseatId}`);
    };

    const handleDelete = (leaveseatId: number) => {
        deleteLeaveSeat(leaveseatId);
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

    const handleMovementRowClick = (leaveseatId: number) => {
        setSelectedLeaveseatId(leaveseatId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedLeaveseatId(null);
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

    // API 데이터를 UI 형식으로 변환
    const formattedMovementData: RecordData[] = movementData.map((item) => ({
        id: String(item.leaveseat_id),
        location: item.place,
        teacher: item.teacher,
        students: item.students,
        count: String(item.personnel),
        period: item.period,
    }));

    const renderMovementActions = (row: RecordData) => (
        <S.ActionButtons>
            <Button 
                text="수정" 
                onClick={(e) => {
                    e?.stopPropagation();
                    handleEdit(Number(row.id));
                }} 
                variant="confirm" 
            />
            <Button 
                text="삭제" 
                onClick={(e) => {
                    e?.stopPropagation();
                    handleDelete(Number(row.id));
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
                    handleDelete(Number(row.id));
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
                    data={formattedMovementData}
                    renderActions={renderMovementActions}
                    onRowClick={(row) => handleMovementRowClick(Number(row.id))}
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
            {detailData && (
                <MovementDetailModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    leaveseatId={selectedLeaveseatId!}
                    data={{
                        location: detailData.place,
                        teacher: detailData.teacher,
                        reason: detailData.items,
                        students: detailData.students,
                    }}
                />
            )}
        </>
    );
}
