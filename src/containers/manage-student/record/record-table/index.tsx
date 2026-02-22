import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Button from '@/components/ui/button';
import TableLayout from '@/components/layout/table';
import MovementDetailModal from '@/containers/manage-student/record/movement-detail';
import ConfirmModal from '@/components/layout/modal/confirm';

import { movementQuery } from '@/services/movement/movement.query';
import { useDeleteLeaveSeatMutation } from '@/services/movement/movement.mutation';
import { useDeleteEvasionMutation } from '@/services/manage/manage.mutation';
import { useStudentStatus } from '@/hooks/useStudentStatus';
import type { RecordTableProps } from '@/types/record';
import type { StatusType } from '@/components/ui/status';
import type { StudentState } from '@/types/manage';
import type { ScheduleHistoryRecord } from '@/types/manage';
import { useRecordTableColumns } from '@/hooks/useRecordTableColumns';
import * as S from './style';

export default function RecordTable({
    activeTab,
    movementData,
    leaveData,
    studentData,
    isLoading = false,
}: RecordTableProps) {
    const navigate = useNavigate();
    const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());
    const [selectAll, setSelectAll] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLeaveseatId, setSelectedLeaveseatId] = useState<string | null>(null);
    const [deleteConfirmModal, setDeleteConfirmModal] = useState<{ isOpen: boolean; type: 'movement' | 'evasion'; id: string | number | null }>({
        isOpen: false,
        type: 'movement',
        id: null,
    });

    const { mutate: deleteLeaveSeat } = useDeleteLeaveSeatMutation();
    const { mutate: deleteEvasion } = useDeleteEvasionMutation();
    const { changeStatus } = useStudentStatus();

    // 이석 상세 조회
    const { data: detailData } = useQuery({
        ...movementQuery.detail(selectedLeaveseatId!),
        enabled: isModalOpen && !!selectedLeaveseatId,
    });

    const handleEdit = (leaveseatId: string) => {
        navigate(`/manage/movement?edit=true&id=${leaveseatId}`);
    };

    const handleDelete = (leaveseatId: string) => {
        setDeleteConfirmModal({ isOpen: true, type: 'movement', id: leaveseatId });
    };

    const handleDeleteEvasion = (exitId: number | string) => {
        console.log('handleDeleteEvasion called with exitId:', exitId, 'type:', typeof exitId);
        setDeleteConfirmModal({ isOpen: true, type: 'evasion', id: exitId });
    };

    const handleConfirmDelete = () => {
        const { type, id } = deleteConfirmModal;
        console.log('handleConfirmDelete called:', { type, id, idType: typeof id });
        
        if (type === 'movement' && typeof id === 'string') {
            console.log('Calling deleteLeaveSeat with id:', id);
            deleteLeaveSeat(id);
        } else if (type === 'evasion' && id !== null) {
            // id를 그대로 전달 (number 또는 string)
            console.log('Calling deleteEvasion with id:', id);
            deleteEvasion(id as number | string);
        }
        
        // 모달 닫기
        setDeleteConfirmModal({ isOpen: false, type: 'movement', id: null });
    };

    const handleCancelDelete = () => {
        setDeleteConfirmModal({ isOpen: false, type: 'movement', id: null });
    };

    const handleSelectAll = (checked: boolean) => {
        setSelectAll(checked);
        if (checked) {
            setSelectedStudents(new Set(studentData.map((s) => String(s.student_number))));
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

    const handleMovementRowClick = (leaveseatId: string) => {
        setSelectedLeaveseatId(leaveseatId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedLeaveseatId(null);
    };

    const handleStatusChange = (studentNumber: number, periodKey: keyof ScheduleHistoryRecord, status: StatusType, currentState?: StudentState | null) => {
        const student = studentData.find(s => s.student_number === studentNumber);
        const scheduleId = (student?.[periodKey] as { schedule_id: string } | null)?.schedule_id;
        if (!scheduleId) return;
        changeStatus(scheduleId, status, currentState);
    };

    const handleBulkStatusChange = (studentNumbers: number[], periodKey: keyof ScheduleHistoryRecord, status: StatusType) => {
        if (status === '취소') return;

        studentNumbers.forEach(studentNumber => {
            const student = studentData.find(s => s.student_number === studentNumber);
            const scheduleId = (student?.[periodKey] as { schedule_id: string } | null)?.schedule_id;
            if (scheduleId) changeStatus(scheduleId, status);
        });
    };

    const { movementColumns, leaveColumns, studentColumns } = useRecordTableColumns({
        selectedStudents,
        selectAll,
        onSelectAll: handleSelectAll,
        onSelectStudent: handleSelectStudent,
        onStatusChange: handleStatusChange,
        onBulkStatusChange: handleBulkStatusChange,
    });

    const renderMovementActions = (row: typeof movementData[0]) => (
        <S.ActionButtons>
            <Button 
                text="수정" 
                onClick={(e) => {
                    e?.stopPropagation();
                    handleEdit(row.leaveseat_id);
                }} 
                variant="confirm" 
            />
            <Button 
                text="삭제" 
                onClick={(e) => {
                    e?.stopPropagation();
                    handleDelete(row.leaveseat_id);
                }} 
                variant="delete" 
            />
        </S.ActionButtons>
    );

    const renderLeaveActions = (row: typeof leaveData[0]) => (
        <S.ActionButtons>
            <Button 
                text="이탈삭제" 
                onClick={(e) => {
                    e?.stopPropagation();
                    handleDeleteEvasion(row.exit_id);
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
                    onRowClick={(row) => handleMovementRowClick(row.leaveseat_id)}
                    getRowId={(row) => String(row.leaveseat_id)}
                    isLoading={isLoading}
                />
            )}
            {activeTab === 'leave' && (
                <TableLayout
                    columns={leaveColumns}
                    data={leaveData}
                    renderActions={renderLeaveActions}
                    getRowId={(row) => String(row.exit_id)}
                    isLoading={isLoading}
                />
            )}
            {activeTab === 'student' && (
                <TableLayout
                    columns={studentColumns}
                    data={studentData}
                    renderActions={() => <></>}
                    getRowId={(row) => String(row.student_number)}
                    isLoading={isLoading}
                />
            )}
            {detailData && (
                <MovementDetailModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    data={{
                        location: detailData.place.name,
                        teacher: detailData.teacher,
                        reason: detailData.cause,
                        students: detailData.students,
                    }}
                />
            )}
            <ConfirmModal
                isOpen={deleteConfirmModal.isOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                title={deleteConfirmModal.type === 'movement' ? '이석 삭제' : '이탈 삭제'}
                message={deleteConfirmModal.type === 'movement' ? '이석 기록을 삭제하시겠습니까?' : '이탈 기록을 삭제하시겠습니까?'}
                cancelText="취소"
                confirmText="삭제"
            />
        </>
    );
}
