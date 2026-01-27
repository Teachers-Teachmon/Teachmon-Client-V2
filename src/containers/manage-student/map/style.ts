import styled from '@emotion/styled';
import { colors } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;

  ${mq.mobile} {
    position: relative;
  }
`;

export const ZoomControls = styled.div`
  position: fixed;
  bottom: 30px;
  left: 17%;
  display: flex;
  align-items: center;
  z-index: 10;
  gap: 10px;

  ${mq.mobile} {
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const ZoomButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  padding: 4px 6px;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
  background-color: white;
  border: none;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background: #F5F8FF;
  }

  &:active {
    transform: scale(0.95);
  }

  ${mq.mobile} {
    width: 36px;
    height: 36px;
  }
`;

export const MapContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px 6%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  ${mq.mobile} {
    padding: 20px 4%;
  }
`;

export const FloorLabel = styled.h3`
  font-family: 'Paperlogy', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: ${colors.text};
`;

export const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${mq.mobile}{
    top: 65%;
  }
`;
export const Element = styled.div<{ $top: number; $left: number; $width: number; $height: number; $background: string; $cursor?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: ${(props)=>props.$top}%;
    left: ${(props)=>props.$left}%;
    width: ${(props)=>props.$width}%;
    height: ${(props)=>props.$height}%;
    background: ${(props)=>props.$background};
    cursor: ${(props)=>props.$cursor ? "pointer" : null};
    font-weight: 550;
    font-size: 10px;
    border: 1px solid black;
    text-align: center;
    ${mq.mobile}{
      font-size: 4px;
      height: ${(props)=>props.$height/2}%;
      top: ${(props)=>props.$top/2}%;
      border: 0.5px solid black;
    }
`