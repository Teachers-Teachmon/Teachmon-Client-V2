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

export const ModalMessage = styled.div`
  font-size: 1.125rem;
  line-height: 1.6;
  text-align: center;
  color: #666;
  min-width: 180px;
`;

export const ModalHighlight = styled.span`
  color: ${colors.primary};
  font-weight: 600;
  font-size: 1.25rem;
`;

export const StyledButton = styled.div`
  width: 180px;
`;
