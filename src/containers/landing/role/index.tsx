import { useState } from 'react';
import { ROLE_SLIDES } from '@/constants/landing';
import * as S from './style';

export default function RoleLanding() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = ROLE_SLIDES;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <S.RoleContainer>
      <S.BackgroundOverlay />
      <S.ContentWrapper>
        <S.ArrowButton direction="left" onClick={prevSlide}>
          <img src="/icons/landing/leftArrowWhite.svg" alt="Previous" />
        </S.ArrowButton>

        <S.SliderWrapper>
          <S.SlideContent currentSlide={currentSlide}>
            {slides.map((slide, index) => (
              <S.TextSection key={index}>
                <S.Title>{slide.title}</S.Title>
                <S.Description>{slide.description}</S.Description>
                <S.StartButton>자습감독 시작하기</S.StartButton>
                <S.ScreenshotImage src={slide.image} alt={slide.title} />
              </S.TextSection>
            ))}
          </S.SlideContent>
        </S.SliderWrapper>

        <S.ArrowButton direction="right" onClick={nextSlide}>
                <img src="/icons/landing/leftArrowWhite.svg" alt="Next" style={{transform: 'rotate(180deg)'}} />
        </S.ArrowButton>
      </S.ContentWrapper>

      <S.NavigationDots>
        {slides.map((_, index) => (
          <S.Dot
            key={index}
            active={currentSlide === index}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </S.NavigationDots>
    </S.RoleContainer>
  );
}
