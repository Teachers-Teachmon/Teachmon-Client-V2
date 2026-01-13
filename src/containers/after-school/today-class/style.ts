import styled from '@emotion/styled';
import { fontSizes, colors } from '@/styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h2`
  font-size: ${fontSizes.H2};
  font-weight: 600;
  color: ${colors.text};
`;

export const ClassList = styled.div`
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
