import styled from '@emotion/styled';
import { colors, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  align-items: center;
  background: rgba(221, 231, 255, 0.1);
  border: 1px solid #E8EFFF;
  border-radius: ${radius.md};
  padding: 32px 24px;
  overflow: visible;
  ${mq.mobile}{
    padding: 24px 12px;
  }
`;

export const ClassTitle = styled.h3`
  font-family: 'Paperlogy', sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: ${colors.text};
  line-height: 20px;
  text-align: center;
  ${mq.mobile}{
    font-size: 24px;
  }
`;

export const StudentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0;
  width: 100%;
  height: 70%;
  overflow: visible;

  ${mq.mobile}{
    height: 80%;
  }
`;

export const StudentCard = styled.div<{
  $stateColor?: string;
  $stateBgColor?: string;
  $hasState?: boolean;
}>`
  width: 100%;
  height: 100%;
  background: ${({ $stateBgColor }) => $stateBgColor || colors.background};
  border: 1px solid ${({ $stateColor }) => $stateColor || '#F5F5F5'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: ${({ $hasState }) => $hasState !== false ? 'pointer' : 'default'};
  transition: all 0.2s;
  position: relative;
  padding: 8px 4px;

  &:hover {
    border-color: ${({ $stateColor, $hasState }) => $hasState !== false ? ($stateColor || colors.primary) : $stateColor};
    filter: brightness(0.95);
  }
`;

export const StudentNumber = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-size: clamp(12px, 1.2vw, 18px);
  font-weight: 500;
  color: ${colors.text};
  line-height: 1.2;
  text-align: center;
`;

export const StudentName = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-size: clamp(11px, 1.1vw, 15px);
  font-weight: 500;
  color: ${colors.text};
  line-height: 1.3;
  text-align: center;
`;

export const StatusPopupContainer = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: ${colors.background};
  border: 1px solid #EBF1FF;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  width: max-content;
  min-width: 80px;
`;

export const StatusBadgeWrapper = styled.div`
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const StateLabel = styled.span<{ $color: string }>`
  font-family: 'Paperlogy', sans-serif;
  font-size: clamp(9px, 0.9vw, 12px);
  font-weight: 600;
  color: ${({ $color }) => $color};
  line-height: 1.2;
  text-align: center;
  margin-top: 2px;
`;

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${colors.text};
  font-size: 14px;
  opacity: 0.5;
`;
