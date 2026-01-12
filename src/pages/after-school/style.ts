import styled from '@emotion/styled';
import { colors, fontSizes } from '@/styles/theme';

export const PageContainer = styled.div`
  padding: 3rem;
  height: 100%;
  overflow: hidden;
`;

export const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2rem;
  height: calc(100vh - 7rem);
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7rem;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TodaySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SectionTitle = styled.h2`
  font-size: ${fontSizes.H2};
  font-weight: 600;
  color: ${colors.text};
`;

export const TodayClassList = styled.div`
  display: flex;
  gap: 1rem;
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: ${colors.n03};
  font-size: ${fontSizes.Body};
  text-align: center;
`;
