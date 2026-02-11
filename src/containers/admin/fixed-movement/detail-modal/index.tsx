import type { FixedMovement } from '@/types/fixedMovement';
import { WEEKDAYS } from '@/constants/fixedMovement';
import Modal from '@/components/layout/modal';
import * as S from './style';

interface FixedMovementDetailModalProps {
  movement: FixedMovement | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function FixedMovementDetailModal({ 
  movement, 
  isOpen, 
  onClose 
}: FixedMovementDetailModalProps) {
  if (!movement) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} padding="0">
      <S.Container>
        <S.Header>
          <S.Title>{movement.location}</S.Title>
          <S.CloseButton onClick={onClose}>
            <S.CloseIcon>✕</S.CloseIcon>
          </S.CloseButton>
        </S.Header>

        <S.Content>
          <S.InfoSection>
            <S.InfoLabel>요일</S.InfoLabel>
            <S.InfoValue>{WEEKDAYS[movement.day as keyof typeof WEEKDAYS]}</S.InfoValue>
          </S.InfoSection>

          <S.InfoSection>
            <S.InfoLabel>교시</S.InfoLabel>
            <S.InfoValue>{movement.period}</S.InfoValue>
          </S.InfoSection>

          <S.InfoSection>
            <S.InfoLabel>인원</S.InfoLabel>
            <S.InfoValue>{movement.personnel}명</S.InfoValue>
          </S.InfoSection>

          <S.InfoSection>
            <S.InfoLabel>학생 {movement.personnel}명</S.InfoLabel>
            <S.StudentGrid>
              {movement.students.map((student, idx) => (
                <S.StudentCard key={idx}>
                  <S.StudentNumber>{student.studentNumber}</S.StudentNumber>
                  <S.StudentName>{student.name}</S.StudentName>
                </S.StudentCard>
              ))}
            </S.StudentGrid>
          </S.InfoSection>
        </S.Content>
      </S.Container>
    </Modal>
  );
}
