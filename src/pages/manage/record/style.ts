import styled from '@emotion/styled';
import { colors } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 32px 54px;
    background-color: ${colors.background};
    ${mq.mobile}{
        padding: 32px 16px;
    }
`;
