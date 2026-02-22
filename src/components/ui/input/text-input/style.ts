import { colors } from "@/styles/theme";
import styled from "@emotion/styled";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  font-family: 'Paperlogy', sans-serif;
  color: ${colors.n04};
`

export const InputContainer = styled.div<{ $hasError?: boolean; $disabled?: boolean }>`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  
  ${props => props.$disabled && `
    opacity: 0.6;
    cursor: not-allowed;
  `}
`

export const LeftIcon = styled.div`
  position: absolute;
  left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  color: ${colors.n03};
  z-index: 1;
`;

// e5e7eb
export const StyledInput = styled.input<{ 
  $hasError?: boolean;
  $padding?: string;
  $fontSize?: string;
  $borderRadius?: string;
  $height?: string;
  $hasLeftIcon?: boolean;
}>`
  width: 100%;
  height: ${props => props.$height || '3rem'};
  padding: ${props => props.$hasLeftIcon ? '0.75rem 1rem 0.75rem 3rem' : props.$padding || '0.75rem 1rem'};
  font-size: ${props => props.$fontSize || '1rem'};
  font-family: 'Paperlogy', sans-serif;
  border: 1px solid ${props => props.$hasError ? '#ef4444' : colors.n03};
  border-radius: ${props => props.$borderRadius || '0.5rem'};
  outline: none;
  transition: all 0.2s ease;
  background-color: white;
  
  &::placeholder {
    color: ${colors.n03};
    font-family: 'Paperlogy', sans-serif;
  }
  
  &:focus {
    border-color: ${props => props.$hasError ? '#ef4444' : '#3b82f6'};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)'};
  }
  
  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
`

export const ErrorMessage = styled.span`
  font-size: 0.75rem;
  font-family: 'Paperlogy', sans-serif;
  color: #ef4444;
`

export const HelperText = styled.span`
  font-size: 0.75rem;
  font-family: 'Paperlogy', sans-serif;
  color: #6b7280;
`