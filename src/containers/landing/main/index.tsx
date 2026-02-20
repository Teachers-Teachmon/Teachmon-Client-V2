import React from 'react';
import { LANDING_CARDS, LANDING_CARD_ANCHORS } from '@/constants/landing';
import type { CardData } from '@/types/landing';
import * as S from './style';

interface MainLandingProps {
  onLoginClick?: () => void;
}

const MainLanding: React.FC<MainLandingProps> = ({ onLoginClick }) => {
  const cards: CardData[] = LANDING_CARDS.map((card, index) => ({
    ...card,
    onClick: () => window.fullpage_api?.moveTo(LANDING_CARD_ANCHORS[index]),
  }));

  const handleLogin = () => {
    if (onLoginClick) {
      onLoginClick();
    } else {
      window.location.href = '/login';
    }
  };

  const handleVideo = () => {
    // 시연 영상 URL로 이동
    window.open('https://youtu.be/A8gOKTAveXs', '_blank');
  };

  return (
    <S.MainContainer>
      <S.BackgroundImage src="/assets/redToBlue.svg" alt="" />
      
      <S.HeroSection>
        <S.HeroContent>
          <S.Subtitle>선생님들의 일을 보다 더 쉽게, 더 편리하게</S.Subtitle>
          <S.Title>방과후 자습감독 도우미 프로그램</S.Title>
          <S.Description>
            티치몬은 부산소프트웨어 마이스터고등학교에서 자습감독을 해주시는
            선생님들께서 더 편리하게 감독해주실 수 있도록 하기위해 개발되었어요!
          </S.Description>
          <S.ButtonGroup>
            <S.ActionButton onClick={handleLogin}>
              <img src="/assets/use.svg" alt="사용" />
            </S.ActionButton>
            <S.ActionButton onClick={handleVideo}>
              <img src="/assets/demo.svg" alt="시연" />
            </S.ActionButton>
          </S.ButtonGroup>
        </S.HeroContent>
      </S.HeroSection>

      <S.CardsSection>
        {cards.map((card, index) => (
          <S.Card key={index} onClick={card.onClick}>
            <S.CardHeader>
              <S.CardIcon>
                <img src={card.icon} alt={card.title} />
              </S.CardIcon>
              <S.CardArrow className="card-arrow">
                <img src="/icons/landing/rightArrowGray.svg" alt="arrow" />
              </S.CardArrow>
            </S.CardHeader>
            <S.CardTitle>{card.title}</S.CardTitle>
            <S.CardDescription>{card.description}</S.CardDescription>
          </S.Card>
        ))}
      </S.CardsSection>
    </S.MainContainer>
  );
};

export default MainLanding;
