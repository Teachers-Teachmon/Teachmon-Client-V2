import styled from '@emotion/styled';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    padding: 40px;
    position: relative;
`;

export const BackButton = styled.button`
    position: absolute;
    top: 40px;
    left: 40px;
    width: 44px;
    height: 44px;
    background-color: #ffffff;
    border: none;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 24px;
    color: #000000;
    z-index: 11;
    transition: all 0.2s;
    
    &:hover {
        background-color: #f5f5f5;
    }
    
    &:active {
        transform: scale(0.95);
    }
`;

export const MapContainer = styled.div`
    flex: 1;
    position: relative;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 24px;
`;