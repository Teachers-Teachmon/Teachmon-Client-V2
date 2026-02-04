import styled from '@emotion/styled';
import { fontSizes, colors, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${mq.mobile} {
    height: 19vh;
    min-height: 0;
    overflow: hidden;
  }
`;


export const Title = styled.h2`
  font-size: ${fontSizes.H3};
  font-weight: 600;
  color: ${colors.text};
  
  @media (max-width: 1400px) {
    font-size: ${fontSizes.H4};
  }
`;

export const ClassList = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;

  ${mq.mobile} {
    padding-bottom: 0.5rem;
    gap: 0.5rem;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: ${colors.n03};
  font-size: ${fontSizes.Body};
  text-align: center;
  flex: 1;
`;

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

  ${mq.mobile} {
    min-height: 120px;
    flex-shrink: 0;
    padding: 0.7rem;
  }
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

  ${mq.mobile} {
    font-size: 12px;
    padding: 0.25rem 0.5rem;
  }
`;

export const Subject = styled.h3`
  font-size: ${fontSizes.H4};
  font-weight: 600;
  color: ${colors.text};
  margin-top: 0.5rem;

  ${mq.mobile} {
    font-size: 12px;
    margin-top: 0.25rem;
  }
`;

export const Program = styled.p`
  font-size: ${fontSizes.Body};
  color: ${colors.n03};

  ${mq.mobile} {
    font-size: 12px;
  }
`;

export const TimeInfo = styled.p`
  font-size: ${fontSizes.Small};
  color: ${colors.primary};
  text-align: right;
  
  ${mq.mobile} {
    margin-right:0rem;
  }
`;

export const DateInfo = styled.p`
  font-size: ${fontSizes.Small};
  color: ${colors.n03};
  margin-top: auto;
  text-align: right;

  ${mq.mobile} {
    display: none;
  }
`;
