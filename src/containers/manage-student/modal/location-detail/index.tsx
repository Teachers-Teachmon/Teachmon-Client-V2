import { useState } from 'react';
import Modal from '@/components/layout/modal';
import { useDevice } from '@/hooks/useDevice';
import type { StatusType } from '@/components/ui/status';
import type { StudentState } from '@/services/manage/manage.api';
import * as S from './style';

interface Student {
    studentNumber: number;
    studentName: string;
    status?: StatusType;
    scheduleId?: number;
    state?: StudentState | null;
}

interface LocationDetailProps {
    locationName: string;
    students: Student[];
    onClose: () => void;
    isOpen: boolean;
    onStatusChange?: (scheduleId: number, status: StatusType, currentState?: StudentState | null) => void;
}

export default function LocationDetail({ locationName, students, onClose, isOpen, onStatusChange }: LocationDetailProps) {
    const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
    const { isMobile } = useDevice();

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedStudentId(null);
    };

    const handleStatusClick = (student: Student, status: StatusType) => {
        if (!student.scheduleId || !onStatusChange) return;
        onStatusChange(student.scheduleId, status, student.state);
        setSelectedStudentId(null);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} padding={isMobile ? "32px 20px" : "60px"}>
            <S.ModalContainer onClick={handleModalClick}>
                <S.Header>
                    <S.Title>{locationName}</S.Title>
                    <S.CloseButton onClick={onClose}>
                        <S.CloseIcon src="/icons/common/xmark.svg" alt="닫기" />
                    </S.CloseButton>
                </S.Header>
                <S.InfoSection>
                    <S.StudentCount>학생 {students.length}명</S.StudentCount>
                    <S.HintText>* 결석한 학생이 있다면 클릭해서 상태를 바꿔주세요</S.HintText>
                </S.InfoSection>
                <S.StudentsGrid>
                    {students.map((student) => {
                        const isSelected = selectedStudentId === student.studentNumber;
                        const hasStatus = student.state === 'AWAY' || student.state === 'EXIT' || 
                                        student.state === 'EARLY_LEAVE' || student.state === 'EVASION';
                        
                        return (
                            <S.StudentCard
                                key={student.studentNumber}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // state가 있을 때만 선택 가능
                                    if (student.state) {
                                        setSelectedStudentId(isSelected ? null : student.studentNumber);
                                    }
                                }}
                                $state={student.state}
                            >
                                {!isSelected || !student.state ? (
                                    <S.StudentInfo>
                                        {student.studentNumber}
                                        <br />
                                        {student.studentName}
                                    </S.StudentInfo>
                                ) : (
                                    <S.StatusButtons>
                                        {hasStatus ? (
                                            <S.StatusButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleStatusClick(student, '취소' as StatusType);
                                                }}
                                            >
                                                취소
                                            </S.StatusButton>
                                        ) : (
                                            <>
                                                <S.StatusButton
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleStatusClick(student, '이탈' as StatusType);
                                                    }}
                                                >
                                                    이탈
                                                </S.StatusButton>
                                                <S.StatusButton
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleStatusClick(student, '조퇴' as StatusType);
                                                    }}
                                                >
                                                    조퇴
                                                </S.StatusButton>
                                            </>
                                        )}
                                    </S.StatusButtons>
                                )}
                            </S.StudentCard>
                        );
                    })}
                </S.StudentsGrid>
            </S.ModalContainer>
        </Modal>
    );
}
