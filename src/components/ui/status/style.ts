import styled from '@emotion/styled';
import { STATUS_CONFIG, type StatusType } from '@/constants/status';

export const BadgeContainer = styled.div<{ $status: StatusType }>`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    background: ${({ $status }) => STATUS_CONFIG[$status].background};
    border-radius: 20px;
    width: fit-content;
`;

export const Dot = styled.div<{ $status: StatusType }>`
    width: 7px;
    height: 7px;
    background: ${({ $status }) => STATUS_CONFIG[$status].dotColor};
    border-radius: 50%;
`;

export const Text = styled.span<{ $status: StatusType }>`
    font-family: 'Paperlogy', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: ${({ $status }) => STATUS_CONFIG[$status].textColor};
    line-height: 20px;
`;
