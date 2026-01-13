import { forwardRef } from "react";
import * as S from "./style";
import type { TextInputProps } from "@/types/input";

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      customPadding,
      customFontSize,
      customBorderRadius,
      customHeight,
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
          {leftIcon && <S.LeftIcon>{leftIcon}</S.LeftIcon>}
          <S.StyledInput
            ref={ref}
            $hasError={hasError}
            $padding={customPadding}
            $fontSize={customFontSize}
            $borderRadius={customBorderRadius}
            $height={customHeight}
            $hasLeftIcon={!!leftIcon}
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