import styled from '@emotion/styled';
import { colors } from '@/styles/theme';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    padding: 40px;
    position: relative;
`;

export const TopSection = styled.div`
    position: absolute;
    top: 40px;
    left: 40px;
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
  height: 38px;
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

export const MapContainer = styled.div`
    flex: 1;
    position: relative;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
`;

export const ZoomControls = styled.div`
  position: absolute;
  bottom: 30px;
  left: 30px;
  display: flex;
  align-items: center;
  z-index: 10;
  gap: 8px;
`;

export const ZoomButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52px;
  height: 52px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  background-color: white;
  border: none;
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const ZoomPercentage = styled.div`
    width: 124px;
    height: 52px;
    background-color: #ffffff;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    
    span {
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        font-size: 20px;
        color: #000000;
    }
`;

export const MapContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const MapWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const Element = styled.div<{ 
    $top: number; 
    $left: number; 
    $width: number; 
    $height: number; 
    $background: string; 
    $cursor?: boolean;
}>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: ${(props) => props.$top}%;
    left: ${(props) => props.$left}%;
    width: ${(props) => props.$width}%;
    height: ${(props) => props.$height}%;
    background: ${(props) => props.$background};
    cursor: ${(props) => props.$cursor ? "pointer" : null};
    font-weight: 550;
    font-size: 10px;
    border: 1px solid black;
    text-align: center;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 24px;
`;

export const BackButton = styled.button`
    flex: 1;
    height: 45px;
    background-color: #f3f3f3;
    border: none;
    border-radius: 10px;
    font-family: 'Paperlogy', sans-serif;
    font-weight: 600;
    font-size: 18px;
    line-height: 21.2px;
    color: #999999;
    cursor: pointer;
    
    &:hover {
        background-color: #e8e8e8;
    }
`;

export const CompleteButton = styled.button<{ disabled?: boolean }>`
    flex: 1;
    height: 45px;
    background-color: ${({ disabled }) => (disabled ? '#cccccc' : '#2e6ff2')};
    border: none;
    border-radius: 8px;
    font-family: 'Paperlogy', sans-serif;
    font-weight: 600;
    font-size: 18px;
    line-height: 21.2px;
    color: #ffffff;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    
    &:hover {
        background-color: ${({ disabled }) => (disabled ? '#cccccc' : '#2558c9')};
    }
`;
