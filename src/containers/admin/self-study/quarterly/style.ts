import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const FilterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const QuarterDropdownWrapper = styled.div`
  width: 100px;
`;

export const GradeButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const GradeButton = styled.button<{ $active: boolean }>`
  padding: 8px 20px;
  font-size: ${fontSizes.Body};
  font-weight: 500;
  color: ${({ $active }) => ($active ? colors.background : colors.primary)};
  background: ${({ $active }) => ($active ? colors.primary : colors.background)};
  border: 1px solid ${colors.primary};
  border-radius: ${radius.full};
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: ${({ $active }) => ($active ? colors.primary : colors.primary100)};
  }
`;

export const ScheduleContainer = styled.div`
  display: flex;
  gap: 16px;
  flex: 1;
  min-height: 0;
  overflow-x: auto;
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const DayColumn = styled.div`
  flex: 1;
  min-width: 180px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.n02};
  border-radius: ${radius.md};
  overflow: hidden;
`;

export const DayHeader = styled.div`
  padding: 16px;
  font-size: ${fontSizes.H3};
  font-weight: 600;
  text-align: center;
  background: ${colors.background};
  border-bottom: 1px solid ${colors.n02};
`;

export const PeriodSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px;
  background: ${colors.background};
  min-height: 0;
`;

export const PeriodHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const PeriodLabel = styled.span`
  font-size: ${fontSizes.Body};
  font-weight: 500;
  color: ${colors.text};
`;

export const AddButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

export const PeriodList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 4px;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: ${colors.n03} transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.n02};
    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${colors.n03};
  }
`;

export const PeriodRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PeriodDropdownWrapper = styled.div`
  flex: 1;
`;

export const RemoveButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;
