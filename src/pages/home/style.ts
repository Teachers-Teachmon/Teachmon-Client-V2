import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  height: 100%;
  padding: 48px;
  box-sizing: border-box;
  overflow: hidden;
`;

export const TopSection = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  height: 50%;
  min-height: 320px;
  flex-shrink: 0;
`;

export const BottomSection = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  flex: 1;
  min-height: 160px;
`;