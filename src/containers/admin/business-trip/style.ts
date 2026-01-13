import styled from '@emotion/styled';
import { colors, fontSizes } from '@/styles/theme';

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
