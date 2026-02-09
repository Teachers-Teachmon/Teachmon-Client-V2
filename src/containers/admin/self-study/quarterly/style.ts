import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;

  ${mq.mobile} {
    padding-bottom: max(env(safe-area-inset-bottom), 16px);
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  ${mq.mobile} {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    margin-bottom: 16px;
  }
`;

export const FilterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  ${mq.mobile} {
    width: 100%;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

export const QuarterDropdownWrapper = styled.div`
  width: 100px;

  ${mq.mobile} {
    width: 110px;
  }
`;

export const GradeButtonGroup = styled.div`
  display: flex;
  gap: 8px;

  ${mq.mobile} {
    flex-wrap: wrap;
  }
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

  ${mq.mobile} {
    flex: 1;
    min-width: 0;
    padding: 8px 12px;
  }
`;

export const ScheduleContainer = styled.div`
  display: flex;
  gap: 16px;
  flex: 1;
  min-height: 0;
  overflow-x: auto;

  ${mq.mobile} {
    flex-direction: column;
    flex: none;
    overflow: visible;
    gap: 12px;
    padding-bottom: max(env(safe-area-inset-bottom), 80px);
  }
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 8px;

  ${mq.mobile} {
    width: 100%;

    & > button {
      flex: 1;
    }
  }
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

  ${mq.mobile} {
    min-width: 100%;
    min-height: 320px;
    flex: none;
    height: auto;
    overflow: visible;
  }
`;

export const DayHeader = styled.div`
  padding: 16px;
  font-size: ${fontSizes.H3};
  font-weight: 600;
  text-align: center;
  background: ${colors.background};
  border-bottom: 1px solid ${colors.n02};

  ${mq.mobile} {
    font-size: ${fontSizes.H4};
    padding: 12px;
  }
`;

export const PeriodSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px;
  background: ${colors.background};
  min-height: 0;

  ${mq.mobile} {
    padding: 12px;
    min-height: 140px;
    flex: none;
  }
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
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;
  touch-action: manipulation;

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

  ${mq.mobile} {
    overflow-y: visible;
    flex: none;
    padding-right: 0;
    overscroll-behavior: auto;
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
