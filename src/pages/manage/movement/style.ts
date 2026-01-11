import styled from '@emotion/styled';
import { colors } from '@/styles/theme';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 40px;
`;

export const Title = styled.h1`
    font-size: 32px;
    font-weight: 700;
    color: ${colors.text};
`;
