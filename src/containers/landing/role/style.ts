import styled from '@emotion/styled';
import { mq } from '@/styles/media';
import { colors } from '@/styles/theme';

export const RoleContainer = styled.div`
  width: 100%;
  height: calc(100vh - 85px);
  position: relative;
  display: flex;
  overflow: hidden;
  ${mq.mobile}{
    height: calc(100vh - 65px);
  }
`;

export const BackgroundOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #1a1a1a;
  background-image: url('/assets/school.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 0 140px;

  ${mq.mobile} {
    padding: 0 20px;
    gap: 20px;
  }
`;

export const SliderWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
`;

export const SlideContent = styled.div<{ currentSlide: number }>`
  display: flex;
  transform: translateX(-${(props) => props.currentSlide * 100}%);
  transition: transform 0.5s ease-in-out;
`;

export const TextSection = styled.div`
  min-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #ffffff;
  padding: 40px;

  ${mq.mobile} {
    padding: 20px;
    gap: 16px;
  }
`;

export const Title = styled.h2`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 700;
  font-size: clamp(24px, 3vw, 48px);
  line-height: 1.3;
  color: #ffffff;
  white-space: pre-line;

  ${mq.mobile} {
    font-size: clamp(20px, 6vw, 32px);
  }
`;

export const Description = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 400;
  font-size: clamp(14px, 1.2vw, 18px);
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  white-space: pre-line;

  ${mq.mobile} {
    font-size: clamp(13px, 4vw, 16px);
    line-height: 1.6;
  }
`;

export const StartButton = styled.button`
  width: fit-content;
  padding: 14px 32px;
  background: #ffffff;
  color: ${colors.primary};
  border: none;
  border-radius: 8px;
  font-family: 'Paperlogy', sans-serif;
  font-weight: 600;
  font-size: clamp(14px, 1.1vw, 16px);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
  }

  ${mq.mobile} {
    padding: 12px 24px;
    font-size: 14px;
  }
`;

export const ScreenshotImage = styled.img`
  max-width: 100%;
  width: auto;
  height: auto;
  max-height: 400px;
  object-fit: contain;
  border-radius: 12px;
  display: block;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

  ${mq.mobile} {
    display: none;
    border-radius: 8px;
  }
`;

export const ArrowButton = styled.button<{ direction: 'left' | 'right' }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background:none;
  border: none;
  

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 24px;
    height: 24px;
  }

  ${mq.mobile} {
    width: 40px;
    height: 40px;

    img {
      width: 20px;
      height: 20px;
    }
  }
`;

export const NavigationDots = styled.div`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;

  ${mq.mobile}{
    bottom: 15%;
    gap: 8px;
  }
`;

export const Dot = styled.button<{ active: boolean }>`
  width: ${(props) => (props.active ? '32px' : '12px')};
  height: 12px;
  border-radius: 6px;
  background: ${(props) =>
    props.active ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.3)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.7);
  }

  ${mq.mobile} {
    width: ${(props) => (props.active ? '24px' : '10px')};
    height: 10px;
  }
`;
