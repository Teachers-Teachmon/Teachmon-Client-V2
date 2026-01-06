import React, { useState, useEffect } from 'react';
import FullPageLayout, {
  moveToSection,
} from '../../components/layout/fullpage';
import type { FullPageSection } from '../../components/layout/fullpage';
import styled from '@emotion/styled';
import LandingHeader from '@/containers/landing/header';
import MainLanding from '@/containers/landing/main';
import IntroduceLanding from '@/containers/landing/introduce';
// import RoleLanding from '@/containers/landing/role';
// import SkillLanding from '@/containers/landing/skill';
// import MethodLanding from '@/containers/landing/method';
import FooterLanding from '@/containers/landing/footer';

const LandingPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 인증 체크 로직
  useEffect(() => {
    const checkAuth = async () => {
      // 여기에 인증 로직 추가
      // const res = await Check();
      // if (res.data === "Authentication Success") {
      //   window.location.href = '/main';
      // }
      
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    checkAuth();
  }, []);

  // 섹션 정의
  const sections: FullPageSection[] = [
    {
      id: 'main',
      anchor: 'main',
      content: <MainLanding />,
      backgroundColor: '#ffffff',
    },
    {
      id: 'introduce',
      anchor: 'introduce',
      content: <IntroduceLanding />,
      backgroundColor: '#ffffff',
    },
    // {
    //   id: 'role',
    //   anchor: 'role',
    //   content: <RoleLanding />,
    //   backgroundColor: '#ffffff',
    // },
    // {
    //   id: 'skill',
    //   anchor: 'skill',
    //   content: <SkillLanding />,
    //   backgroundColor: '#ffffff',
    // },
    // {
    //   id: 'method',
    //   anchor: 'method',
    //   content: <MethodLanding />,
    //   backgroundColor: '#ffffff',
    // },
    {
      id: 'footer',
      anchor: 'footer',
      content: <FooterLanding />,
      backgroundColor: '#efefef',
    },
  ];

  // 섹션 변경 핸들러
  const handleSectionChange = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
  };

  // 네비게이션 핸들러
  const handleNavigate = (anchor: string) => {
    moveToSection(anchor);
  };
  return (
    <Container>
      <LandingHeader currentSection={currentSection} onNavigate={handleNavigate} />
      
      {/* FullPage 레이아웃 */}
      <FullPageLayout
      hasHeader={true}
        sections={sections}
        onSectionChange={handleSectionChange}
      />
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
