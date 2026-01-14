import styled from '@emotion/styled';
import { fontSizes, colors } from '@/styles/theme';

export const Container = styled.div`
  padding: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: ${fontSizes.H3};
  font-weight: 600;
  color: ${colors.text};
`;

export const CalendarWrapper = styled.div`
  flex: 1;
  padding: 20px;
`;
