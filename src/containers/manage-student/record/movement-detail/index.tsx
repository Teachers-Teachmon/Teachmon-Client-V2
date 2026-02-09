import { useNavigate } from 'react-router-dom';
import Modal from '@/components/layout/modal';
import Button from '@/components/ui/button';
import { useDevice } from '@/hooks/useDevice';

import * as S from './style';

interface MovementDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    leaveseatId: number;
    data: {
        location: string;
        teacher: string;
        reason: string;
        students: string[];
    };
}

export default function MovementDetailModal({
    isOpen,
    onClose,
    leaveseatId,
    data,
}: MovementDetailModalProps) {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/manage/movement?edit=true&id=${leaveseatId}`);
    };
    const { isMobile } = useDevice();

    return (
        <Modal isOpen={isOpen} onClose={onClose} padding={isMobile ? "32px 20px" : "60px"}>
            <S.Container>
                <S.Header>
                    <S.Title>{data.location}</S.Title>
                    <S.CloseButton onClick={onClose}>
                        <img src="/icons/common/xmark.svg" alt="close" />
                    </S.CloseButton>
                </S.Header>

                <S.Content>
                    <S.InfoSection>
                        <S.InfoLabel>작성교사</S.InfoLabel>
                        <S.InfoValue>{data.teacher}</S.InfoValue>
                    </S.InfoSection>

                    <S.InfoSection>
                        <S.InfoLabel>사유</S.InfoLabel>
                        <S.InfoValue>{data.reason}</S.InfoValue>
                    </S.InfoSection>

                    <S.StudentsSection>
                        <S.StudentsTitle>학생 {data.students.length}명</S.StudentsTitle>
                        <S.StudentGrid>
                            {data.students.map((student, index) => (
                                <S.StudentCard key={index}>
                                    <S.StudentInfo>{student}</S.StudentInfo>
                                </S.StudentCard>
                            ))}
                        </S.StudentGrid>
                    </S.StudentsSection>
                </S.Content>

                <S.ButtonWrapper>
                    <Button text="수정" variant="confirm" onClick={handleEdit} />
                </S.ButtonWrapper>
            </S.Container>
        </Modal>
    );
}
