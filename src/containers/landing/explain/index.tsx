import React, { useState, useRef } from 'react';
import * as S from './style';

const ExplainLanding: React.FC = () => {
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const iframeRef1 = useRef<HTMLIFrameElement>(null);
  const iframeRef2 = useRef<HTMLIFrameElement>(null);

  const handleOverlayClick1 = () => {
    if (isLoading1 || !iframeRef1.current) return;

    setIsLoading1(true);

    if (!isPlaying1) {
      iframeRef1.current.contentWindow?.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        '*'
      );
      setIsPlaying1(true);
    } else {
      iframeRef1.current.contentWindow?.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        '*'
      );
      setIsPlaying1(false);
    }

    setTimeout(() => {
      setIsLoading1(false);
    }, 200);
  };

  const handleOverlayClick2 = () => {
    if (isLoading2 || !iframeRef2.current) return;

    setIsLoading2(true);

    if (!isPlaying2) {
      iframeRef2.current.contentWindow?.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        '*'
      );
      setIsPlaying2(true);
    } else {
      iframeRef2.current.contentWindow?.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        '*'
      );
      setIsPlaying2(false);
    }

    setTimeout(() => {
      setIsLoading2(false);
    }, 200);
  };

  return (
    <S.ExplainContainer>
      <S.ContentWrapper>
        <S.MobileTitle>사용설명 영상</S.MobileTitle>
        <S.VideosGrid>
          <S.VideoWrapper>
            <S.VideoIframe
              ref={iframeRef1}
              src="https://www.youtube.com/embed/YM1tGbnY2wo?enablejsapi=1"
              title="YouTube video player 1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            <S.VideoOverlay 
              onClick={handleOverlayClick1}
              isLoading={isLoading1}
            />
          </S.VideoWrapper>
          <S.VideoWrapper>
            <S.VideoIframe
              ref={iframeRef2}
              src="https://www.youtube.com/embed/yFN13duHYSs?enablejsapi=1"
              title="YouTube video player 2"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            <S.VideoOverlay 
              onClick={handleOverlayClick2}
              isLoading={isLoading2}
            />
          </S.VideoWrapper>
        </S.VideosGrid>
      </S.ContentWrapper>
    </S.ExplainContainer>
  );
};

export default ExplainLanding;
