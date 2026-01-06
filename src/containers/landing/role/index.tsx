import { useState } from 'react';
import {
  RoleContainer,
  BackgroundOverlay,
  ContentWrapper,
  SliderWrapper,
  SlideContent,
  TextSection,
  Title,
  Description,
  NavigationDots,
  Dot,
  ArrowButton,
  StartButton,
  ScreenshotImage,
} from './style';

export default function RoleLanding() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: '관리 선생님',
      description:
        '관리 선생님은 TeachMon을 통해 자습감독 일정을 자동으로 생성할 수 있고, 방과후를 등록하고 관리할 수 있습니다.',
      image: '/assets/role-admin.svg',
    },
    {
      title: '자습감독 선생님',
      description:
        '도면과 보기쉬운 UI를 통해 자습감독 선생님들은 더욱 편리하게 자습감독을 하실 수 있습니다.',
      image: '/assets/role-teacher.svg',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <RoleContainer>
      <BackgroundOverlay />
      <ContentWrapper>
        <ArrowButton direction="left" onClick={prevSlide}>
          <img src="/icons/landing/leftArrowWhite.svg" alt="Previous" />
        </ArrowButton>

        <SliderWrapper>
          <SlideContent currentSlide={currentSlide}>
            {slides.map((slide, index) => (
              <TextSection key={index}>
                <Title>{slide.title}</Title>
                <Description>{slide.description}</Description>
                <StartButton>자습감독 시작하기</StartButton>
                <ScreenshotImage src={slide.image} alt={slide.title} />
              </TextSection>
            ))}
          </SlideContent>
        </SliderWrapper>

        <ArrowButton direction="right" onClick={nextSlide}>
                <img src="/icons/landing/leftArrowWhite.svg" alt="Next" style={{transform: 'rotate(180deg)'}} />
        </ArrowButton>
      </ContentWrapper>

      <NavigationDots>
        {slides.map((_, index) => (
          <Dot
            key={index}
            active={currentSlide === index}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </NavigationDots>
    </RoleContainer>
  );
}
