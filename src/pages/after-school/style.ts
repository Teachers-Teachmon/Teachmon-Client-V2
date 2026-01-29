import styled from '@emotion/styled';
import { mq } from '@/styles/media';

export const PageContainer = styled.div`
  padding: 3rem;
  height: 100vh;
  overflow: hidden;

  ${mq.mobile} {
    padding: 1rem;
    height: 100vh;
    overflow: hidden;
  }
`;

export const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2rem;
  height: 100%;
  overflow: hidden;

  ${mq.mobile} {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    overflow: hidden;
  }
`;


export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  height: 100%;
  min-height: 0;
  overflow: hidden;

  ${mq.mobile} {
    gap: 1rem;
    height: auto;
    overflow: visible;
  }
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;

  ${mq.mobile} {
    height: auto;
    overflow: visible;
  }
`;

