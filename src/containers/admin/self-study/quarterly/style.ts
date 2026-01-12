import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
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
  overflow-x: auto;
`;

export const DayColumn = styled.div`
  flex: 1;
  min-width: 180px;
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
