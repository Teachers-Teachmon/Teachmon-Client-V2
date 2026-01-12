import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';

export const Card = styled.div`
  background: ${colors.background};
  border: 1px solid ${colors.n02};
  border-radius: ${radius.lg};
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
  min-height: 250px;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const QuarterBadge = styled.span`
  background: ${colors.primary};
  color: ${colors.background};
  font-size: ${fontSizes.Body};
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border-radius: ${radius.full};
  width: fit-content;
`;

export const Subject = styled.h3`
  font-size: ${fontSizes.H4};
  font-weight: 600;
  color: ${colors.text};
  margin-top: 0.5rem;
`;

export const Program = styled.p`
  font-size: ${fontSizes.Body};
  color: ${colors.n03};
`;

export const TimeInfo = styled.p`
  font-size: ${fontSizes.Small};
  color: ${colors.primary};
  text-align: right;
`;

export const DateInfo = styled.p`
  font-size: ${fontSizes.Small};
  color: ${colors.n03};
  margin-top: auto;
  text-align: right;
`;
