import styled from '@emotion/styled';
import { colors, zIndex } from '@/styles/theme';
import { fadeIn } from '@/styles/animations';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(116, 116, 116, 0.5);
  z-index: ${zIndex.overlay};
  animation: ${fadeIn} 0.2s ease-in-out;
`;

export const Container = styled.div`
  position: fixed;
  top: 70px;
  right: 26px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: ${zIndex.overlay + 1};
  animation: slideDown 0.3s ease-in-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 280px;
`;

export const SearchResults = styled.div`
  background: ${colors.background};
  border: 1px solid ${colors.n02};
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const SearchResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.primary100};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${colors.n02};
  }
`;

export const PlaceName = styled.span`
  font-size: 14px;
  color: ${colors.text};
`;

export const FloorBadge = styled.span`
  padding: 4px 8px;
  background-color: ${colors.primary200};
  color: ${colors.primary};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

