import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors } from '@/styles/theme';
import {fadeInBounce} from '@/styles/animations'
import { mq } from '@/styles/media';


export const PopupContainer = styled.div<{ $isAnimation: boolean }>`
  position: absolute;
  background: ${colors.background};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
  width: max-content;
  padding: 10px 15px;
  animation: ${({ $isAnimation }) =>
    $isAnimation
      ? css`${fadeInBounce} 0.3s ease-in-out both`
      : 'none'};
  bottom: -3rem;
  border-radius: 8px;
  right: 0;
  gap: 20px;
  display: flex;
  flex-direction: row;
  ${mq.mobile}{
    flex-direction: column;
    align-items: flex-end;
    bottom: -13rem;
  }
  z-index: 200;
`;

export const LegendItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

export const LegendText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.text};
  margin: 0;
`;

export const ColorBox = styled.div<{ $color: string }>`
  width: 20px;
  height: 20px;
  background: ${props => props.$color};
  box-shadow: 0 0 0.2px 0.2px;
`;
