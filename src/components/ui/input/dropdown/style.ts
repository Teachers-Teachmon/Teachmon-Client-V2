import styled from "@emotion/styled";
import { colors, zIndex, radius } from "@/styles/theme";

export const DropdownWrapper = styled.div<{ $width?: string }>`
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard', sans-serif;
  gap: 0.5rem;
  width: ${props => props.$width || '100%'};
  font-family: inherit;
`

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${colors.text};
  font-family: inherit;
`

export const DropdownContainer = styled.div<{ 
  $hasError?: boolean; 
  $disabled?: boolean;
  $isOpen?: boolean;
  $height?: string;
  $borderRadius?: string;
}>`
  position: relative;
  width: 100%;
  height: ${props => props.$height || '3rem'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-family: inherit;
  border: 1px solid ${props => props.$hasError ? colors.error : props.$isOpen ? colors.primary : colors.n02};
  border-radius: ${props => props.$borderRadius || radius.md};
  background-color: ${props => props.$disabled ? colors.primaryBackground : colors.background};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  user-select: none;
  opacity: ${props => props.$disabled ? '0.6' : '1'};
  
  &:hover {
    ${props => !props.$disabled && `
      border-color: ${props.$hasError ? colors.error : colors.primary};
    `}
  }
  
  ${props => props.$isOpen && !props.$hasError && `
    box-shadow: 0 0 0 3px ${colors.primary100};
  `}
  
  ${props => props.$hasError && `
    box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.1);
  `}
`

export const SelectedText = styled.p<{ $placeholder?: boolean }>`
  margin: 0;
  color: ${props => props.$placeholder ? colors.primaryGray : colors.text};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
`

export const ArrowIcon = styled.img<{ $isOpen?: boolean }>`
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  width: 20px;
  height: 20px;
`

export const DropdownMenu = styled.ul<{ 
  $maxHeight?: string;
  $borderRadius?: string;
}>`
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  right: 0;
  background-color: ${colors.background};
  border: 1px solid ${colors.n02};
  border-radius: ${props => props.$borderRadius || radius.md};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
  max-height: ${props => props.$maxHeight || '15rem'};
  overflow-y: auto;
  z-index: ${zIndex.dropdown};
  padding: 0.25rem;
  margin: 0;
  list-style: none;

  /* 기본: 스크롤바 숨김 */
  &::-webkit-scrollbar {
    width: 0;
  }

  /* hover 시 스크롤바 표시 */
  &:hover::-webkit-scrollbar {
    width: 6px;
  }

  &:hover::-webkit-scrollbar-track {
    background: transparent;
  }

  &:hover::-webkit-scrollbar-thumb {
    background: ${colors.n02};
    border-radius: 3px;
  }

  &:hover::-webkit-scrollbar-thumb:hover {
    background: ${colors.n03};
  }
`;

export const DropdownItem = styled.li<{ $selected?: boolean }>`
  padding: 0.625rem 0.75rem;
  cursor: pointer;
  border-radius: ${radius.sm};
  transition: background-color 0.15s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: ${colors.text};
  background-color: ${props => props.$selected ? colors.primary100 : 'transparent'};
  
  &:hover {
    background-color: ${props => props.$selected ? colors.primary200 : colors.primaryBackground};
  }
`

export const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: ${colors.error};
`

export const HelperText = styled.span`
  font-size: 0.75rem;
  color: ${colors.primaryGray};
`
