import React from 'react';
import {
  MainContainer,
  HeroSection,
  HeroContent,
  Subtitle,
  Title,
  Description,
  ButtonGroup,
  ActionButton,
  CardsSection,
  Card,
  CardHeader,
  CardIcon,
  CardTitle,
  CardDescription,
  CardArrow,
  BackgroundOverlay
} from './style';

interface CardData {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}

const MainLanding: React.FC = () => {
  const cards: CardData[] = [
    {
      icon: '/icons/landing/small-logo.svg',
      title: 'TeachMon소개',
      description: 'TeachMon이 무엇인지 소개해드릴게요!',
      onClick: () => window.fullpage_api?.moveTo('introduce'),
    },
    {
      icon: '/icons/landing/role.svg',
      title: '역할',
      description: 'TeachMon에는 2가지의 \n역할이 있어요. 어떤게 있는지 알아보아요',
      onClick: () => window.fullpage_api?.moveTo('role'),
    },
    {
      icon: '/icons/landing/skill.svg',
      title: '기능소개',
      description: 'TeachMon에있는 주요기능에 대해서 소개해드릴게요!',
      onClick: () => window.fullpage_api?.moveTo('skill'),
    },
    {
      icon: '/icons/landing/method.svg',
      title: '사용방법',
      description: 'TeachMon의 기능들을 어떻게\n사용하는지 알려드릴게요!',
      onClick: () => window.fullpage_api?.moveTo('method'),
    },
  ];

  const handleLogin = () => {
    window.location.href = '/login';
  };

  const handleVideo = () => {
    // 시연 영상 URL로 이동
    window.open('https://youtu.be/A8gOKTAveXs', '_blank');
  };

  return (
    <MainContainer>
      <HeroSection>
        <HeroContent>
          <Subtitle>선생님들의 일을 보다 더 쉽게, 더 편리하게</Subtitle>
          <Title>방과후 자습감독 도우미 프로그램</Title>
          <Description>
            티치몬은 부산소프트웨어 마이스터고등학교에서 자습감독을 해주시는
            선생님들께서 더 편리하게 감독해주실 수 있도록 하기위해 개발되었어요!
          </Description>
          <ButtonGroup>
            <ActionButton onClick={handleLogin}>
              <img src="/assets/use.svg" alt="사용" />
            </ActionButton>
            <ActionButton onClick={handleVideo}>
              <img src="/assets/demo.svg" alt="시연" />
            </ActionButton>
          </ButtonGroup>
        </HeroContent>
      </HeroSection>

      <CardsSection>
        {cards.map((card, index) => (
          <Card key={index} onClick={card.onClick}>
            <CardHeader>
              <CardIcon>
                <img src={card.icon} alt={card.title} />
              </CardIcon>
              <CardArrow className="card-arrow">
                <img src="/icons/landing/rightArrowGray.svg" alt="arrow" />
              </CardArrow>
            </CardHeader>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </Card>
        ))}
      </CardsSection>
      <BackgroundOverlay />
    </MainContainer>
  );
};

export default MainLanding;
