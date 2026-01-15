import Modal from '@/components/layout/modal';
import Button from '@/components/ui/button';
import type { SelfStudySchedule } from '@/types/selfStudy';
import { getGradeColor, formatGrade, formatPeriods } from '@/utils/selfStudy';
import * as S from './style';

interface DetailModalProps {
  isOpen: boolean;
  schedule: SelfStudySchedule | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const getGradeBgColor = (grade: 1 | 2 | 3 | 'all'): string => {
  return getGradeColor(grade).bgColor;
};

const getGradeTextColor = (grade: 1 | 2 | 3 | 'all'): string => {
  return getGradeColor(grade).textColor;
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
  return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
};

const formatDateRange = (startDate: Date, endDate: Date): string => {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  if (startDate.getTime() === endDate.getTime()) {
    return start;
  }
  return `${start} ~ ${end}`;
};

export default function DetailModal({ isOpen, schedule, onClose, onDelete }: DetailModalProps) {
  if (!schedule) return null;

  const handleDelete = () => {
    onDelete(schedule.id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} padding="2.5rem">
      <S.Container>
        <S.Header>
          <S.Title>자습 일정 상세</S.Title>
        </S.Header>

        <S.Content>
          <S.InfoRow>
            <S.Label>기간</S.Label>
            <S.Value>{formatDateRange(schedule.startDate, schedule.endDate)}</S.Value>
          </S.InfoRow>

          <S.InfoRow>
            <S.Label>학년</S.Label>
            <S.GradeBadge
              $bgColor={getGradeBgColor(schedule.grade)}
              $textColor={getGradeTextColor(schedule.grade)}
            >
              {formatGrade(schedule.grade)}
            </S.GradeBadge>
          </S.InfoRow>

          <S.InfoRow>
            <S.Label>교시</S.Label>
            <S.Value>
              {formatPeriods(schedule.periods)}
            </S.Value>
          </S.InfoRow>
        </S.Content>

        <S.ButtonGroup>
          <Button
            variant="delete"
            text="삭제"
            onClick={handleDelete}
            width="100%"
          />
          <Button
            variant="cancel"
            text="닫기"
            onClick={onClose}
            width="100%"
          />
        </S.ButtonGroup>
      </S.Container>
    </Modal>
  );
}

