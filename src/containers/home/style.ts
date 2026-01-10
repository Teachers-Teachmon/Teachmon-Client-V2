import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';
import type { ExchangeStatus } from '@/types/home';

export const EmptyMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: ${colors.n03};
  font-size: ${fontSizes.Body};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  height: 100%;
  padding: 48px;
  box-sizing: border-box;
  overflow: hidden;
`;

export const TopSection = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  height: 50%;
  min-height: 320px;
  flex-shrink: 0;
`;

export const WelcomeCard = styled.div<{ bgImage: string }>`
  flex: 2;
  position: relative;
  height: 100%;
  border-radius: ${radius.md};
  overflow: hidden;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url(${(props) => props.bgImage});
    background-size: cover;
    background-position: center;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
  }
`;

export const WelcomeContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const WelcomeTitle = styled.h1`
  font-size: clamp(24px, 3vw, 48px);
  color: ${colors.n01};
  font-weight: 500;
`;

export const WelcomeBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 16px;
`;

export const WelcomeMessage = styled.p`
  font-size: clamp(18px, 2vw, 32px);
  color: ${colors.n01};
  font-weight: 500;
`;

export const SupervisionCount = styled.p`
  font-size: clamp(14px, 1.5vw, 24px);
  color: ${colors.n01};
  font-weight: 500;
`;

export const QuickLinkCard = styled.div`
  position: relative;
  width: 32%;
  min-width: 320px;
  height: 100%;
  border-radius: ${radius.md};
  background: linear-gradient(128.66deg, ${colors.primary} 0%, #1B408C 100%);
  padding: 32px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.02);
  }
`;

export const QuickLinkHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`;

export const QuickLinkTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const QuickLinkTitle = styled.h2`
  font-size: clamp(20px, 2vw, 32px);
  color: ${colors.n01};
  font-weight: 500;
  white-space: nowrap;
`;

export const QuickLinkDescription = styled.p`
  font-size: clamp(12px, 1.2vw, 18px);
  color: ${colors.n01};
  font-weight: 500;
`;

export const ArrowButton = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const PencilIcon = styled.div`
  position: absolute;
  left: 20px;
  bottom: 20px;

  img {
    width: clamp(120px, 14vw, 180px);
    height: clamp(120px, 14vw, 180px);
    object-fit: contain;
  }
`;

export const BottomSection = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  flex: 1;
  min-height: 160px;
`;

export const SectionCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  min-height: 0;
`;

export const SectionTitle = styled.h3`
  font-size: clamp(20px, 2vw, 32px);
  color: ${colors.n04};
  font-weight: 500;
`;

export const SectionContent = styled.div`
  border: 0.33px solid #969696;
  border-radius: ${radius.md};
  flex: 1;
  overflow: hidden;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

export const ExchangeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 7px 0;
  margin-bottom: 14px;
`;

export const ExchangeHeaderText = styled.span`
  flex: 1;
  max-width: 320px;
  text-align: center;
  font-size: clamp(14px, 1.2vw, 20px);
  color: ${colors.n04};
  font-weight: 500;
`;

export const ExchangeHeaderSpacer = styled.div`
  width: 50px;
  flex-shrink: 0;
`;

export const ExchangeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex: 1;
  overflow-y: auto;
`;

export const ExchangeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const getStatusColor = (status: ExchangeStatus) => {
  switch (status) {
    case 'REJECTED':
      return colors.subcolor;
    case 'ACCEPTED':
      return colors.primary;
    default:
      return colors.n01;
  }
};

const getStatusTextColor = (status: ExchangeStatus) => {
  return status === 'PENDING' ? colors.n04 : colors.n01;
};

export const ExchangeItem = styled.div<{ status: ExchangeStatus }>`
  flex: 1;
  max-width: 320px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 0.5px solid #969696;
  background: ${(props) => getStatusColor(props.status)};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

export const ExchangeItemLabel = styled.span<{ status: ExchangeStatus }>`
  font-size: clamp(12px, 1vw, 16px);
  color: ${(props) => getStatusTextColor(props.status)};
  text-align: center;
`;

export const ExchangeItemText = styled.span<{ status: ExchangeStatus }>`
  font-size: clamp(12px, 1.1vw, 18px);
  color: ${(props) => getStatusTextColor(props.status)};
  text-align: center;
`;

export const ExchangeIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 50px;
  flex-shrink: 0;

  img {
    width: 28px;
    height: 28px;
  }
`;

export const ExchangeIconLabel = styled.span`
  font-size: 10px;
  color: #606060;
  white-space: nowrap;
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
  }
`;

export const DepartureGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  overflow-y: auto;
`;

export const DepartureRow = styled.div`
  display: flex;
  gap: 16px;
`;

export const DepartureItem = styled.div`
  flex: 1;
  max-width: calc(50% - 8px);
  min-height: 80px;
  border: 0.7px solid ${colors.subcolor};
  border-radius: ${radius.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
`;

export const DepartureDate = styled.span`
  font-size: clamp(14px, 1.2vw, 20px);
  color: ${colors.n04};
  font-weight: 500;
`;

export const DepartureInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

export const DepartureName = styled.span`
  font-size: clamp(14px, 1.1vw, 18px);
  color: ${colors.n04};
`;

export const DepartureTime = styled.span`
  font-size: clamp(14px, 1.1vw, 18px);
  color: ${colors.n04};
`;