import styled from '@emotion/styled';
import { colors, fontSizes } from '@/styles/theme';

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 47px;
`;

export const Title = styled.h2`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 500;
  font-size: 36px;
  line-height: normal;
  color: ${colors.text};
  text-align: center;
  margin: 0;
`;

export const FormSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const DateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

export const DateSeparator = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 500;
  font-size: ${fontSizes.Body};
  color: #999999;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 23px;
  width: 100%;
`;

