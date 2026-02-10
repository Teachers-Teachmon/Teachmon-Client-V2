import styled from '@emotion/styled';
import { mq } from '@/styles/media';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #ffffff;
    padding: 40px;
    box-sizing: border-box;
    overflow: hidden;

    ${mq.mobile} {
        padding: 16px;
        padding-bottom: calc(8rem + 16px);
        padding-top: calc(2rem + 16px);
        height: auto;
        min-height: 100vh;
        overflow-y: auto;
    }
`;

export const ContentArea = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 24px;
    height: 100%;
    overflow: hidden;

    ${mq.mobile} {
        grid-template-rows: auto;
        gap: 16px;
        height: auto;
        overflow: visible;
    }
`;

export const Row = styled.div`
    display: grid;
    grid-template-columns: 3fr 2fr;
    height: 100%;
    min-height: 0;
    gap: 24px;
    align-items: stretch;

    ${mq.mobile} {
        grid-template-columns: 1fr;
        gap: 16px;
        height: auto;
        min-height: auto;
    }
`;
