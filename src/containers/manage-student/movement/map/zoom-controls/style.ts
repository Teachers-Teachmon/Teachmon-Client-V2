import styled from '@emotion/styled';

export const Container = styled.div`
  position: absolute;
  bottom: 30px;
  left: 30px;
  display: flex;
  align-items: center;
  z-index: 10;
  gap: 8px;
`;

export const ZoomButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52px;
  height: 52px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  background-color: white;
  border: none;
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
  }

  &:active {
    transform: scale(0.95);
  }
`;
