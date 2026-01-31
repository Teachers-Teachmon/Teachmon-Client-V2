import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Container = styled.div`
  width: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;

  ${mq.mobile} {
    width: 100%;
    max-width: 90vw;
    max-height: 90vh;
  }
`;

export const Header = styled.div`
  padding: 2rem 2rem 1.5rem;

  ${mq.mobile} {
    padding: 1.5rem 1.5rem 1rem;
  }
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const TimeLabel = styled.div`
  font-size: ${fontSizes.H4};
  font-weight: 600;
  color: ${colors.primary};

  ${mq.mobile} {
    font-size: ${fontSizes.Body};
  }
`;

export const Title = styled.h2`
  font-size: ${fontSizes.Body};
  font-weight: 400;
  color: ${colors.text};
  margin: 0;

  ${mq.mobile} {
    font-size: ${fontSizes.Small};
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.7;
  }

  ${mq.mobile} {
    padding: 0.3rem;
  }
`;

export const CloseIcon = styled.span`
  font-size: 1.5rem;
  color: ${colors.n03};

  ${mq.mobile} {
    font-size: 1.2rem;
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 0rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
`;

export const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const InfoLabel = styled.div`
  font-size: ${fontSizes.H4};
  font-weight: 600;
  color: ${colors.n04};
`;

export const InfoValue = styled.div`
  font-size: ${fontSizes.Body};
  color: ${colors.text};
  padding: 0.3rem 0rem;
  background: ${colors.n01};
  border-radius: ${radius.sm};
`;

export const ClassLabel = styled.div`
  font-size: ${fontSizes.Body};
  font-weight: 600;
  color: ${colors.text};
  margin-top: 0.5rem;
`;

export const StudentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  ${mq.mobile} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const StudentCard = styled.div`
  padding: 0.8rem 2rem;
  background: ${colors.n01};
  border: 1px solid ${colors.n02};
  text-align: center;
`;

export const StudentInfo = styled.div`
  font-size: ${fontSizes.Small};
  color: ${colors.text};
`;