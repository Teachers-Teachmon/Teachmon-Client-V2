import { useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '@/components/layout/modal';
import { useDevice } from '@/hooks/useDevice';
import type { StatusType } from '@/components/ui/status';
import type { StudentState, StudentSchedule } from '@/types/manage';
import * as S from './style';

interface LocationDetailProps {
    locationName: string;
    students: StudentSchedule[];
    onClose: () => void;
    isOpen: boolean;
    onStatusChange?: (scheduleId: string, status: StatusType, currentState?: StudentState | null) => void;
    isLoading?: boolean;
}

export default function LocationDetail({ locationName, students, onClose, isOpen, onStatusChange, isLoading }: LocationDetailProps) {
    const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
    const { isMobile } = useDevice();

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedStudentId(null);
    };

    const handleStatusClick = (student: StudentSchedule, status: StatusType) => {
        if (!student.schedule_id || !onStatusChange) return;
        onStatusChange(student.schedule_id, status, student.state);
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
                    <S.HintText>* 이탈이나 조퇴를한 학생이 있다면 클릭해서 상태를 바꿔주세요</S.HintText>
                </S.InfoSection>
                <S.StudentsGrid>
                    {isLoading ? (
                        <S.StudentInfo style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                            불러오는 중...
                        </S.StudentInfo>
                    ) : students.length === 0 ? (
                        <S.StudentInfo style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                            학생이 없습니다
                        </S.StudentInfo>
                    ) : (
                    students.map((student) => {
                        const isSelected = selectedStudentId === student.number;
                        const hasStatus = student.state === 'AWAY' || student.state === 'EXIT' || 
                                        student.state === 'EARLY_LEAVE' || student.state === 'EVASION';
                        const isAfterSchool = student.state === 'AFTER_SCHOOL' || student.state === 'AFTER_SCHOOL_REINFORCEMENT';
                        
                        return (
                            <S.StudentCard
                                key={student.number}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // 방과후 상태일 때는 toast 메시지 표시
                                    if (isAfterSchool) {
                                        toast.warning('방과후는 상태 변경이 불가능합니다');
                                        return;
                                    }
                                    // state가 있을 때만 선택 가능
                                    if (student.state) {
                                        setSelectedStudentId(isSelected ? null : student.number);
                                    }
                                }}
                                $state={student.state}
                            >
                                {!isSelected || !student.state ? (
                                    <S.StudentInfo>
                                        {student.number}
                                        <br />
                                        {student.name}
                                    </S.StudentInfo>
                                ) : (
                                    <S.StatusButtons>
                                        {hasStatus ? (
                                            <S.StatusButton
                                                $statusType="취소"
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
                                                    $statusType="이탈"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleStatusClick(student, '이탈' as StatusType);
                                                    }}
                                                >
                                                    이탈
                                                </S.StatusButton>
                                                <S.StatusButton
                                                    $statusType="조퇴"
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
                    })
                    )}
                </S.StudentsGrid>
            </S.ModalContainer>
        </Modal>
    );
}
