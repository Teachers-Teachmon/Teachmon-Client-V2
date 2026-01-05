import styled from '@emotion/styled';
import { colors } from '@/styles/theme'

export const DateInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 260px;
  background: #fafafa;
  padding-top: 0.4rem;
`;

export const InputWrapper = styled.div<{ $isFocused?: boolean; $hasError?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid ${({ $isFocused, $hasError }) => 
    $hasError ? colors.subcolor : $isFocused ? colors.primary : '#ccc'};
  transition: border-color 0.2s ease-in-out;
  padding-top: 1rem;
`;

export const Label = styled.label<{ $isFocused?: boolean }>`
  position: absolute;
  top: ${({ $isFocused }) => ($isFocused ? '0px' : '24px')};
  left: 10px;
  font-size: ${({ $isFocused }) => ($isFocused ? '12px' : '18px')};
  color: ${({ $isFocused }) => ($isFocused ? colors.primary : '#999')};
  transition: all 0.15s ease-in-out;
  pointer-events: none;
`;

export const StyledInput = styled.input`
  font-size: 18px;
  font-weight: 500;
  border: none;
  outline: none;
  background: transparent;
  color: ${colors.text};
  padding: 5px 10px;
  width: 100%;
  cursor: pointer;
`;

export const HiddenDateInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

export const ErrorMessage = styled.p`
  color: ${colors.subcolor};
  font-size: 0.75rem;
  margin-top: 0.25rem;
  margin-left: 0.5rem;
`;

export const HelperText = styled.p`
  color: #666;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  margin-left: 0.5rem;
`;
