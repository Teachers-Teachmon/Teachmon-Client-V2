import styled from '@emotion/styled';
import { colors } from '../../styles/theme';
import { mq } from '@/styles/media';

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

  ${mq.mobile} {
    padding: 16px;
    padding-top: 16px;
    grid-template-rows: auto 1fr;
    gap: 16px;
  }
`;

export const Header = styled.div<{ isMapEnabled?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: ${({ isMapEnabled }) => isMapEnabled ? 'flex-start' : 'center'};
  position: relative;
  z-index: 1;
  ${mq.mobile}{
    align-items: flex-start;
  }
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-end;
  position: relative;
  z-index: 1;
`;

export const ClassGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;

  ${mq.mobile} {
    grid-template-columns: 1fr;
    gap: 12px;
    padding-bottom: 100px;
  }
`;

export const SearchContainer = styled.div`
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
  position: relative;
  width: 300px;
  z-index: 100;
  border-radius: 8px;
  overflow: hidden;

  ${mq.mobile} {
    width: 100%;
  }
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

export const HamburgerButton = styled.button`
  display: none;

  ${mq.mobile} {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 8px 12px;
    width: 40px;
    height: 40px;
    background: ${colors.background};
    border: 1px solid ${colors.n02};
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
    padding: 0;
    z-index: 10;
    position: relative;

    &:hover {
      background-color: ${colors.primary100};
    }

    &:active {
      background-color: ${colors.primary200};
    }

    img {
      width: 24px;
      height: 24px;
    }
  }
`;