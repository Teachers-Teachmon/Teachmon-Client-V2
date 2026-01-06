import React from 'react';
import {
  FooterContainer,
  IntroSection,
  IntroTitle,
  ImagesGrid,
  PrizeImage,
  FooterBottom,
  FooterContent,
  LogoSection,
  LogoImage,
  AddressText,
  LinksSection,
  NavLinks,
  NavLink,
  SocialLinks,
  SocialIcon,
} from './style';

const FooterLanding: React.FC = () => {
  const menuItems = [
    { label: '메인', anchor: 'main' },
    { label: '소개', anchor: 'introduce' },
    { label: '기능', anchor: 'skill' },
    { label: '역할', anchor: 'role' },
    { label: '사용방법', anchor: 'method' },
  ];

  const handleNavClick = (anchor: string) => {
    window.fullpage_api?.moveTo(anchor);
  };

  return (
    <FooterContainer>
      <IntroSection>
        <IntroTitle>티치몬 소개 현장</IntroTitle>
        <ImagesGrid>
          <PrizeImage src="/assets/prize1.png" alt="티치몬 소개 1" />
          <PrizeImage src="/assets/prize2.png" alt="티치몬 소개 2" />
        </ImagesGrid>
      </IntroSection>

      <FooterBottom>
        <FooterContent>
          <LogoSection>
            <LogoImage>
              <img src="/assets/logoGray.svg" alt="Teach Mon Logo" />
            </LogoImage>
            <AddressText>
              주소: 부산광역시 강서구 가락대로 1393 봉림동 15 (46708)
              <br />
              <br />
              Copyright © 솔빗 all rights reserved.
            </AddressText>
          </LogoSection>

          <LinksSection>
            <NavLinks>
              {menuItems.map((item, index) => (
                <NavLink key={index} onClick={() => handleNavClick(item.anchor)}>
                  {item.label}
                </NavLink>
              ))}
            </NavLinks>
            <SocialLinks>
              <SocialIcon
                href="https://github.com/your-repo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/icons/landing/mdi_github.svg" alt="GitHub" />
              </SocialIcon>
            </SocialLinks>
          </LinksSection>
        </FooterContent>
      </FooterBottom>
    </FooterContainer>
  );
};

export default FooterLanding;
