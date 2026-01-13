import styled from '@emotion/styled';
import { colors } from '@/styles/theme';

export const Container = styled.div`
    position: absolute;
    top: 40px;
    left: 104px;
    right: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    z-index: 10;
    pointer-events: none;
    
    > * {
        pointer-events: auto;
    }
`;

export const FloorSelector = styled.div`
    display: flex;
    background-color: #ffffff;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const FloorTab = styled.button<{ $isSelected: boolean }>`
  width: 80px;
  height: 44px;
  background: #FFFFFF;
  border: none;
  border-bottom: 2px solid ${(props) => props.$isSelected ? colors.primary : 'transparent'};
  font-family: 'Paperlogy', sans-serif;
  font-size: clamp(14px, 1.6vw, 18px);
  font-weight: 500;
  color: ${(props) => props.$isSelected ? colors.primary : colors.primaryGray};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${colors.primary};
    color: ${colors.primary};
  }
`;

export const SearchWrapper = styled.div`
    width: 391px;
`;
