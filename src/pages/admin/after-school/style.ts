import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';

export const PageContainer = styled.div`
  padding: 3rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const LeftSection = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

export const QuarterDropdown = styled.div`
  width: 120px;
`;

export const HeaderButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
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
`;

export const DaySelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const DayText = styled.div<{ $active: boolean }>`
  font-size: ${({ $active }) => ($active ? '1.5rem' : fontSizes.H4)};
  font-weight: ${({ $active }) => ($active ? 500 : 400)};
  color: ${({ $active }) => ($active ? colors.primary : colors.n03)};
  cursor: ${({ $active }) => ($active ? 'default' : 'pointer')};
  transition: color 0.2s;
  padding: 0.5rem 1rem;
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
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: visible;
`;

export const TableRowHoverColor = '#f9f9f9';

export const TableWrapper = styled.div`
  flex: 1 1 auto;
  min-height: 700px;
  max-height: 700px;
  height: auto;
  margin-bottom: 2.5rem;
  border: 1px solid #eaecf0;
  border-radius: 18px;
  background: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  & > div,
  & > table {
    flex: 1 1 auto;
    overflow-y: auto;
    min-height: 700px;
    max-height: 700px;
    border-radius: 18px;
    background: #fff;
  }
`;

export const AddButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 0 2.5rem 0;
`;

export const StudentList = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: nowrap;
  justify-content: flex-start;
  overflow: hidden;
`;

export const StudentBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: ${radius.sm};
  font-size: ${fontSizes.Small};
  color: ${colors.text};
  white-space: nowrap;
  transition: background 0.2s, color 0.2s;
  cursor: pointer;
`;

export const MoreBadge = styled.span`
  color: ${colors.n03};
  font-size: ${fontSizes.Small};
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`;
