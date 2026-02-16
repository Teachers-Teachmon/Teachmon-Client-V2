import { useState, useMemo, useEffect } from 'react';
import Modal from '@/components/layout/modal';
import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/input/checkbox';

import { WEEKDAYS, DAY_MAP, REVERSE_DAY_MAP } from '@/constants/admin';
import type { ForbiddenDay } from '@/services/user-management/user-management.api';
import { useDevice } from '@/hooks/useDevice';

import * as S from './style';

interface ForbiddenDatesProps {
  teacherName: string;
  initialDates: ForbiddenDay[];
  onSave: (dates: string[]) => void;
  onCancel: () => void;
}

export default function ForbiddenDates({
  teacherName,
  initialDates,
  onSave,
  onCancel,
}: ForbiddenDatesProps) {
  // API 형식을 한글로 변환
  const initialKoreanDates = useMemo(() => {
    return initialDates.map(day => DAY_MAP[day]).filter(Boolean);
  }, [initialDates]);

  const [selectedDays, setSelectedDays] = useState<string[]>(initialKoreanDates);

  // initialDates가 변경되면 selectedDays도 업데이트
  useEffect(() => {
    setSelectedDays(initialKoreanDates);
  }, [initialKoreanDates]);
    
  const { isMobile } = useDevice();

  const handleToggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSave = () => {
    // 한글을 API 형식으로 변환
    const apiDates = selectedDays.map(day => REVERSE_DAY_MAP[day]).filter(Boolean);
    onSave(apiDates);
  };

  return (
    <Modal isOpen={true} onClose={onCancel} padding={isMobile ? "32px 40px" : "60px 80px"}>
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
