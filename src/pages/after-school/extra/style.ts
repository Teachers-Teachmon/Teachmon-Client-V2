import styled from '@emotion/styled';
import { fontSizes, colors } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Container = styled.div`
  padding: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;

  ${mq.mobile} {
    padding: 12px;
    gap: 12px;
  }
`;

export const Title = styled.h1`
  font-size: ${fontSizes.H3};
  font-weight: 600;
  color: ${colors.text};

  ${mq.mobile} {
    font-size: ${fontSizes.H4};
  }
`;

export const CalendarWrapper = styled.div`
  flex: 1;
  padding: 20px;

  ${mq.mobile} {
    padding: 12px;
  }
`;
