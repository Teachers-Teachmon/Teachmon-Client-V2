import styled from '@emotion/styled';
import { mq } from '@/styles/media';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  height: 100%;
  padding: 48px;
  box-sizing: border-box;
  overflow: hidden;

  ${mq.mobile} {
    padding: 20px 16px 92px;
    gap: 16px;
    overflow: visible;
  }
`;

export const TopSection = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  height: 50%;
  min-height: 320px;
  flex-shrink: 0;

  ${mq.mobile} {
    flex-direction: column;
    height: auto;
    min-height: 0;
    gap: 16px;
  }
`;

export const BottomSection = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  flex: 1;
  min-height: 160px;

  ${mq.mobile} {
    flex-direction: column;
    min-height: 0;
    gap: 16px;
  }
`;
