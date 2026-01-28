import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 420px;
  width: 100%;
  max-width: 520px;
  box-sizing: border-box;
  overflow-x: hidden;

  ${mq.mobile} {
    min-width: 0;
    width: 100%;
    max-width: 92vw;
    gap: 16px;
  }
`;

export const ModalTitle = styled.h2`
  font-size: ${fontSizes.H3};
  font-weight: 600;
  text-align: center;
  margin-bottom: 4px;

  ${mq.mobile} {
    font-size: ${fontSizes.H4};
  }
`;

export const ModalMessage = styled.p`
  font-size: ${fontSizes.Body};
  text-align: center;
  line-height: 1.8;
  color: ${colors.text};

  ${mq.mobile} {
    font-size: 14px;
    line-height: 1.6;
  }
`;

export const ModalDateText = styled.p`
  font-size: ${fontSizes.H4};
  text-align: center;
  color: ${colors.n04};
  margin-bottom: 8px;

  ${mq.mobile} {
    font-size: ${fontSizes.Body};
  }
`;

export const HighlightText = styled.span`
  color: ${colors.primary};
  font-weight: 600;
  font-size: ${fontSizes.H4};

  ${mq.mobile} {
    font-size: ${fontSizes.Body};
  }
`;

export const ModalButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;

  ${mq.mobile} {
    margin-top: 8px;
    flex-direction: row;
  }
`;

export const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  ${mq.mobile} {
    gap: 10px;
  }
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

  ${mq.mobile} {
    padding: 14px;
  }
`;

export const SelectionText = styled.span`
  font-size: ${fontSizes.Body};
  font-weight: 500;

  ${mq.mobile} {
    font-size: 14px;
  }
`;

export const DropdownSection = styled.div`
  margin-top: 8px;

  ${mq.mobile} {
    margin-top: 4px;
  }
`;

export const DropdownLabel = styled.label`
  font-size: ${fontSizes.Body};
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
`;
