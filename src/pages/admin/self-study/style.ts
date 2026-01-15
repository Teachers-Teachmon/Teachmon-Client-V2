import styled from '@emotion/styled';
import { colors, fontSizes } from '@/styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 48px;
  box-sizing: border-box;
  overflow: hidden;
`;

export const TabContainer = styled.div<{ $isQuarterly: boolean }>`
  display: flex;
  gap: 24px;
  margin-bottom: ${({ $isQuarterly }) => ($isQuarterly ? '24px' : '0')};
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

  &:hover {
    color: ${({ $active }) => ($active ? colors.primary : colors.text)};
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
