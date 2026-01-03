import type { InputHTMLAttributes } from "react";

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
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
