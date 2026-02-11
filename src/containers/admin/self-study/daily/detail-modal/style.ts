import styled from '@emotion/styled';
import { fontSizes, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 400px;

  ${mq.mobile} {
    min-width: auto;
    width: 100%;
    max-width: 100vw;
    gap: 1.5rem;
  }
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

  ${mq.mobile} {
    font-size: ${fontSizes.H4};
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  ${mq.mobile} {
    gap: 1rem;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  ${mq.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const Label = styled.div`
  font-size: ${fontSizes.Body};
  font-weight: 600;
  color: #666;
  min-width: 80px;

  ${mq.mobile} {
    min-width: auto;
    font-size: ${fontSizes.Small};
  }
`;

export const Value = styled.div`
  font-size: ${fontSizes.Body};
  color: #000;

  ${mq.mobile} {
    font-size: ${fontSizes.Small};
    word-break: break-word;
  }
`;

export const GradeBadge = styled.div<{ $bgColor: string; $textColor: string }>`
  padding: 0.5rem 1rem;
  background: ${props => props.$bgColor};
  color: ${props => props.$textColor};
  border-radius: ${radius.sm};
  font-size: ${fontSizes.Body};
  font-weight: 600;
  border: 1px solid ${props => props.$textColor}40;

  ${mq.mobile} {
    padding: 0.4rem 0.8rem;
    font-size: ${fontSizes.Small};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;

  & > button {
    width: 100% !important;
  }

  ${mq.mobile} {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const DeleteIcon = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: auto;
`;

