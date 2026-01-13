import React, { useState } from 'react';
import * as S from './style';

interface LandingHeaderProps {
  currentSection: number;
  onNavigate: (anchor: string) => void;
  onLoginClick: () => void;
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ currentSection, onNavigate, onLoginClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: '메인', anchor: 'main', index: 0 },
    { label: '소개', anchor: 'introduce', index: 1 },
    { label: '역할', anchor: 'role', index: 2 },
    { label: '기능', anchor: 'skill', index: 3 },
    { label: '사용방법', anchor: 'method', index: 4 },
  ];

  const handleNavigateWithClose = (anchor: string) => {
    onNavigate(anchor);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <S.HeaderContainer>
        <S.LogoContainer>
          <img src="/assets/logo.svg" alt="TeachMon Logo" />
        </S.LogoContainer>

        <S.Navigation>
          {menuItems.map((item) => (
            <S.NavItem
              key={item.anchor}
              active={currentSection === item.index}
              onClick={() => onNavigate(item.anchor)}
            >
              {item.label}
            </S.NavItem>
          ))}
        </S.Navigation>

        <S.LoginButton onClick={onLoginClick}>로그인</S.LoginButton>
      </S.HeaderContainer>

      <S.MobileMenu isOpen={isMobileMenuOpen}>
        {menuItems.map((item) => (
          <S.MobileNavItem
            key={item.anchor}
            active={currentSection === item.index}
            onClick={() => handleNavigateWithClose(item.anchor)}
          >
            {item.label}
          </S.MobileNavItem>
        ))}
      </S.MobileMenu>
    </>
  );
};

export default LandingHeader;
