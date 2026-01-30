import styled from '@emotion/styled';
import { mq } from '@/styles/media';

export const MainContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  ${mq.mobile}{
    gap: 20px;
  }
`;

export const HeroSection = styled.div`
  width: calc(100% - 280px);
  z-index: 1;
  height: 55%;
  position: relative;
  display: flex;
  align-items: center;
  padding: 40px;
  border-radius: 0 0 150px 12px ;
  background: 
    linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0.83) 37.67%, rgba(0, 0, 0, 0.10) 100%),
    url('/assets/mainBg.svg');
  background-size: cover;
  background-position: center;

  ${mq.mobile} {
    width: 90%;
    height: auto;
    padding: 40px 20px 30px 20px;
    border-radius: 0 0 8px 8px;
  }
`;

export const BackgroundOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 5%;
  left: 0;
  background-image: url('/assets/redToBlue.svg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
  ${mq.mobile}{
    top: 20%;
    width:100%;
    height: 50%;
    background-size: cover;
  }
`;
export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  color: #ffffff;
  max-width: 650px;
  display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    gap: 24px;

  ${mq.mobile} {
    max-width: 100%;
    gap: 16px;
  }
`;

export const Subtitle = styled.p`
  font-size: clamp(14px, 2.5vw, 31.5px);
  ${mq.mobile} {
    font-size: clamp(12px, 5vw, 16px);
  }
`;

export const Title = styled.h1`
  font-weight: 500;
  font-size: clamp(14px, 4vw, 40px);
  line-height: 60px;  

  ${mq.mobile} {
    font-size: clamp(12px, 8vw, 28px);
    line-height: 40px;
  }
`;

export const Description = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  max-width: 509px;

  ${mq.mobile} {
    font-size: 13px;
    line-height: 20px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;

  ${mq.mobile} {
    gap: 20px;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: transparent;
  border: none;
  color: #ffffff;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
  & > img{
    ${mq.mobile}{
      width: 100px;
      height: 50px;
    }
  }
`;

export const ButtonIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 400;
  font-size: clamp(14px, 1.5vw, 18px);
  line-height: 21px;
  margin-bottom: 4px;

  ${mq.mobile} {
    font-size: clamp(14px, 4vw, 16px);
  }

  img {
    width: 40px;
    height: 40px;

    ${mq.mobile} {
      width: 32px;
      height: 32px;
    }
  }
`;

export const ButtonLabel = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  opacity: 0.9;

  ${mq.mobile} {
    font-size: 12px;
  }
`;

export const CardsSection = styled.div`
  width: 100%;
  height: 45%;
  padding: 40px 140px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  align-items: center;
  background: #ffffff;
  position: relative;

  ${mq.mobile} {
    width: 90%;
    padding: 0;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    height: 30%;
    align-items: start;
  }
`;

export const Card = styled.div`
  width: 100%;
  z-index: 1;
  aspect-ratio: 1.55;
  background: #ffffff;
  border: 1px solid #cfcfcf;
  border-radius: 10px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  &:hover .card-arrow {
    opacity: 1;
  }

  ${mq.mobile} {
    aspect-ratio: 0;
    width: 100%;
    height: 150px;
    padding: 16px;
  }
`;

export const CardIcon = styled.div`
  width: 32px;
  height: 32px;
  margin-bottom: 12px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  ${mq.mobile} {
    width: 24px;
    height: 24px;
    margin-bottom: 8px;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const CardTitle = styled.h3`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 700;
  font-size: clamp(14px, 1.8vw, 22px);
  line-height: 1.3;
  color: #000000;
  margin-bottom: 10px;

  ${mq.mobile} {
    font-size: 15px;
    line-height: 1.3;
    margin-bottom: 6px;
  }
`;

export const CardDescription = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 400;
  font-size: clamp(14px, 1vw, 14px);
  line-height: 1.5;
  letter-spacing: 0.5px;
  color: #7f7f7f;

  ${mq.mobile} {
    font-size: 11px;
    line-height: 1.4;
  }
`;

export const CardArrow = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  opacity: 0.6;
  transition: opacity 0.3s ease;

  img {
    width: 20px;
    height: 20px;
  }

  ${mq.mobile} {
    img {
      width: 16px;
      height: 16px;
    }
  }
`;
