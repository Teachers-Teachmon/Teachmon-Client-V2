import styled from '@emotion/styled';
import { colors } from '@/styles/theme';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TabWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

export const TabContainer = styled.div`
  display: flex;
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: 15px 20px;
  font-family: 'Paperlogy', sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: ${({ $active }) => ($active ? colors.primary : colors.primaryGray)};
  background: transparent;
  border: none;
  border-bottom: ${({ $active }) => ($active ? `2px solid ${colors.primary}` : 'none')};
  cursor: pointer;
  transition: all 0.2s;
`;
