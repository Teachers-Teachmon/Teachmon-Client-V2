import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';
import type { ExchangeStatus } from '@/types/supervision';
import { mq } from '@/styles/media';

export const SectionCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  min-height: 0;

  ${mq.mobile} {
    gap: 8px;
  }
`;

export const SectionTitle = styled.h3`
  font-size: clamp(20px, 2vw, 32px);
  color: ${colors.n04};
  font-weight: 500;

  ${mq.mobile} {
    font-size: 20px;
  }
`;

export const SectionContent = styled.div`
  border: 0.33px solid #969696;
  border-radius: ${radius.md};
  flex: 1;
  overflow: hidden;
  padding: 15px;
  display: flex;
  flex-direction: column;

  ${mq.mobile} {
    padding: 12px;
  }
`;

export const EmptyMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: ${colors.n03};
  font-size: ${fontSizes.Body};
`;

export const ExchangeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 7px 0;
  margin-bottom: 14px;

  ${mq.mobile} {
    display: none;
  }
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

  ${mq.mobile} {
    gap: 12px;
  }
`;

export const ExchangeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  ${mq.mobile} {
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
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

  ${mq.mobile} {
    max-width: none;
    width: 100%;
    padding: 8px 10px;
    min-height: 56px;
  }
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

  ${mq.mobile} {
    width: 42px;
    flex-direction: column;
    justify-content: center;
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
