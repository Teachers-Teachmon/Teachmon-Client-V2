import { useEffect } from 'react';
import StatusBadge from '@/components/ui/status';
import type { StatusType } from '@/components/ui/status';
import type { StudentState } from '@/types/manage';
import { getStudentStateInfo } from '@/utils/studentState';
import * as S from './style';

interface Student {
    id: number;
    number: number;
    name: string;
    state?: StudentState | null;
    scheduleId?: string;
}

interface ClassCardProps {
    classNum: number;
    students: Student[];
    selectedStudentId: number | null;
    onStudentSelect: (id: number | null) => void;
    onStatusChange?: (scheduleId: string, status: StatusType, currentState?: StudentState | null) => void;
    isLoading?: boolean;
}

export default function ClassCard({ classNum, students, selectedStudentId, onStudentSelect, onStatusChange, isLoading }: ClassCardProps) {
    useEffect(() => {
        if (!selectedStudentId) return;

        const handleClickOutside = () => {
            onStudentSelect(null);
        };

        // 다음 틱에 이벤트 리스너 추가
        const timer = setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
        }, 0);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [selectedStudentId, onStudentSelect]);

    const getStatusOptions = (student: Student): StatusType[] => {
        if (student.state === 'AWAY' || student.state === 'EXIT' || 
            student.state === 'EARLY_LEAVE' || student.state === 'EVASION') {
            return ['취소' as StatusType];
        }
        return ['조퇴', '이탈'];
    };

    const handleStatusClick = (student: Student, status: StatusType) => {
        if (!student.scheduleId || !onStatusChange) return;
        onStatusChange(student.scheduleId, status, student.state);
    };

    return (
        <S.Container>
            <S.ClassTitle>{classNum}반</S.ClassTitle>
            <S.StudentsGrid>
                {isLoading ? (
                    <S.EmptyState>로딩중...</S.EmptyState>
                ) : students.length === 0 ? (
                    <S.EmptyState>학생 데이터가 없습니다.</S.EmptyState>
                ) : (
                    students.map((student) => {
                        const stateInfo = getStudentStateInfo(student.state);
                        const displayColor = stateInfo?.color || '#9CA4BA';
                        const displayBgColor = stateInfo?.backgroundColor || '#F5F5F5';
                        // 해당 학생이 방과후 상태인지 확인
                        const isStudentAfterSchool = student.state === 'AFTER_SCHOOL' || student.state === 'AFTER_SCHOOL_REINFORCEMENT';
                        
                        return (
                            <S.StudentCard 
                                key={student.id}
                                $stateColor={displayColor}
                                $stateBgColor={displayBgColor}
                                $hasState={!!student.state && !isStudentAfterSchool}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // 방과후 상태가 아닐 때만 선택 가능
                                    if (!isStudentAfterSchool) {
                                        onStudentSelect(student.id);
                                    }
                                }}
                            >
                                <S.StudentNumber>{String(student.number).slice(-2)}</S.StudentNumber>
                                <S.StudentName>{student.name}</S.StudentName>
                                {selectedStudentId === student.id && !isStudentAfterSchool && (
                                    <S.StatusPopupContainer onClick={(e) => e.stopPropagation()}>
                                        {getStatusOptions(student).map((status, index) => (
                                            <S.StatusBadgeWrapper 
                                                key={index}
                                                onClick={() => handleStatusClick(student, status)}
                                            >
                                                <StatusBadge status={status} />
                                            </S.StatusBadgeWrapper>
                                        ))}
                                    </S.StatusPopupContainer>
                                )}
                            </S.StudentCard>
                        );
                    })
                )}
            </S.StudentsGrid>
        </S.Container>
    );
}
