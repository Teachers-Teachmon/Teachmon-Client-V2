import styled from '@emotion/styled';
import { colors } from '@/styles/theme';
import { mq } from '@/styles/media';

export const TableContainer = styled.div`
    flex: 1;
    border: 1px solid #eaecf0;
    border-radius: 16px;
    background-color: ${colors.background};
    display: flex;
    flex-direction: column;
    max-height: 100%;
    overflow-y: auto;
    
    ${mq.mobile} {
        display: none;
    }
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
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

    &:first-of-type {
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

    &:first-of-type {
        padding-left: 40px;
    }

    &:last-child {
        text-align: right;
        padding-right: 40px;
        max-width: none;
        width: auto;
        white-space: nowrap;
        overflow: visible;
        flex-shrink: 0;
    }
`;

// 모바일 카드 스타일
export const MobileCardContainer = styled.div`
    display: none;
    
    ${mq.mobile} {
        display: flex;
        flex-direction: column;
        gap: 12px;
        overflow-y: auto;
        flex: 1;
        padding-bottom: 80px;
    }
`;

export const MobileCard = styled.div<{ $clickable?: boolean }>`
    background: ${colors.background};
    border: 1px solid #eaecf0;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    
    ${({ $clickable }) =>
        $clickable &&
        `
        cursor: pointer;
        transition: all 0.2s;

        &:active {
            background-color: #f9f9f9;
            transform: scale(0.98);
        }
    `}
`;

export const MobileCardRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 8px 0;
    border-bottom: 1px solid #f5f5f5;
    min-height: 40px;
    
    &:last-of-type {
        border-bottom: none;
    }
`;

export const MobileCardLabel = styled.span`
    font-size: 13px;
    font-weight: 500;
    color: ${colors.primaryGray};
    flex-shrink: 0;
    min-width: 80px;
`;

export const MobileCardValue = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.text};
    text-align: right;
    word-break: break-word;
`;

export const MobileCardActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding-top: 8px;
`;

export const EmptyMessage = styled.div`
    text-align: center;
    padding: 60px 20px;
    color: #aaa;
    font-size: 16px;
`;
