import styled from '@emotion/styled';
import { colors, fontSizes } from '@/styles/theme';
import { mq } from '@/styles/media';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 450px;

  ${mq.mobile} {
    min-width: 0;
    width: 100%;
    gap: 16px;
  }
`;

export const ModalTitle = styled.h2`
  font-size: ${fontSizes.H3};
  font-weight: 600;
  text-align: center;

  ${mq.mobile} {
    font-size: ${fontSizes.H4};
  }
`;

export const DateRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  & > div {
    flex: 1;
    min-width: 0;
  }

  ${mq.mobile} {
    flex-direction: row;
    align-items: center;
    gap: 8px;
    flex-wrap: nowrap;
  }
`;

export const DateSeparator = styled.span`
  font-size: ${fontSizes.H4};
  color: ${colors.n03};
  flex: 0 0 auto;

  ${mq.mobile} {
    display: inline;
  }
`;

export const ModalButtonGroup = styled.div`
  display: flex;
  gap: 12px;

  ${mq.mobile} {
    flex-direction: row;
  }
`;
