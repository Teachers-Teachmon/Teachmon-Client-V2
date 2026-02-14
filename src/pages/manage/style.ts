import styled from '@emotion/styled';
import { colors } from '../../styles/theme';
import { mq } from '@/styles/media';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 5%;
  padding-top: 4%;
  background: ${colors.background};
  position: relative;
  display: grid;
  grid-template-rows: 0.8fr 6fr;
  gap: 20px;
  overflow-y: auto;

  ${mq.mobile} {
    padding: 0;
    grid-template-rows: auto 1fr;
    gap: 16px;
  }
`;

export const Header = styled.div<{ isMapEnabled?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: ${({ isMapEnabled }) => isMapEnabled ? 'flex-start' : 'center'};
  position: relative;
  z-index: 1;
  pointer-events: none;
  
  & > * {
    pointer-events: auto;
  }
  
  ${mq.mobile}{
    padding: 16px;
    align-items: flex-start;
  }
`;

export const ClassGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr;
  gap: 15px;
  overflow: visible;
  padding-top: 60px;
  margin-top: -60px;

  ${mq.mobile} {
    grid-template-columns: 1fr;
    gap: 12px;
    padding-bottom: 100px;
  }
`;

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  font-size: 18px;
  color: ${colors.n04};
  text-align: center;
`;

