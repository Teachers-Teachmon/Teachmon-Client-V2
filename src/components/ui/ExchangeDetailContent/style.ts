import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';

export const Container = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 36px;
  font-weight: 500;
  color: ${colors.n04};
  margin-bottom: 24px;
`;

export const StatusText = styled.span<{ status: 'rejected' | 'accepted' }>`
  color: ${(props) => (props.status === 'rejected' ? colors.subcolor : colors.primary)};
`;

export const CardsContainer = styled.div`
  display: flex;
  gap: 60px;
  margin-bottom: 24px;
`;

export const Card = styled.div`
  width: 258px;
  padding: 26px 28px;
  border: 0.33px solid #969696;
  border-radius: 5px;
  background: white;
`;

export const CardTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.n04};
  margin-bottom: 10px;
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const InfoIcon = styled.img`
  width: 19px;
  height: 19px;
`;

export const InfoText = styled.span`
  font-size: 16px;
  color: #969696;
`;

export const ReasonSection = styled.div`
  width: 576px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 24px;
`;

export const ReasonLabel = styled.label`
  font-size: 20px;
  font-weight: 500;
  color: ${colors.n04};
`;

export const ReasonBox = styled.div`
  width: 100%;
  height: 187px;
  padding: 9px 12px;
  border: 0.5px solid #969696;
  border-radius: 4px;
  background: white;
`;

export const ReasonText = styled.p`
  font-size: 16px;
  color: #969696;
  font-weight: 300;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 14px;
`;

export const Button = styled.button<{ variant: 'primary' | 'secondary' }>`
  width: 245px;
  height: 45px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s ease;

  background: ${(props) => (props.variant === 'primary' ? colors.primary : '#f3f3f3')};
  color: ${(props) => (props.variant === 'primary' ? colors.n01 : '#999')};

  &:hover {
    opacity: 0.9;
  }
`;
