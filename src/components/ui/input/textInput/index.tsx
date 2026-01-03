import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import * as S from "./style";

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  customPadding?: string;
  customFontSize?: string;
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