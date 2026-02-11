import styled from "@emotion/styled";
import { zIndex, radius } from "@/styles/theme";
import { mq } from "@/styles/media";
import { fadeIn, fadeOut, slideUp, slideDown } from "@/styles/animations";

export const Black = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(116, 116, 116, 0.5);
  z-index: ${zIndex.modal};
  animation: ${props => props.$isClosing ? fadeOut : fadeIn} 0.2s ease-in-out;
  padding: 1rem;
`

export const Content = styled.div<{ $isClosing?: boolean; $padding?: string }>`
  background-color: white;
  position: relative;
  border-radius: ${radius.md};
  padding: ${props => props.$padding || '3.75rem'};
  animation: ${props => props.$isClosing ? slideDown : slideUp} 0.3s ease-in-out;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  
  ${mq.mobile} {
    width: 100%;
    max-width: 100%;
    padding: ${props => props.$padding || '2.75rem'};
    border-radius: ${radius.sm};
  }
`
