import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 420px;
`;

export const ModalTitle = styled.h2`
  font-size: ${fontSizes.H3};
  font-weight: 600;
  text-align: center;
  margin-bottom: 4px;
`;

export const ModalMessage = styled.p`
  font-size: ${fontSizes.Body};
  text-align: center;
  line-height: 1.8;
  color: ${colors.text};
`;

export const ModalDateText = styled.p`
  font-size: ${fontSizes.H4};
  text-align: center;
  color: ${colors.n04};
  margin-bottom: 8px;
`;

export const HighlightText = styled.span`
  color: ${colors.primary};
  font-weight: 600;
  font-size: ${fontSizes.H4};
`;

export const ModalButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

export const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SelectionBox = styled.div<{ $isSelected: boolean; $isDisabled: boolean }>`
  padding: 20px;
  border: 1px solid ${({ $isSelected, $isDisabled }) => {
    if ($isDisabled) return colors.n02;
    return $isSelected ? colors.primary : colors.n02;
  }};
  border-radius: ${radius.md};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ $isSelected, $isDisabled }) => {
    if ($isDisabled) return colors.n02;
    return $isSelected ? colors.primary100 : 'transparent';
  }};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.6 : 1)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${({ $isDisabled, $isSelected }) => {
      if ($isDisabled) return colors.n02;
      return $isSelected ? colors.primary : colors.primary;
    }};
  }
`;

export const SelectionText = styled.span`
  font-size: ${fontSizes.Body};
  font-weight: 500;
`;

export const DropdownSection = styled.div`
  margin-top: 8px;
`;

export const DropdownLabel = styled.label`
  font-size: ${fontSizes.Body};
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
`;
