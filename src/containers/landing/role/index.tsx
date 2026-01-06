import { useState } from 'react';
import * as S from './style';

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
