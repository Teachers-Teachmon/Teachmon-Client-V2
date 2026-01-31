import { useRef, useState } from 'react';
import * as S from './style';

interface DateInputProps {
  label?: string; // (시작일, 종료일)
  value?: string; // (yyyy-mm-dd)
  onChange?: (value: string) => void;
  error?: string;
  helperText?: string;
}

export default function DateInput({ 
  label = '날짜', 
  value = '',
  onChange,
  error,
  helperText 
}: DateInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  const formatDate = (isoDate: string) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return '';
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const displayValue = formatDate(value);
  const hasError = !!error;

  return (
    <S.DateInputContainer>
      <S.InputWrapper $isFocused={isFocused || !!displayValue} $hasError={hasError}>
        <S.Label $isFocused={isFocused || !!displayValue}>{label}</S.Label>

        <S.StyledInput
          type="text"
          readOnly
          value={displayValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onClick={() => {
            const hiddenInput = hiddenInputRef.current;
            if (!hiddenInput) return;
            if (hiddenInput.showPicker) {
              hiddenInput.showPicker();
              return;
            }
            hiddenInput.click();
          }}
        />

        <S.HiddenDateInput
          ref={hiddenInputRef}
          type="date"
          value={value}
          onChange={handleDateChange}
        />
      </S.InputWrapper>
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      {!error && helperText && <S.HelperText>{helperText}</S.HelperText>}
    </S.DateInputContainer>
  );
}
