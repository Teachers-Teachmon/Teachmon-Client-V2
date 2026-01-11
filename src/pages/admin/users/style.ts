import styled from '@emotion/styled';
import { colors, fontSizes } from '@/styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px 50px;
  height: 100%;
  box-sizing: border-box;
  position: relative;
`;

export const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 391px;
`;

export const SearchIcon = styled.img`
  position: absolute;
  left: 16px;
  width: 24px;
  height: 24px;
  z-index: 1;
`;

export const SortButton = styled.button`
  font-family: 'Paperlogy', sans-serif;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 0;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: ${fontSizes.Body};
  font-weight: 600;
  color: ${colors.primary};
`;

export const SortArrows = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ArrowUp = styled.span<{ $active?: boolean }>`
  font-size: 16px;
  color: ${({ $active }) => ($active ? colors.primary : colors.primaryGray)};
`;

export const ArrowDown = styled.span<{ $active?: boolean }>`
  font-size: 16px;
  color: ${({ $active }) => ($active ? colors.primary : colors.primaryGray)};
`;
