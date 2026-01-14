import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: 0;
  flex: 1;
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h2`
  font-size: ${fontSizes.H3};
  font-weight: 600;
  color: ${colors.text};
  
  @media (max-width: 1400px) {
    font-size: ${fontSizes.H4};
  }
`;

export const GradeTabs = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const GradeTab = styled.button<{ $active: boolean }>`
  padding: 0.75rem 2rem;
  background: transparent;
  color: ${({ $active }) => ($active ? colors.primary : colors.n03)};
  border: none;
  font-size: ${fontSizes.H3};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  cursor: pointer;
  transition: all 0.2s;
  
  @media (max-width: 1024px) {
    padding: 0.5rem 1.5rem;
    font-size: ${fontSizes.Body};
  }
`;

export const Container = styled.div`
  background: ${colors.background};
  border: 1px solid ${colors.n02};
  border-radius: ${radius.lg};
  padding: 1rem 0;
  overflow-x: hidden;
  overflow-y: auto;
  min-width: 0;
  flex: 1;
  position: relative;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.n02};
    border-radius: 3px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${colors.n02};
  
  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td`
  padding: 1.25rem 0.75rem;
  vertical-align: middle;
  
  &:first-of-type {
    padding-left: 2rem;
  }
  
  &:last-child {
    position: relative;
    padding-right: 2rem;
    text-align: right;
    width: 80px;
    overflow: visible;
  }
  
  @media (max-width: 1024px) {
    padding: 1rem 0.5rem;
    
    &:first-of-type {
      padding-left: 1rem;
    }
    
    &:last-child {
      padding-right: 1rem;
    }
  }
`;

export const DayText = styled.span`
  font-size: ${fontSizes.H4};
  font-weight: 400;
  color: ${colors.text};
`;

export const TimeTag = styled.span`
  background: ${colors.primary100};
  color: ${colors.primary};
  padding: 0.5rem 1rem;
  border-radius: ${radius.md};
  font-size: ${fontSizes.Body};
  font-weight: 400;
  white-space: nowrap;
`;

export const ClassText = styled.span`
  font-size: ${fontSizes.H4};
  font-weight: 400;
  color: ${colors.text};
`;

export const ProgramText = styled.span`
  font-size: ${fontSizes.H4};
  color: ${colors.text};
  font-weight: 400;
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 20px;
    height: 20px;
  }
`;

export const MenuDropdown = styled.div<{ $openUp?: boolean }>`
  position: absolute;
  right: 0.5rem;
  ${({ $openUp }) => $openUp ? `
    bottom: 100%;
    margin-bottom: 0;
  ` : `
    top: 100%;
    margin-top: -0.5rem;
  `}
  background: ${colors.background};
  border: 1px solid ${colors.n02};
  border-radius: ${radius.md};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
  min-width: 80px;
`;

export const MenuItem = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  text-align: left;
  font-size: ${fontSizes.Small};
  color: ${colors.text};
  cursor: pointer;
  white-space: nowrap;
  
  &:hover {
    color: ${colors.primary};
  }
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: ${colors.n03};
  font-size: ${fontSizes.Body};
  text-align: center;
  min-height: 200px;
`;
