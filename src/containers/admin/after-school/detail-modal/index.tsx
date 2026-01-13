import type { AdminAfterSchoolClass } from '@/types/afterSchool';
import Modal from '@/components/layout/modal';
import * as S from './style';

interface AfterSchoolDetailModalProps {
  classData: AdminAfterSchoolClass | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AfterSchoolDetailModal({ 
  classData, 
  isOpen, 
  onClose 
}: AfterSchoolDetailModalProps) {
  if (!classData) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} padding="0">
      <S.Container>
        <S.Header>
          <S.HeaderTop>
            <S.TimeLabel>{classData.day} {classData.period}</S.TimeLabel>
            <S.CloseButton onClick={onClose}>
              <S.CloseIcon>✕</S.CloseIcon>
            </S.CloseButton>
          </S.HeaderTop>
          <S.Title>{classData.subject}</S.Title>
        </S.Header>

        <S.Content>
          <S.InfoRow>
            <S.InfoLabel>담당교사</S.InfoLabel>
            <S.InfoValue>{classData.teacher}</S.InfoValue>
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoLabel>장소</S.InfoLabel>
            <S.InfoValue>{classData.location}</S.InfoValue>
          </S.InfoRow>

          <S.ClassLabel>{classData.grade}반</S.ClassLabel>

          <S.StudentGrid>
            {classData.students.map((student, idx) => (
              <S.StudentCard key={idx}>
                <S.StudentInfo>{student}</S.StudentInfo>
              </S.StudentCard>
            ))}
          </S.StudentGrid>
        </S.Content>
      </S.Container>
    </Modal>
  );
}
