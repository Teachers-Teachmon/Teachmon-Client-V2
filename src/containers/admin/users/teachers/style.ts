import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';

export const TableWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  font-size: ${fontSizes.H4};
  color: ${colors.n03};
`;

export const ActionCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  position: relative;
`;

export const KebabButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  img {
    width: 20px;
    height: 20px;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${colors.background};
  border: 1px solid #cccccc;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 122px;
`;

export const DropdownItem = styled.button<{ $danger?: boolean }>`
  display: block;
  width: 100%;
  padding: 15px 22px;
  text-align: left;
  background: transparent;
  border: none;
  font-size: ${fontSizes.Body};
  color: ${({ $danger }) => ($danger ? colors.subcolor : colors.text)};
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

export const EditButtonGroup = styled.div`
  display: flex;
  gap: 15px;
`;
