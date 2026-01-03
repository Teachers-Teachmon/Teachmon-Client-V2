import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import * as S from "./style";

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input 상단에 표시될 라벨 텍스트 */
  label?: string;
  /** 에러 메시지 (존재하면 빨간색 스타일 적용) */
  error?: string;
  /** Input 하단에 표시될 도움말 텍스트 */
  helperText?: string;
  
  // 스타일 커스텀
  customPadding?: string;
  customFontSize?: string;
  customBorderRadius?: string;
  customHeight?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      error,
      helperText,
      customPadding,
      customFontSize,
      disabled,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;

    return (
      <S.InputWrapper>
        {label && <S.Label>{label}</S.Label>}
        <S.InputContainer $hasError={hasError} $disabled={disabled}>
          <S.StyledInput
            ref={ref}
            $hasError={hasError}
            $padding={customPadding}
            $fontSize={customFontSize}
            disabled={disabled}
            {...props}
          />
        </S.InputContainer>
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        {!error && helperText && <S.HelperText>{helperText}</S.HelperText>}
      </S.InputWrapper>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;