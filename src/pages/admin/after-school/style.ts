import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

export const PageContainer = styled.div`
  padding: 3rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;

  ${mq.mobile} {
    padding: 2rem;
    gap: 0rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  ${mq.mobile} {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  ${mq.mobile} {
    gap: 1.5rem;
  }
`;

export const QuarterDropdown = styled.div`
  width: 120px;
`;

export const HeaderButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  ${mq.mobile} {
    gap: 0.3rem;
  }
`;

export const GoogleSheetActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  width: 140px;
  background-color: transparent;
  color: ${colors.primary};
  border: 1px solid ${colors.primary};
  border-radius: ${radius.md};
  font-size: ${fontSizes.Body};
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;

  ${mq.mobile} {
    font-size: 12px;
    padding: 1rem 1rem;
  }
`;

export const DaySelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  ${mq.mobile} {
    gap: 0.3rem;
    margin-bottom: 1rem;
  }
`;

export const DayText = styled.div<{ $active: boolean }>`
  font-size: ${({ $active }) => ($active ? '1.5rem' : fontSizes.H4)};
  font-weight: ${({ $active }) => ($active ? 500 : 400)};
  color: ${({ $active }) => ($active ? colors.primary : colors.n03)};
  cursor: ${({ $active }) => ($active ? 'default' : 'pointer')};
  transition: color 0.2s;
  padding: 0.5rem 1rem;

  ${mq.mobile} {
    font-size: ${({ $active }) => ($active ? '1.3rem' : '1rem')};
    white-space: nowrap;
  }
`;

export const NavButton = styled.button`
  padding: 0.5rem 1rem;
  background: transparent;
  color: ${colors.primary};
  border: none;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    opacity: 0.7;
  }
`;

export const GradeTabs = styled.div`
  display: flex;
  gap: 0.1rem;
`;

export const GradeTab = styled.button<{ $active: boolean }>`
  padding: 0.6rem 1.5rem;
  background: transparent;
  color: ${({ $active }) => ($active ? colors.primary : colors.n03)};
  border: none;
  font-size: ${fontSizes.H4};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  cursor: pointer;
  transition: all 0.2s;

  ${mq.mobile} {
    font-size: 12px;
    white-space: nowrap;
    padding: 0.5rem 1rem;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
`;

export const TableRowHoverColor = '#f9f9f9';

export const TableWrapper = styled.div`
  flex: 1 1 0;
  min-height: 0;
  max-height: none;
  height: auto;
  margin-bottom: 2.5rem;
  border: 1px solid #eaecf0;
  border-radius: 18px;
  background: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  & > div {
    flex: 1 1 0;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 0;
    max-height: none;
    border-radius: 18px;
    background: #fff;
  }

  table {
    width: 100%;
  }

  th {
    &:nth-of-type(1) {
      width: 120px;
      min-width: 120px;
    }
    &:nth-of-type(2) {
      width: 100px;
      min-width: 100px;
    }
    &:nth-of-type(3),
    &:nth-of-type(4) {
      width: auto;
      min-width: 150px;
    }
    &:nth-of-type(5) {
      width: auto;
      min-width: 0;
    }
    &:last-of-type {
      width: 220px;
      min-width: 220px;
    }
  }

  td {
    &:nth-of-type(1) {
      width: 120px;
      min-width: 120px;
      white-space: nowrap;
    }
    &:nth-of-type(2) {
      width: 100px;
      min-width: 100px;
      white-space: nowrap;
    }
    &:nth-of-type(3),
    &:nth-of-type(4) {
      word-wrap: break-word;
      word-break: break-word;
      white-space: normal;
      min-width: 150px;
    }
    &:nth-of-type(5) {
      width: auto;
      min-width: 0;
      overflow: hidden;
    }
    &:last-of-type {
      width: 220px;
      min-width: 220px;
      white-space: nowrap;
    }
  }

  ${mq.mobile} {
    max-height: 55vh;
  }
`;

export const AddButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 0 2.5rem 0;
  flex-shrink: 0;

  ${mq.mobile} {
    margin-top: -1rem;
  }
`;

export const StudentList = styled.div`
  display: flex;
  gap: 0.3rem;
  flex-wrap: nowrap;
  justify-content: flex-start;
  overflow: hidden;
  min-width: 0;
  white-space: nowrap;
  width: 100%;
`;

export const StudentBadge = styled.span`
  padding: 0.1rem 0.5rem;
  border-radius: ${radius.sm};
  font-size: 1rem;
  color: ${colors.text};
  white-space: nowrap;
  transition: background 0.2s, color 0.2s;
  cursor: pointer;
`;

export const MoreBadge = styled.span`
  color: ${colors.n03};
  font-size: 1.1rem;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`;

export const NoWrapCell = styled.span`
  white-space: nowrap;
  display: inline-block;
`;

export const WrapCell = styled.span`
  word-wrap: break-word;
  word-break: break-word;
  white-space: normal;
  display: inline-block;
`;
