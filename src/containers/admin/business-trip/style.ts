import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

export const DropdownWrapper = styled.div`
  width: 250px;
`;

export const Title = styled.h1`
  font-size: ${fontSizes.H3};
  font-weight: 600;
  color: ${colors.text};
  margin-bottom: 16px;
`;

export const CalendarWrapper = styled.div`
  flex: 1;
`;

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

export const SelectionBox = styled.div<{ $isSelected: boolean }>`
  padding: 20px;
  border: 2px solid ${({ $isSelected }) => ($isSelected ? colors.primary : colors.n02)};
  border-radius: ${radius.md};
  cursor: pointer;
  background-color: ${({ $isSelected }) => ($isSelected ? colors.primary100 : 'transparent')};
  font-size: ${fontSizes.Body};
  font-weight: 500;
  text-align: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${colors.primary};
    background-color: ${({ $isSelected }) => ($isSelected ? colors.primary100 : colors.primary100)};
  }

  &:active {
    transform: scale(0.98);
  }
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
