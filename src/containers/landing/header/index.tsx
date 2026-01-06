import React, { useState } from 'react';
import * as S from './style';

interface LandingHeaderProps {
  currentSection: number;
  onNavigate: (anchor: string) => void;
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ currentSection, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: '메인', anchor: 'main', index: 0 },
    { label: '소개', anchor: 'introduce', index: 1 },
    { label: '역할', anchor: 'role', index: 2 },
    { label: '기능', anchor: 'skill', index: 3 },
    { label: '사용방법', anchor: 'method', index: 4 },
  ];

  const handleLogin = () => {
    window.location.href = '/login';
  };

  const handleNavigateWithClose = (anchor: string) => {
    onNavigate(anchor);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <S.HeaderContainer>
        <S.LogoContainer>
          <img src="/assets/logo.svg" alt="Teach Mon Logo" />
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

        <S.MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </S.MobileMenuButton>

        <S.LoginButton onClick={handleLogin}>로그인</S.LoginButton>
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
