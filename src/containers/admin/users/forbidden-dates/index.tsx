import { useState } from 'react';
import Modal from '@/components/layout/modal';
import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/input/checkbox';
import { WEEKDAYS } from '@/constants/admin';
import * as S from './style';

interface ForbiddenDatesProps {
  teacherName: string;
  initialDates: string[];
  onSave: (dates: string[]) => void;
  onCancel: () => void;
}

export default function ForbiddenDates({
  teacherName,
  initialDates,
  onSave,
  onCancel,
}: ForbiddenDatesProps) {
  const [selectedDays, setSelectedDays] = useState<string[]>(initialDates);

  const handleToggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSave = () => {
    onSave(selectedDays);
  };

  return (
    <Modal isOpen={true} onClose={onCancel} padding="60px 81px">
      <S.Content>
        <S.Title>{teacherName} 선생님 금지날짜</S.Title>

        <S.DaysGrid>
          {WEEKDAYS.map((day) => (
            <S.DayItem
              key={day}
              $selected={selectedDays.includes(day)}
              onClick={() => handleToggleDay(day)}
            >
              <Checkbox
                checked={selectedDays.includes(day)}
                onChange={() => handleToggleDay(day)}
              />
              <S.DayLabel $selected={selectedDays.includes(day)}>{day}</S.DayLabel>
            </S.DayItem>
          ))}
        </S.DaysGrid>

        <S.ButtonGroup>
          <Button text="취소" variant="cancel" onClick={onCancel} />
          <Button text="저장" variant="confirm" onClick={handleSave} />
        </S.ButtonGroup>
      </S.Content>
    </Modal>
  );
}
