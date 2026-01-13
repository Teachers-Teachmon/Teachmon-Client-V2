import styled from '@emotion/styled';

export const PageContainer = styled.div`
  padding: 3rem;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
`;

export const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2rem;
  height: 100%;
  overflow: hidden;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11rem;
  overflow-y: auto;
  height: 100%;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;
