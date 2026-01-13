import styled from '@emotion/styled';

export const MapContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const MapWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const Element = styled.div<{ 
    $top: number; 
    $left: number; 
    $width: number; 
    $height: number; 
    $background: string; 
    $cursor?: boolean;
}>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: ${(props) => props.$top}%;
    left: ${(props) => props.$left}%;
    width: ${(props) => props.$width}%;
    height: ${(props) => props.$height}%;
    background: ${(props) => props.$background};
    cursor: ${(props) => props.$cursor ? "pointer" : null};
    font-weight: 550;
    font-size: 10px;
    border: 1px solid black;
    text-align: center;
`;
