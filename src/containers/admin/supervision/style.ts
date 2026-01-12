import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';
import { slideInLeft, slideOutLeft } from '@/styles/animations';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-bottom: 16px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  gap: 16px;
  overflow: hidden;
`;

export const SidePanel = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 400px;
  height: 100vh;
  background: ${colors.background};
  border-right: 1px solid ${colors.n02};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 100;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  animation: ${({ $isClosing }) => $isClosing ? slideOutLeft : slideInLeft} 0.3s ease-out forwards;
`;

export const SidePanelHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 12px 16px;
`;

export const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${colors.n03};
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${colors.text};
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px 16px;
`;

export const SearchInput = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 12px;
  border: 1px solid ${colors.n02};
  border-radius: ${radius.md};
  font-size: ${fontSizes.Body};
  outline: none;

  &:focus {
    border-color: ${colors.primary};
  }

  &::placeholder {
    color: ${colors.n03};
  }
`;

export const SortButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SortButton = styled.button<{ $active: boolean }>`
  padding: 4px 8px;
  font-size: 12px;
  color: ${({ $active }) => ($active ? colors.primary : colors.n03)};
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${colors.primary};
  }
`;

export const TableHeader = styled.div`
  display: flex;
  padding: 12px 16px;
  margin: 0 16px 12px;
  border-bottom: 2px solid ${colors.n03};
`;

export const TableBody = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const TableRow = styled.div`
  display: flex;
  padding: 16px;
  margin: 0 16px 8px;
  border: 1px solid ${colors.n02};
  border-radius: ${radius.md};

  &:hover {
    background: ${colors.primaryBackground};
  }

  &:last-child {
    margin-bottom: 16px;
  }
`;

export const TableCell = styled.div<{ $width: string }>`
  width: ${({ $width }) => $width};
  font-size: ${fontSizes.Body};
  color: ${colors.text};
  text-align: center;
`;

export const CalendarWrapper = styled.div<{ $hasSidePanel?: boolean }>`
  flex: 1;
  position: relative;
`;

export const EditTitle = styled.h3`
  font-size: ${fontSizes.Body};
  font-weight: 400;
  color: ${colors.text};
`;

export const FloatingEditor = styled.div<{ $top: number; $left: number }>`
  position: absolute;
  top: ${({ $top }) => `${$top}px`};
  left: ${({ $left }) => `${$left}px`};
  width: 240px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border: 1px solid ${colors.n02};
  border-radius: ${radius.sm};
  background: ${colors.background};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 20;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 450px;
`;

export const ModalTitle = styled.h2`
  font-size: ${fontSizes.H3};
  font-weight: 600;
  text-align: center;
`;

export const DateRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const DateSeparator = styled.span`
  font-size: ${fontSizes.H4};
  color: ${colors.n03};
`;

export const ModalButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;
