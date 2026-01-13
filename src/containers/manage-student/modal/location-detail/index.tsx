import { useState } from 'react';
import Modal from '@/components/layout/modal';
import type { StatusType } from '@/components/ui/status';
import * as S from './style';

interface Student {
    studentNumber: number;
    studentName: string;
    status?: StatusType;
}

interface LocationDetailProps {
    locationName: string;
    students: Student[];
    onClose: () => void;
    isOpen: boolean;
}

export default function LocationDetail({ locationName, students, onClose, isOpen }: LocationDetailProps) {
    const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedStudentId(null);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} padding="60px">
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
                        const hasStatus = student.status === '조퇴' || student.status === '이탈';
                        
                        return (
                            <S.StudentCard
                                key={student.studentNumber}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedStudentId(isSelected ? null : student.studentNumber);
                                }}
                                $status={student.status}
                            >
                                {!isSelected ? (
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
                                                    // TODO: 취소 로직
                                                    setSelectedStudentId(null);
                                                }}
                                            >
                                                취소
                                            </S.StatusButton>
                                        ) : (
                                            <>
                                                <S.StatusButton
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // TODO: 이탈 로직
                                                        setSelectedStudentId(null);
                                                    }}
                                                >
                                                    이탈
                                                </S.StatusButton>
                                                <S.StatusButton
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // TODO: 조퇴 로직
                                                        setSelectedStudentId(null);
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
