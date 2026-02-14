import styled from '@emotion/styled';
import { fontSizes, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem 0;

  ${mq.mobile} {
    padding: 0;
  }
`;

export const DateGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const DateHeader = styled.div`
  font-size: ${fontSizes.H4};
  font-weight: 600;
  color: #000;
  margin-bottom: 0.5rem;
`;

export const ScheduleItem = styled.div<{ $bgColor: string; $textColor: string }>`
  padding: 1rem;
  background: ${props => props.$bgColor};
  border-radius: ${radius.md};
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid ${props => props.$textColor}20;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const ScheduleContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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

export const PeriodsText = styled.div`
  font-size: ${fontSizes.Body};
  color: #000;
  font-weight: 500;
`;

export const EmptyState = styled.div`
  padding: 3rem;
  text-align: center;
  color: #999;
  font-size: ${fontSizes.Body};
`;

