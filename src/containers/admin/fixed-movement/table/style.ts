import styled from '@emotion/styled';
import { colors, radius, fontSizes } from '@/styles/theme';

export const TableWrapper = styled.div`
  flex: 1;
  height: 100%;
  min-height: 0;
  background: transparent;
  padding: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: 1.5rem;
`;

export const ActionCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  flex-shrink: 0;
`;

export const StudentListContainer = styled.div<{ $isMobile?: boolean }>`
  width: 100%;
  overflow: ${({ $isMobile }) => ($isMobile ? 'visible' : 'hidden')};
  position: relative;
`;

export const StudentListInner = styled.div<{ $isMobile?: boolean }>`
  display: flex;
  flex-wrap: ${({ $isMobile }) => ($isMobile ? 'wrap' : 'nowrap')};
  gap: 0.5rem;
  align-items: center;
`;

export const HiddenMeasure = styled.div`
  position: absolute;
  visibility: hidden;
  pointer-events: none;
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
  white-space: nowrap;
`;

export const StudentTag = styled.span`
  padding: 0.25rem 0.5rem;
  background-color: ${colors.primaryBackground};
  color: ${colors.text};
  border-radius: ${radius.sm};
  font-size: ${fontSizes.Small};
  white-space: nowrap;
  flex-shrink: 0;
  pointer-events: none;
`;

export const MoreTag = styled.span`
  padding: 0.25rem 0.5rem;
  background-color: ${colors.primaryBackground};
  color: ${colors.text};
  border-radius: ${radius.sm};
  font-size: ${fontSizes.Small};
  white-space: nowrap;
  flex-shrink: 0;
  pointer-events: none;
`;
