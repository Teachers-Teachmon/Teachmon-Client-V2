import styled from '@emotion/styled';

export const PageContainer = styled.div`
  padding: 3rem;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  min-width: 320px;
  
  @media (max-width: 1400px) {
    padding: 2rem;
  }
  
  @media (max-width: 1024px) {
    padding: 1.5rem;
    overflow-y: auto;
  }
`;

export const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2rem;
  height: 100%;
  overflow: hidden;
  
  @media (max-width: 1400px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    overflow-y: auto;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11rem;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  
  @media (max-width: 1600px) {
    gap: 6rem;
  }
  
  @media (max-width: 1400px) {
    gap: 3rem;
  }
  
  @media (max-width: 1200px) {
    gap: 2rem;
  }
  
  @media (max-width: 1024px) {
    gap: 2rem;
    height: auto;
    overflow: visible;
  }
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  min-height: 0;
  
  @media (max-width: 1024px) {
    height: auto;
    margin-top: 2rem;
  }
`;
