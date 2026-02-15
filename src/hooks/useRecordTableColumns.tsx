import { useState, useRef, useEffect } from 'react';
import Checkbox from '@/components/ui/input/checkbox';
import StatusBadge from '@/components/ui/status';
import type { StatusType } from '@/components/ui/status';
import type { TableColumn } from '@/components/layout/table';
import type { LeaveSeat } from '@/types/movement';
import type { EvasionRecord, ScheduleHistoryRecord, StudentState } from '@/types/manage';
import { mapStateToStatus } from '@/utils/studentState';
import { PERIOD_TO_KOREAN } from '@/utils/period';
import * as S from '@/containers/manage-student/record/record-table/style';

/** ScheduleHistoryRecord에서 교시 데이터에 접근할 수 있는 키 */
type PeriodKey = 'FIVE_PERIOD' | 'SIX_PERIOD' | 'SEVEN_PERIOD' | 'EIGHT_AND_NINE_PERIOD' | 'TEN_AND_ELEVEN_PERIOD';

interface UseRecordTableColumnsProps {
    selectedStudents: Set<string>;
    selectAll: boolean;
    onSelectAll: (checked: boolean) => void;
    onSelectStudent: (id: string, checked: boolean) => void;
    onStatusChange?: (studentNumber: number, periodKey: PeriodKey, status: StatusType, currentState?: StudentState | null) => void;
    onBulkStatusChange?: (studentNumbers: number[], periodKey: PeriodKey, status: StatusType) => void;
}

export function useRecordTableColumns({
    selectedStudents,
    selectAll,
    onSelectAll,
    onSelectStudent,
    onStatusChange,
    onBulkStatusChange,
}: UseRecordTableColumnsProps) {
    const [openStatusMenu, setOpenStatusMenu] = useState<{ studentId: string; periodKey: PeriodKey } | null>(null);
    const [popupPosition, setPopupPosition] = useState<'top' | 'bottom'>('top');
    const menuRef = useRef<HTMLDivElement>(null);
    const cleanupRef = useRef<(() => void) | null>(null);

    // 현재 상태에 따른 옵션 반환
    const getStatusOptions = (currentState?: StudentState | null): StatusType[] => {
        if (currentState === 'AWAY' || currentState === 'EXIT' || 
            currentState === 'EARLY_LEAVE' || currentState === 'EVASION') {
            return ['취소' as StatusType];
        }
        return ['조퇴', '이탈'];
    };

    useEffect(() => {
        if (!openStatusMenu) return;
        
        // 다음 프레임에서 이벤트 리스너 등록 (현재 클릭 이벤트가 완료된 후)
        const timeoutId = setTimeout(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                    setOpenStatusMenu(null);
                }
            };
            
            document.addEventListener('mousedown', handleClickOutside);
            
            // cleanup 함수 저장
            cleanupRef.current = () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, 0);
        
        return () => {
            clearTimeout(timeoutId);
            if (cleanupRef.current) {
                cleanupRef.current();
                cleanupRef.current = null;
            }
        };
    }, [openStatusMenu]);

    const handleStatusClick = (studentNumber: number, periodKey: PeriodKey, e: React.MouseEvent) => {
        e.stopPropagation();
        
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const shouldShowAbove = rect.bottom > windowHeight - 200;
        setPopupPosition(shouldShowAbove ? 'top' : 'bottom');
        
        setOpenStatusMenu({ studentId: String(studentNumber), periodKey });
    };

    const handleStatusSelect = (studentNumber: number, periodKey: PeriodKey, status: StatusType, currentState?: StudentState | null) => {
        const studentId = String(studentNumber);
        if (selectedStudents.size > 0 && selectedStudents.has(studentId)) {
            onBulkStatusChange?.(Array.from(selectedStudents).map(Number), periodKey, status);
        } else {
            onStatusChange?.(studentNumber, periodKey, status, currentState);
        }
        setOpenStatusMenu(null);
    };

    const renderStatusCell = (row: ScheduleHistoryRecord, periodKey: PeriodKey) => {
        const isOpen = openStatusMenu?.studentId === String(row.student_number) && openStatusMenu?.periodKey === periodKey;
        const periodData = row[periodKey];
        const currentState = periodData?.state || null;
        const status = periodData ? mapStateToStatus(periodData.state) : undefined;
        const statusOptions = getStatusOptions(currentState);
        
        return (
            <S.StatusCellWrapper>
                <S.StatusClickArea onClick={(e) => handleStatusClick(row.student_number, periodKey, e)}>
                    {status ? <StatusBadge status={status} /> : <S.EmptyStatus>X</S.EmptyStatus>}
                </S.StatusClickArea>
                {isOpen && (
                    <S.StatusPopup 
                        ref={menuRef} 
                        $position={popupPosition}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        {statusOptions.map((option) => (
                            <S.StatusOption
                                key={option}
                                onMouseDown={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    handleStatusSelect(row.student_number, periodKey, option, currentState);
                                }}
                            >
                                <StatusBadge status={option} />
                            </S.StatusOption>
                        ))}
                    </S.StatusPopup>
                )}
            </S.StatusCellWrapper>
        );
    };

    const movementColumns: TableColumn<LeaveSeat>[] = [
        {
            key: 'period',
            header: '교시',
            width: '150px',
            render: (row) => PERIOD_TO_KOREAN[row.period as keyof typeof PERIOD_TO_KOREAN] || row.period,
        },
        {
            key: 'teacher',
            header: '작성교사',
            width: '150px',
        },
        {
            key: 'place',
            header: '장소',
            width: '150px',
        },
        {
            key: 'personnel',
            header: '인원',
            width: '150px',
            render: (row) => String(row.personnel),
        },
        {
            key: 'students',
            header: '학생',
            render: (row) => (
                <S.StudentNames>
                    {row.students.slice(0, 3).map((student, idx) => (
                        <S.StudentName key={idx}>{student}</S.StudentName>
                    ))}
                    {row.students.length > 3 && <S.StudentName>....</S.StudentName>}
                </S.StudentNames>
            ),
        },
    ];

    const leaveColumns: TableColumn<EvasionRecord>[] = [
        {
            key: 'studentInfo',
            header: '학번 / 이름',
            width: '200px',
            render: (row) => `${row.number} ${row.name}`,
        },
        {
            key: 'time',
            header: '시간',
            width: '180px',
            render: (row) => PERIOD_TO_KOREAN[row.period],
        },
        {
            key: 'teacher',
            header: '처리 담당 선생님',
            width: '180px',
        },
    ];

    const studentColumns: TableColumn<ScheduleHistoryRecord>[] = [
        {
            key: 'checkbox',
            header: <Checkbox checked={selectAll} onChange={onSelectAll} />,
            width: '66px',
            render: (row) => (
                <Checkbox
                    checked={selectedStudents.has(String(row.student_number))}
                    onChange={(checked) => onSelectStudent(String(row.student_number), checked)}
                />
            ),
        },
        {
            key: 'studentInfo',
            header: '학번 / 이름',
            width: '505px',
            render: (row) => `${row.student_number} ${row.name}`,
        },
        {
            key: 'FIVE_PERIOD',
            header: '5교시',
            width: '180px',
            render: (row) => renderStatusCell(row, 'FIVE_PERIOD'),
        },
        {
            key: 'SIX_PERIOD',
            header: '6교시',
            width: '180px',
            render: (row) => renderStatusCell(row, 'SIX_PERIOD'),
        },
        {
            key: 'SEVEN_PERIOD',
            header: '7교시',
            width: '180px',
            render: (row) => renderStatusCell(row, 'SEVEN_PERIOD'),
        },
        {
            key: 'EIGHT_AND_NINE_PERIOD',
            header: '8~9교시',
            width: '180px',
            render: (row) => renderStatusCell(row, 'EIGHT_AND_NINE_PERIOD'),
        },
        {
            key: 'TEN_AND_ELEVEN_PERIOD',
            header: '10~11교시',
            width: '180px',
            render: (row) => renderStatusCell(row, 'TEN_AND_ELEVEN_PERIOD'),
        },
    ];

    return {
        movementColumns,
        leaveColumns,
        studentColumns,
    };
}
