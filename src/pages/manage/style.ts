import styled from '@emotion/styled';
import { colors } from '../../styles/theme';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 5%;
  padding-top: 4%;
  background: ${colors.background};
  position: relative;
  display: grid;
  grid-template-rows: 0.8fr 6fr;
  gap: 20px;
`;

export const Header = styled.div<{ isMapEnabled?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: ${({ isMapEnabled }) => isMapEnabled ? 'flex-start' : 'center'};
  position: relative;
  z-index: 1;
  pointer-events: none;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-end;
  position: relative;
  z-index: 1;
  pointer-events: auto;
`;

export const ClassGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`;

export const SearchContainer = styled.div`
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
  position: relative;
  width: 300px;
  z-index: 100;
  border-radius: 8px;
  overflow: hidden;
`;

export const SearchInputWrapper = styled.div`
  width: 100%;
`;

export const SearchResults = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
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

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  font-size: 18px;
  color: ${colors.n04};
  text-align: center;
`;