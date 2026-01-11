import styled from '@emotion/styled';
import { colors } from '@/styles/theme';

export const StudentNames = styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
`;

export const StudentName = styled.span`
    font-size: clamp(14px, 1.3vw, 16px);
    font-weight: 500;
    color: ${colors.text};
`;

export const ActionButtons = styled.div`
    display: flex;
    gap: 12px;
    justify-content: flex-end;
`;
