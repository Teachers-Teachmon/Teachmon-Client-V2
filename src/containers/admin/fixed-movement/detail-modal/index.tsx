import { useQuery } from '@tanstack/react-query';
import { WEEKDAYS } from '@/constants/fixedMovement';
import { fixedMovementQuery } from '@/services/fixed-movement/fixedMovement.query';
import { toFixedMovement } from '@/utils/fixedMovementMapper';
import Loading from '@/components/ui/loading';
import Modal from '@/components/layout/modal';
import * as S from './style';

interface FixedMovementDetailModalProps {
  movementId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function FixedMovementDetailModal({ 
  movementId, 
  isOpen, 
  onClose 
}: FixedMovementDetailModalProps) {
  const { data: rawData, isLoading } = useQuery(fixedMovementQuery.detail(movementId ?? undefined));
  const movement = rawData ? toFixedMovement(rawData) : null;

  if (!movementId) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} padding="0">
      <S.Container>
        <S.Header>
          <S.Title>{movement?.location ?? ''}</S.Title>
          <S.CloseButton onClick={onClose}>
            <S.CloseIcon>✕</S.CloseIcon>
          </S.CloseButton>
        </S.Header>

        {isLoading ? (
          <Loading />
        ) : movement ? (
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
              <S.InfoLabel>장소</S.InfoLabel>
              <S.InfoValue>{movement.location}</S.InfoValue>
            </S.InfoSection>

            {movement.cause && (
              <S.InfoSection>
                <S.InfoLabel>사유</S.InfoLabel>
                <S.InfoValue>{movement.cause}</S.InfoValue>
              </S.InfoSection>
            )}

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
        ) : null}
      </S.Container>
    </Modal>
  );
}
