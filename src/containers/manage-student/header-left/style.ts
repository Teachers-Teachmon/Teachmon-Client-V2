import styled from '@emotion/styled';
import { colors } from '@/styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  pointer-events: auto;
`;

export const DateSection = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${colors.n01};
  }
`;

export const CalendarIcon = styled.img`
  width: 32px;
  height: 32px;
`;

export const DateText = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-size: clamp(18px, 1.8vw, 26px);
  font-weight: 600;
  color: ${colors.primaryGray};
  line-height: 1.2;
  user-select: none;
`;

export const PeriodText = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-size: clamp(18px, 1.8vw, 26px);
  font-weight: 600;
  color: ${colors.primaryGray};
  line-height: 1.2;
  user-select: none;
`;

export const DropdownIcon = styled.div`
  width: 20px;
  height: 12px;
  background: transparent;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 12px solid ${colors.primaryGray};
  cursor: pointer;
`;

export const GradeTabs = styled.div`
  display: flex;
  gap: 0;
`;

export const GradeTab = styled.button<{ $isSelected: boolean }>`
  width: 80px;
  height: 38px;
  background: ${colors.background};
  border: none;
  border-bottom: 2px solid ${(props) => props.$isSelected ? colors.primary : 'transparent'};
  font-family: 'Paperlogy', sans-serif;
  font-size: clamp(18px, 1.6vw, 24px);
  font-weight: 500;
  color: ${(props) => props.$isSelected ? colors.primary : colors.primaryGray};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${colors.primary};
    color: ${colors.primary};
  }
`;
