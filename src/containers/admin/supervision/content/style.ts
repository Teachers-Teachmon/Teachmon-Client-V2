import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';
import { SUPERVISION_EDITOR_HEIGHT, SUPERVISION_EDITOR_WIDTH } from '@/constants/adminSupervision';
import { slideInLeft, slideOutLeft } from '@/styles/animations';
import { mq } from '@/styles/media';

export const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  gap: 16px;
  overflow: hidden;

  ${mq.mobile} {
    flex-direction: column;
    gap: 12px;
    overflow: visible;
  }
`;

export const SidePanel = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 400px;
  height: 100dvh;
  background: ${colors.background};
  border-right: 1px solid ${colors.n02};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 100;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  animation: ${({ $isClosing }) => $isClosing ? slideOutLeft : slideInLeft} 0.3s ease-out forwards;
  padding-bottom: max(env(safe-area-inset-bottom), 12px);

  ${mq.mobile} {
    width: 100%;
    overscroll-behavior: contain;
  }
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

  ${mq.mobile} {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

export const SearchInputWrapper = styled.div`
  flex: 1;
  width: 100%;
`;

export const SortButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  ${mq.mobile} {
    flex-direction: row;
    justify-content: flex-end;
    gap: 8px;
  }
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

  ${mq.mobile} {
    margin: 0 12px 12px;
  }
`;

export const TableBody = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  ${mq.mobile} {
    overflow-x: auto;
  }
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

  ${mq.mobile} {
    margin: 0 12px 8px;
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

  ${mq.mobile} {
    width: 100%;
  }
`;

export const EditTitle = styled.h3`
  font-size: ${fontSizes.Body};
  font-weight: 400;
  color: ${colors.text};
`;

export const EnterHint = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: ${colors.error};
  margin-top: 4px;
`;

export const FloatingEditor = styled.div<{ $top: number; $left: number }>`
  position: fixed;
  top: ${({ $top }) => `${$top}px`};
  left: ${({ $left }) => `${$left}px`};
  width: ${SUPERVISION_EDITOR_WIDTH}px;
  min-height: ${SUPERVISION_EDITOR_HEIGHT}px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border: 1px solid ${colors.n02};
  border-radius: ${radius.sm};
  background: ${colors.background};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 120;

  ${mq.mobile} {
    position: fixed;
    top: 12%;
    left: 50%;
    width: min(90vw, 360px);
    transform: translateX(-50%);
  }
`;
