import { useState } from 'react';
import * as S from './style';

interface DateInputProps {
  label?: string; // 라벨 이름 바꿀 수 있음(ex 시작일, 종료일)
}

export default function DateInput({ label = '날짜' }: DateInputProps) {
  const today = new Date();
  const todayISO = today.toISOString().split('T')[0];
  const formattedToday = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  const [dateValue, setDateValue] = useState(todayISO);
  const [inputValue, setInputValue] = useState(formattedToday);
  const [isFocused, setIsFocused] = useState(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isoValue = e.target.value;
    const newDate = new Date(isoValue);
    if (isNaN(newDate.getTime())) return;

    const formatted = `${newDate.getFullYear()}년 ${newDate.getMonth() + 1}월 ${newDate.getDate()}일`;

    setDateValue(isoValue);
    setInputValue(formatted);
  };

  return (
    <S.DateInputContainer>
      <S.InputWrapper $isFocused={isFocused || !!inputValue}>
        <S.Label $isFocused={isFocused || !!inputValue}>{label}</S.Label>

        <S.StyledInput
          type="text"
          readOnly
          value={inputValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onClick={(e) =>
            (e.currentTarget.nextSibling as HTMLInputElement)?.showPicker()
          }
        />

        <S.HiddenDateInput type="date" value={dateValue} onChange={handleDateChange} />
      </S.InputWrapper>
    </S.DateInputContainer>
  );
}
