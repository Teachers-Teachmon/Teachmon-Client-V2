import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox';
import StatusBadge from '@/components/ui/status';
import TableLayout, { type TableColumn } from '@/components/layout/table';
import type { RecordData, LeaveData, StudentData } from '@/types/record';
import * as S from './style';

interface RecordTableProps {
    activeTab: 'movement' | 'leave' | 'student';
    movementData: RecordData[];
    leaveData: LeaveData[];
    studentData: StudentData[];
    selectedStudents: Set<string>;
    selectAll: boolean;
    onSelectAll: (checked: boolean) => void;
    onSelectStudent: (id: string, checked: boolean) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onMovementRowClick?: (data: RecordData) => void;
}

export default function RecordTable({
    activeTab,
    movementData,
    leaveData,
    studentData,
    selectedStudents,
    selectAll,
    onSelectAll,
    onSelectStudent,
    onEdit,
    onDelete,
    onMovementRowClick,
}: RecordTableProps) {
    const movementColumns: TableColumn<RecordData>[] = [
        {
            key: 'period',
            header: '교시',
            width: '150px',
        },
        {
            key: 'teacher',
            header: '작성교사',
            width: '150px',
        },
        {
            key: 'location',
            header: '장소',
            width: '150px',
        },
        {
            key: 'count',
            header: '인원',
            width: '150px',
        },
        {
            key: 'students',
            header: '학생',
            render: (row) => (
                <S.StudentNames>
                    {row.students.map((student, idx) => (
                        <S.StudentName key={idx}>{student}</S.StudentName>
                    ))}
                    <S.StudentName>....</S.StudentName>
                </S.StudentNames>
            ),
        },
    ];

    const leaveColumns: TableColumn<LeaveData>[] = [
        {
            key: 'studentInfo',
            header: '학번 / 이름',
            width: '200px',
        },
        {
            key: 'time',
            header: '시간',
            width: '180px',
        },
        {
            key: 'handlingTeacher',
            header: '처리 담당 선생님',
            width: '180px',
        },
    ];

    const studentColumns: TableColumn<StudentData>[] = [
        {
            key: 'checkbox',
            header: <Checkbox checked={selectAll} onChange={onSelectAll} />,
            width: '66px',
            render: (row) => (
                <Checkbox
                    checked={selectedStudents.has(row.id)}
                    onChange={(checked) => onSelectStudent(row.id, checked)}
                />
            ),
        },
        {
            key: 'studentInfo',
            header: '학번 / 이름',
            width: '505px',
        },
        {
            key: 'period5',
            header: '5교시',
            width: '180px',
            render: (row) => (row.period5 ? <StatusBadge status={row.period5} /> : null),
        },
        {
            key: 'period6',
            header: '6교시',
            width: '180px',
            render: (row) => (row.period6 ? <StatusBadge status={row.period6} /> : null),
        },
        {
            key: 'period7',
            header: '7교시',
            width: '180px',
            render: (row) => (row.period7 ? <StatusBadge status={row.period7} /> : null),
        },
        {
            key: 'period89',
            header: '8~9교시',
            width: '180px',
            render: (row) => (row.period89 ? <StatusBadge status={row.period89} /> : null),
        },
        {
            key: 'period1011',
            header: '10~11교시',
            width: '180px',
            render: (row) => (row.period1011 ? <StatusBadge status={row.period1011} /> : null),
        },
    ];

    const renderMovementActions = (row: RecordData) => (
        <S.ActionButtons>
            <Button text="수정" onClick={() => onEdit(row.id)} variant="confirm" />
            <Button text="삭제" onClick={() => onDelete(row.id)} variant="delete" />
        </S.ActionButtons>
    );

    const renderLeaveActions = (row: LeaveData) => (
        <S.ActionButtons>
            <Button text="삭제" onClick={() => onDelete(row.id)} variant="delete" />
        </S.ActionButtons>
    );

    return (
        <>
            {activeTab === 'movement' && (
                <TableLayout
                    columns={movementColumns}
                    data={movementData}
                    renderActions={renderMovementActions}
                    onRowClick={onMovementRowClick}
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
        </>
    );
}
