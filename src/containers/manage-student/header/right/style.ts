import styled from '@emotion/styled';
import { colors } from '@/styles/theme';
import { mq } from '@/styles/media';

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-end;
  position: relative;
  z-index: 1;
`;

export const DatePeriodBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${colors.background};
  border: 1px solid ${colors.n02};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  &:hover {
    background-color: ${colors.primary100};
    border-color: ${colors.primary200};
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const BadgeIcon = styled.img`
  width: 16px;
  height: 16px;
  opacity: 0.7;
`;

export const BadgeText = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${colors.text};
  white-space: nowrap;
`;

export const SearchContainer = styled.div`
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
  position: relative;
  width: 300px;
  z-index: 100;
  border-radius: 8px;

  ${mq.mobile} {
    width: 100%;
  }
`;

export const SearchInputWrapper = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
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

export const HamburgerButton = styled.button<{ $isMapEnabled?: boolean }>`
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
    box-shadow: ${({ $isMapEnabled }) => $isMapEnabled ? '0 4px 12px 0 rgba(0, 0, 0, 0.08)' : 'none'};

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
