import styled from '@emotion/styled';
import { mq } from '@/styles/media';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-bottom: 16px;

  ${mq.mobile} {
    width: 100%;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px 8px;
    overflow: visible;

    & > button {
      width: auto;
      flex: 0 0 auto;
      padding: 8px 12px;
    }
  }
`;
