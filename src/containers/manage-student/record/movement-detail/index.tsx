import Modal from '@/components/layout/modal';
import { useDevice } from '@/hooks/useDevice';
import * as S from './style';

interface MovementDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
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
    data,
}: MovementDetailModalProps) {
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
            </S.Container>
        </Modal>
    );
}
