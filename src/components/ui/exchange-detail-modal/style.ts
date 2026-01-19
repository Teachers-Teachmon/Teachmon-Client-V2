import styled from '@emotion/styled';
import { colors } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Container = styled.div`
  width: 43.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mq.mobile} {
    width: 100%;
    align-items: stretch;
    padding: 0.5rem;
  }
`;

export const Title = styled.h2`
  font-size: 2.3rem;
  font-weight: 500;
  color: ${colors.n04};
  margin-bottom: 1.5rem;

  ${mq.mobile} {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
  }
`;

export const StatusText = styled.span<{ status: 'rejected' | 'accepted' }>`
  color: ${(props) => (props.status === 'rejected' ? colors.subcolor : colors.primary)};
`;

export const CardsContainer = styled.div`
  display: flex;
  gap: 3.8rem;
  margin-bottom: 1.5rem;

  ${mq.mobile} {
    flex-direction: row;
    gap: 0.6rem;
    margin-bottom: 1rem;
  }
`;

export const Card = styled.div`
  width: 16.1rem;
  padding: 1.6rem 1.8rem;
  border: 0.33px solid #969696;
  border-radius: 0.3rem;
  background: white;

  ${mq.mobile} {
    width: calc(50% - 0.3rem);
    padding: 1rem 1.1rem;
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.n04};
  margin-bottom: 0.6rem;

  ${mq.mobile} {
    font-size: 1.1rem;
  }
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export const InfoIcon = styled.img`
  width: 1.2rem;
  height: 1.2rem;

  ${mq.mobile} {
    width: 1rem;
    height: 1rem;
  }
`;

export const InfoText = styled.span`
  font-size: 1rem;
  color: #969696;

  ${mq.mobile} {
    font-size: 0.9rem;
  }

  ${mq.mobile} {
    font-size: 0.9rem;
  }
`;

export const ReasonSection = styled.div`
  width: 82%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 1.5rem;

  ${mq.mobile} {
    width: 100%;
    margin-bottom: 1rem;
  }

  ${mq.mobile} {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

export const ReasonLabel = styled.label`
  font-size: 1.3rem;
  font-weight: 500;
  color: ${colors.n04};

  ${mq.mobile} {
    font-size: 1rem;
  }
`;

export const ReasonBox = styled.div`
  width: 100%;
  height: 11.7rem;
  padding: 0.6rem 0.8rem;
  border: 0.5px solid #969696;
  border-radius: 0.3rem;
  background: white;

  ${mq.mobile} {
    height: 8.5rem;
  }

  ${mq.mobile} {
    height: 8.5rem;
  }
`;

export const ReasonText = styled.p`
  font-size: 1rem;
  color: #969696;
  font-weight: 300;

  ${mq.mobile} {
    font-size: 0.9rem;
  }

  ${mq.mobile} {
    font-size: 0.9rem;
  }
`;

export const ReasonInput = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  outline: none;
  font-size: 1rem;
  color: ${colors.n04};
  font-weight: 300;
  font-family: inherit;

  &::placeholder {
    color: #969696;
  }

  ${mq.mobile} {
    font-size: 0.9rem;
  }

  ${mq.mobile} {
    font-size: 0.9rem;
  }
`;

export const ButtonContainer = styled.div`
  width: 82%;
  display: flex;
  gap: 0.9rem;

  ${mq.mobile} {
    width: 100%;
    flex-direction: row;
    gap: 0.6rem;
  }
`;
