import React, { useState } from 'react';
import FullPageLayout, {
  type FullPageSection,
} from '@/components/layout/fullpage';
import { moveToSection } from '@/utils/fullpage';
import styled from '@emotion/styled';
import LandingHeader from '@/containers/landing/header';
import MainLanding from '@/containers/landing/main';
import IntroduceLanding from '@/containers/landing/introduce';
import RoleLanding from '@/containers/landing/role';
import SkillLanding from '@/containers/landing/skill';
import ExplainLanding from '@/containers/landing/explain';
import FooterLanding from '@/containers/landing/footer';
import LoginModal from '@/containers/login';

const LandingPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // 섹션 변경 핸들러
  const handleSectionChange = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
  };

  // 네비게이션 핸들러
  const handleNavigate = (anchor: string) => {
    moveToSection(anchor);
  };

  // 로그인 모달 핸들러
  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  // 섹션 정의
  const sections: FullPageSection[] = [
    {
      id: 'main',
      anchor: 'main',
      content: <MainLanding onLoginClick={handleLoginClick} />,
      backgroundColor: '#ffffff',
    },
    {
      id: 'introduce',
      anchor: 'introduce',
      content: <IntroduceLanding />,
      backgroundColor: '#ffffff',
    },
    {
      id: 'role',
      anchor: 'role',
      content: <RoleLanding />,
      backgroundColor: '#ffffff',
    },
    {
      id: 'skill',
      anchor: 'skill',
      content: <SkillLanding />,
      backgroundColor: '#ffffff',
    },
    {
      id: 'method',
      anchor: 'method',
      content: <ExplainLanding />,
      backgroundColor: '#ffffff',
    },
    {
      id: 'footer',
      anchor: 'footer',
      content: <FooterLanding />,
      backgroundColor: '#efefef',
    },
  ];

  return (
    <Container>
      <LandingHeader 
        currentSection={currentSection} 
        onNavigate={handleNavigate}
        onLoginClick={handleLoginClick}
      />
      
      {/* FullPage 레이아웃 */}
      <FullPageLayout
        hasHeader={true}
        sections={sections}
        onSectionChange={handleSectionChange}
      />

      {/* 로그인 모달 */}
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </Container>
  );
};

export default LandingPage;

// 스타일 컴포넌트
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
