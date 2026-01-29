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
      // 재생
      iframeRef.current.contentWindow?.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        '*'
      );
      setIsPlaying(true);
    } else {
      // 일시정지
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
            {/* 이건 나중에 설명영상을 바꿔야함 */}
          <S.VideoIframe
            ref={iframeRef}
            src="https://www.youtube.com/embed/ZO0brUR1L4Q?si=tde1mDLMKoQWj3zD&enablejsapi=1"
            title="YouTube video player"
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
