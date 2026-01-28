import styled from '@emotion/styled';
import { colors, fontSizes } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 48px;
  box-sizing: border-box;
  overflow: hidden;

  ${mq.mobile} {
    height: 100dvh;
    padding: 12px;
    overflow: hidden;
  }
`;

export const HeaderRow = styled.div<{ $isQuarterly: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ $isQuarterly }) => ($isQuarterly ? '24px' : '0')};

  ${mq.mobile} {
    flex-direction: row;
    align-items: center;
    gap: 8px;
    margin-bottom: ${({ $isQuarterly }) => ($isQuarterly ? '16px' : '0')};
  }
`;

export const TabContainer = styled.div<{ $isQuarterly: boolean }>`
  display: flex;
  gap: 24px;
  margin-bottom: 0;
  flex: 1;

  ${mq.mobile} {
    gap: 16px;
    margin-bottom: 0;
  }
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: 8px 0;
  font-size: ${fontSizes.H4};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ $active }) => ($active ? colors.primary : colors.n03)};
  background: none;
  border: none;
  border-bottom: ${({ $active }) => ($active ? `2px solid ${colors.primary}` : '2px solid transparent')};
  cursor: pointer;
  transition: all 0.2s ease;

  ${mq.mobile} {
    font-size: ${fontSizes.Body};
  }

  &:hover {
    color: ${({ $active }) => ($active ? colors.primary : colors.text)};
  }
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;

  ${mq.mobile} {
    width: auto;

    & > button {
      flex: 0 0 auto;
      padding: 8px 12px;
    }

    & > button span {
      font-size: 14px;
    }
  }
`;

export const PlaceholderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: ${fontSizes.H3};
  color: ${colors.n03};
`;
