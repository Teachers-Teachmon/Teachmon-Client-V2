import styled from '@emotion/styled';
import { colors, radius } from '@/styles/theme';

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
