import styled from '@emotion/styled';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #ffffff;
    padding: 24px;
    box-sizing: border-box;
    overflow: hidden;
`;

export const ContentArea = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 24px;
    height: 100%;
    overflow: hidden;
`;

export const Row = styled.div`
    display: flex;
    height: 100%;
    min-height: 0;
    gap: 24px;
    align-items: stretch;
`;
