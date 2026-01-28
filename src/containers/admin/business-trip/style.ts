import styled from '@emotion/styled';
import { colors, fontSizes } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  
  ${mq.mobile} {
    gap: 12px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;

  ${mq.mobile} {
    justify-content: stretch;
    margin-bottom: 0;
  }
`;

export const DropdownWrapper = styled.div`
  width: 250px;

  ${mq.mobile} {
    width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: ${fontSizes.H3};
  font-weight: 600;
  color: ${colors.text};
  margin-bottom: 16px;

  ${mq.mobile} {
    font-size: ${fontSizes.H4};
    margin-bottom: 8px;
  }
`;

export const CalendarWrapper = styled.div`
  flex: 1;

  ${mq.mobile} {
    padding: 8px;
  }
`;
