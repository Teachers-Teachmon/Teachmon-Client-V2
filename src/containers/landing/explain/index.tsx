import React, { useState, useRef } from 'react';
import * as S from './style';

const ExplainLanding: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleOverlayClick = () => {
    if (isLoading || !iframeRef.current) return;

    setIsLoading(true);

    if (!isPlaying) {
      iframeRef.current.contentWindow?.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        '*'
      );
      setIsPlaying(true);
    } else {
      iframeRef.current.contentWindow?.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        '*'
      );
      setIsPlaying(false);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  return (
    <S.ExplainContainer>
      <S.ContentWrapper>
        <S.MobileTitle>사용설명 영상</S.MobileTitle>
        <S.VideoWrapper>
            <S.VideoIframe
              ref={iframeRef}
              src="https://www.youtube.com/embed/YM1tGbnY2wo?enablejsapi=1"
              title="YouTube video player 1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            <S.VideoOverlay 
              onClick={handleOverlayClick}
              isLoading={isLoading}
            />
          </S.VideoWrapper>
      </S.ContentWrapper>
    </S.ExplainContainer>
  );
};

export default ExplainLanding;
