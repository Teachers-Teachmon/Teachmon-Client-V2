import styled from '@emotion/styled';
import { colors, fontSizes } from '@/styles/theme';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 450px;
`;

export const ModalTitle = styled.h2`
  font-size: ${fontSizes.H3};
  font-weight: 600;
  text-align: center;
`;

export const DateRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const DateSeparator = styled.span`
  font-size: ${fontSizes.H4};
  color: ${colors.n03};
`;

export const ModalButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;
