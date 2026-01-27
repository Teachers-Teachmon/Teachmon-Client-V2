import styled from '@emotion/styled';
import { colors } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 5;
  position: relative;
  pointer-events: auto;
`;

export const HintText = styled.div`
  position: absolute;
  top: -40px;
  left: 0;
  font-family: 'Paperlogy', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #FF4444;
  background: #FFFFFF;
  padding: 8px 16px;
  border-radius: 20px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.08);
  ${mq.mobile}{
    top: auto;
    bottom: -40px;
    height: min-content;
    width: max-content;
  }
`;

export const Title = styled.h2`
  font-family: 'Paperlogy', sans-serif;
  font-size: clamp(18px, 1.8vw, 26px);
  font-weight: 600;
  color: ${colors.text};
  line-height: 1.2;
`;

export const FloorTabs = styled.div`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
  gap: 0;
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
  ${mq.mobile}{
    width: 60px;
  }
`;
