import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';

export const PageContainer = styled.div`
  padding: 2rem 3rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

export const Title = styled.h1`
  font-size: ${fontSizes.H2};
  font-weight: 600;
  color: ${colors.text};
`;

export const CalendarWrapper = styled.div`
  flex: 1;
  background: ${colors.background};
  border-radius: ${radius.lg};
  padding: 2rem;
  width: 100%;
`;
