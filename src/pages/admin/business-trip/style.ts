import styled from '@emotion/styled';
import { mq } from '@/styles/media';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 48px;
  box-sizing: border-box;
  overflow: hidden;

  ${mq.mobile} {
    padding: 12px;
    overflow: visible;
  }
`;
