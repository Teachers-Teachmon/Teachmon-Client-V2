import styled from '@emotion/styled';
import { colors } from '../../../styles/theme';

type StatusType = '방과후' | '자습' | '이석' | '조퇴' | '결석' | '이탈' | '취소';

const statusConfig = {
    '방과후': {
        background: '#ECF3FD',
        dotColor: colors.primary,
        textColor: colors.primary,
    },
    '자습': {
        background: '#ECFDF3',
        dotColor: '#14BA6D',
        textColor: '#037847',
    },
    '이석': {
        background: '#F0ECFD',
        dotColor: '#6A1EC1',
        textColor: '#6A1EC1',
    },
    '조퇴': {
        background: '#FFF6E4',
        dotColor: '#FF9000',
        textColor: '#FF9000',
    },
    '결석': {
        background: '#FDF0EC',
        dotColor: colors.subcolor,
        textColor: colors.subcolor,
    },
    '이탈': {
        background: '#FFEBEA',
        dotColor: colors.exit,
        textColor: colors.exit,
    },
    '취소': {
        background: '#F5F5F5',
        dotColor: '#9CA4BA',
        textColor: '#9CA4BA',
    },
};

export const BadgeContainer = styled.div<{ $status: StatusType }>`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    background: ${({ $status }) => statusConfig[$status].background};
    border-radius: 20px;
    width: fit-content;
`;

export const Dot = styled.div<{ $status: StatusType }>`
    width: 7px;
    height: 7px;
    background: ${({ $status }) => statusConfig[$status].dotColor};
    border-radius: 50%;
`;

export const Text = styled.span<{ $status: StatusType }>`
    font-family: 'Paperlogy', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: ${({ $status }) => statusConfig[$status].textColor};
    line-height: 20px;
`;
