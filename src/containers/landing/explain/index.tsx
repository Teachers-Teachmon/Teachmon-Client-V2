import React from 'react';
import * as S from './style';

const ExplainLanding: React.FC = () => {
  return (
    <S.ExplainContainer>
      <S.ContentWrapper>
        <S.VideoWrapper>
            {/* 이건 나중에 설명영상을 바꿔야함 */}
          <S.VideoIframe
            src="https://www.youtube.com/embed/ZO0brUR1L4Q?si=tde1mDLMKoQWj3zD"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </S.VideoWrapper>
      </S.ContentWrapper>
    </S.ExplainContainer>
  );
};

export default ExplainLanding;
