import styled from '@emotion/styled';
import { colors } from '@/styles/theme';

export const TableContainer = styled.div`
    flex: 1;
    border: 1px solid #eaecf0;
    border-radius: 16px;
    overflow: hidden;
    background-color: ${colors.background};
    display: flex;
    flex-direction: column;
    max-height: 100%;
    overflow-y: auto;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const TableHead = styled.thead`
    position: sticky;
    top: 0;
    z-index: 1;
`;

export const TableRow = styled.tr<{ $clickable?: boolean }>`
    border-bottom: 1px solid #eaecf0;

    &:last-child {
        border-bottom: none;
    }

    thead & {
        background-color: #f9f9f9;
    }

    ${({ $clickable }) =>
        $clickable &&
        `
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background-color: #f9f9f9;
        }
    `}
`;

export const TableHeader = styled.th`
    padding: 16px 20px;
    text-align: left;
    font-size: clamp(12px, 1.1vw, 14px);
    font-weight: 500;
    color: ${colors.primaryGray};
    height: 56px;

    &:first-child {
        padding-left: 40px;
    }

    &:last-child {
        padding-right: 40px;
    }
`;

export const TableCell = styled.td`
    padding: 16px 20px;
    font-size: clamp(14px, 1.3vw, 16px);
    font-weight: 500;
    color: ${colors.text};
    vertical-align: middle;
    min-height: 72px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    &:first-child {
        padding-left: 40px;
    }

    &:last-child {
        text-align: right;
        padding-right: 40px;
    }
`;
