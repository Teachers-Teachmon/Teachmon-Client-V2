import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';

export const Title = styled.h2`
  font-size: ${fontSizes.H3};
  font-weight: 600;
  text-align: center;
  margin-bottom: 8px;
`;

export const DateText = styled.p`
  font-size: ${fontSizes.H4};
  text-align: center;
  color: ${colors.n04};
  margin-bottom: 20px;
`;

export const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SelectionBox = styled.div<{ isSelected: boolean }>`
  padding: 20px;
  border: 1px solid ${({ isSelected }) => (isSelected ? colors.primary : colors.n02)};
  border-radius: ${radius.md};
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? colors.primary100 : 'transparent')};
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${colors.primary};
  }
`;

export const SelectionText = styled.span`
  font-size: ${fontSizes.Body};
  font-weight: 500;
`;

export const Label = styled.label`
  font-size: ${fontSizes.Body};
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
`;

export const DropdownContainer = styled.div`
  margin-top: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;
