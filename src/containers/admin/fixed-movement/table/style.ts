import styled from '@emotion/styled';
import { colors, radius, fontSizes } from '@/styles/theme';
import { mq } from '@/styles/media';

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
  width: 400px;
  gap: 0.5rem;
`;

export const StudentList = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
  align-items: center;

  ${mq.mobile} {
    flex-wrap: wrap;
  }
`;

export const StudentTag = styled.span`
  padding: 0.25rem 0.5rem;
  background-color: ${colors.primaryBackground};
  color: ${colors.text};
  border-radius: ${radius.sm};
  font-size: ${fontSizes.Small};
  white-space: nowrap;
`;
