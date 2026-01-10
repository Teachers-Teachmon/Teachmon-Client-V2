import React from 'react';
import * as S from './style';

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
    <S.FooterContainer>
      <S.IntroSection>
        <S.IntroTitle>티치몬 소개 현장</S.IntroTitle>
        <S.ImagesGrid>
          <S.PrizeImage src="/assets/prize1.png" alt="티치몬 소개 1" />
          <S.PrizeImage src="/assets/prize2.png" alt="티치몬 소개 2" />
        </S.ImagesGrid>
      </S.IntroSection>

      <S.FooterBottom>
        <S.FooterContent>
          <S.LogoSection>
            <S.LogoImage>
              <img src="/assets/logoGray.svg" alt="TeachMon Logo" />
            </S.LogoImage>
            <S.AddressText>
              주소: 부산광역시 강서구 가락대로 1393 봉림동 15 (46708)
              <br />
              <br />
              Copyright © 솔빗 all rights reserved.
            </S.AddressText>
          </S.LogoSection>

          <S.LinksSection>
            <S.NavLinks>
              {menuItems.map((item, index) => (
                <S.NavLink key={index} onClick={() => handleNavClick(item.anchor)}>
                  {item.label}
                </S.NavLink>
              ))}
            </S.NavLinks>
            <S.SocialLinks>
              <S.SocialIcon
                href="https://github.com/Teachers-Teachmon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/icons/landing/mdi_github.svg" alt="GitHub" />
              </S.SocialIcon>
            </S.SocialLinks>
          </S.LinksSection>
        </S.FooterContent>
      </S.FooterBottom>
    </S.FooterContainer>
  );
};

export default FooterLanding;
