import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 24px 32px;
  box-sizing: border-box;
  overflow: hidden;
  gap: 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  width: 391px;
  padding: 8px 16px;
  border: 1px solid #999;
  border-radius: ${radius.md};
  box-sizing: border-box;
`;

export const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-family: 'Paperlogy', sans-serif;
  font-weight: 400;
  font-size: ${fontSizes.Body};
  color: ${colors.n04};
  background: transparent;

  &::placeholder {
    color: #858585;
  }
`;

export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;
