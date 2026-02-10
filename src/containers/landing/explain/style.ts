import styled from '@emotion/styled';
import { mq } from '@/styles/media';

export const ExplainContainer = styled.div`
  width: 100%;
  height: calc(100vh - 85px);
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 140px;

  ${mq.mobile} {
    padding: 40px 20px;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  ${mq.mobile} {
    flex-direction: column;
    gap: 20px;
  }
`;

export const MobileTitle = styled.h2`
  display: none;
  
  ${mq.mobile} {
    display: block;
    font-family: 'Paperlogy', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #000000;
    margin: 0;
    text-align: center;
  }
`;

export const VideoWrapper = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);

  ${mq.mobile} {
    border-radius: 12px;
  }
`;

export const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 16px;

  ${mq.mobile} {
    border-radius: 12px;
  }
`;

export const VideoOverlay = styled.div<{ isLoading?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: ${({ isLoading }) => (isLoading ? 'wait' : 'pointer')};
  z-index: 1;
  border-radius: 16px;
  background: transparent;
  transition: background 0.2s ease;
  pointer-events: auto;

  &:hover {
    background: ${({ isLoading }) => (isLoading ? 'transparent' : 'rgba(0, 0, 0, 0.05)')};
  }

  ${mq.mobile} {
    border-radius: 12px;
  }
`;
