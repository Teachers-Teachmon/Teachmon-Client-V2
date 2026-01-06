import React from 'react';
import {
  ExplainContainer,
  ContentWrapper,
  VideoWrapper,
  VideoIframe,
} from './style';

const ExplainLanding: React.FC = () => {
  return (
    <ExplainContainer>
      <ContentWrapper>
        <VideoWrapper>
            {/* 이건 나중에 설명영상을 바꿔야함 */}
          <VideoIframe
            src="https://www.youtube.com/embed/ZO0brUR1L4Q?si=tde1mDLMKoQWj3zD"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </VideoWrapper>
      </ContentWrapper>
    </ExplainContainer>
  );
};

export default ExplainLanding;
