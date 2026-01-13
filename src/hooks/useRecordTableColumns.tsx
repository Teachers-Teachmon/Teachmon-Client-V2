import { useState, useRef, useEffect } from 'react';
import Checkbox from '@/components/ui/input/checkbox';
import StatusBadge from '@/components/ui/status';
import type { StatusType } from '@/components/ui/status';
import type { TableColumn } from '@/components/layout/table';
import type { RecordData, LeaveData, StudentData } from '@/types/record';
import * as S from '@/containers/manage-student/record/record-table/style';

const STATUS_OPTIONS: StatusType[] = ['방과후', '자습', '이석', '조퇴', '이탈'];

interface UseRecordTableColumnsProps {
    selectedStudents: Set<string>;
    selectAll: boolean;
    onSelectAll: (checked: boolean) => void;
    onSelectStudent: (id: string, checked: boolean) => void;
    onStatusChange?: (studentId: string, period: string, status: StatusType) => void;
    onBulkStatusChange?: (studentIds: string[], period: string, status: StatusType) => void;
}

export function useRecordTableColumns({
    selectedStudents,
    selectAll,
    onSelectAll,
    onSelectStudent,
    onStatusChange,
    onBulkStatusChange,
}: UseRecordTableColumnsProps) {
    const [openStatusMenu, setOpenStatusMenu] = useState<{ studentId: string; period: string } | null>(null);
    const [popupPosition, setPopupPosition] = useState<'top' | 'bottom'>('top');
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenStatusMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleStatusClick = (studentId: string, period: string, e: React.MouseEvent) => {
        e.stopPropagation();
        
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const shouldShowAbove = rect.bottom > windowHeight - 200;
        setPopupPosition(shouldShowAbove ? 'top' : 'bottom');
        
        setOpenStatusMenu({ studentId, period });
    };

    const handleStatusSelect = (studentId: string, period: string, status: StatusType) => {
        if (selectedStudents.size > 0 && selectedStudents.has(studentId)) {
            onBulkStatusChange?.(Array.from(selectedStudents), period, status);
        } else {
            onStatusChange?.(studentId, period, status);
        }
        setOpenStatusMenu(null);
    };

    const renderStatusCell = (row: StudentData, period: string, status?: StatusType) => {
        const isOpen = openStatusMenu?.studentId === row.id && openStatusMenu?.period === period;
        
        return (
            <S.StatusCellWrapper>
                <S.StatusClickArea onClick={(e) => handleStatusClick(row.id, period, e)}>
                    {status ? <StatusBadge status={status} /> : null}
                </S.StatusClickArea>
                {isOpen && (
                    <S.StatusPopup ref={menuRef} $position={popupPosition}>
                        {STATUS_OPTIONS.map((option) => (
                            <S.StatusOption
                                key={option}
                                onClick={() => handleStatusSelect(row.id, period, option)}
                            >
                                <StatusBadge status={option} />
                            </S.StatusOption>
                        ))}
                    </S.StatusPopup>
                )}
            </S.StatusCellWrapper>
        );
    };

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
            render: (row) => renderStatusCell(row, 'period5', row.period5),
        },
        {
            key: 'period6',
            header: '6교시',
            width: '180px',
            render: (row) => renderStatusCell(row, 'period6', row.period6),
        },
        {
            key: 'period7',
            header: '7교시',
            width: '180px',
            render: (row) => renderStatusCell(row, 'period7', row.period7),
        },
        {
            key: 'period89',
            header: '8~9교시',
            width: '180px',
            render: (row) => renderStatusCell(row, 'period89', row.period89),
        },
        {
            key: 'period1011',
            header: '10~11교시',
            width: '180px',
            render: (row) => renderStatusCell(row, 'period1011', row.period1011),
        },
    ];

    return {
        movementColumns,
        leaveColumns,
        studentColumns,
    };
}
