import styled from '@emotion/styled';
import { colors, radius, fontSizes } from '@/styles/theme';

export const TableWrapper = styled.div`
  background: ${colors.background};
  border-radius: ${radius.lg};
  overflow: hidden;
`;

export const ActionCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const StudentList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
`;

export const StudentTag = styled.span`
  padding: 0.25rem 0.5rem;
  background-color: ${colors.primaryBackground};
  color: ${colors.text};
  border-radius: ${radius.sm};
  font-size: ${fontSizes.Small};
  white-space: nowrap;
`;
