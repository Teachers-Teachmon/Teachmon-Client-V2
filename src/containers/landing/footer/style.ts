import styled from '@emotion/styled';
import { colors, fontSizes } from '../../../styles/theme';
import { mq } from '../../../styles/media';

export const FooterContainer = styled.footer`
  width: 100%;
  height: calc(100vh - 85px);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const IntroSection = styled.div`
  width: 100%;
  padding: 40px 140px;
  background: #ffffff;
  display: flex;
  flex-direction: column;

  ${mq.mobile} {
    padding: 30px 20px;
    gap: 16px;
  }
`;

export const IntroTitle = styled.h2`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 600;
  font-size: clamp(20px, 2.1vw, 30px);
  color: #000000;
  margin: 0;
  line-height: 1.2;

  ${mq.mobile} {
    font-size: clamp(18px, 5vw, 24px);
  }
`;

export const ImagesGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  ${mq.mobile} {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const PrizeImage = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 4 / 3;
  object-fit: contain;
  border-radius: 12px;

  ${mq.mobile} {
    border-radius: 8px;
  }
`;

export const FooterBottom = styled.div`
  width: 100%;
  background: #efefef;
  padding: 30px 0;
`;

export const FooterContent = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 140px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  ${mq.mobile} {
    flex-direction: column;
    gap: 32px;
    padding: 0 20px;
    align-items: center;
    text-align: center;
  }
`;

export const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${mq.mobile} {
    align-items: center;
  }
`;

export const LogoImage = styled.div`
  img {
    height: 36px;
    width: auto;

    ${mq.mobile} {
      height: 32px;
    }
  }
`;

export const AddressText = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 500;
  font-size: 1.05vw;
  color: #bcbcbc;
  line-height: 1.2;
  margin: 0;

  ${mq.mobile} {
    font-size: ${fontSizes.Small};
  }
`;

export const LinksSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 80px;

  ${mq.mobile} {
    flex-direction: column;
    gap: 24px;
    align-items: center;
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${mq.mobile} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }
`;

export const NavLink = styled.button`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 500;
  font-size: 1.05vw;
  color: #bcbcbc;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  padding: 0;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.primary};
  }

  ${mq.mobile} {
    font-size: ${fontSizes.Small};
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
`;

export const SocialIcon = styled.a`
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 100%;
    height: 100%;
  }

  ${mq.mobile} {
    width: 48px;
    height: 48px;
  }
`;
