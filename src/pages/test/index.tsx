import { useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '@/components/ui/loading';
import styled from '@emotion/styled';

export default function TestPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleToastSuccess = () => {
    toast.success('성공 메시지입니다!');
  };

  const handleToastError = () => {
    toast.error('에러 메시지입니다!');
  };

  const handleToastInfo = () => {
    toast.info('정보 메시지입니다!');
  };

  const handleToastWarning = () => {
    toast.warning('경고 메시지입니다!');
  };

  const handleLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('로딩 완료!');
    }, 3000);
  };

  return (
    <Container>
      {isLoading && <Loading />}
      
      <Title>테스트 페이지</Title>
      
      <Section>
        <SectionTitle>Toast 예시</SectionTitle>
        <ButtonGroup>
          <TestButton onClick={handleToastSuccess}>Success Toast</TestButton>
          <TestButton onClick={handleToastError}>Error Toast</TestButton>
          <TestButton onClick={handleToastInfo}>Info Toast</TestButton>
          <TestButton onClick={handleToastWarning}>Warning Toast</TestButton>
        </ButtonGroup>
      </Section>

      <Section>
        <SectionTitle>Loading 예시</SectionTitle>
        <ButtonGroup>
          <TestButton onClick={handleLoading}>Show Loading (3초)</TestButton>
        </ButtonGroup>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
`;

const Section = styled.div`
  margin-bottom: 40px;
  padding: 24px;
  background: #f8f9fa;
  border-radius: 8px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const TestButton = styled.button`
  padding: 12px 24px;
  background: #2E6FF2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #1e5fd9;
  }

  &:active {
    transform: scale(0.98);
  }
`;
