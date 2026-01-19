import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';
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

export const DepartureGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  overflow-y: auto;

  ${mq.mobile} {
    gap: 12px;
  }
`;

export const DepartureRow = styled.div`
  display: flex;
  gap: 16px;

  ${mq.mobile} {
    flex-direction: column;
  }
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

  ${mq.mobile} {
    max-width: none;
    min-height: 72px;
    padding: 10px 12px;
  }
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
