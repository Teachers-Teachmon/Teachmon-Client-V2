import styled from '@emotion/styled';
import { mq } from '@/styles/media';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px 28px 24px;
  box-sizing: border-box;
  overflow: hidden;

  ${mq.mobile} {
    padding: 12px;
    gap: 12px;
    overflow: visible;
  }
`;
