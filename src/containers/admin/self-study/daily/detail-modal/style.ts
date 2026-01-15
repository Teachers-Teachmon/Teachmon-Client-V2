import styled from '@emotion/styled';
import { fontSizes, radius } from '@/styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 400px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: ${fontSizes.H3};
  font-weight: 600;
  margin: 0;
  color: #000;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Label = styled.div`
  font-size: ${fontSizes.Body};
  font-weight: 600;
  color: #666;
  min-width: 80px;
`;

export const Value = styled.div`
  font-size: ${fontSizes.Body};
  color: #000;
`;

export const GradeBadge = styled.div<{ $bgColor: string; $textColor: string }>`
  padding: 0.5rem 1rem;
  background: ${props => props.$bgColor};
  color: ${props => props.$textColor};
  border-radius: ${radius.sm};
  font-size: ${fontSizes.Body};
  font-weight: 600;
  border: 1px solid ${props => props.$textColor}40;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;

  & > button {
    width: 100% !important;
  }
`;

export const DeleteIcon = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: auto;
`;

