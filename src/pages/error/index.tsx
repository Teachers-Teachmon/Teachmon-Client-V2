import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import styled from '@emotion/styled';
import { colors, fontSizes } from '@/styles/theme';

export default function ErrorPage() {
  const navigate = useNavigate();
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/assets/404ErrorAnimation.json')
      .then((response) => response.json())
      .then((data) => setAnimationData(data));
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <ContentWrapper>
        <AnimationWrapper>
          {animationData && <Lottie animationData={animationData} loop autoplay />}
        </AnimationWrapper>
          <Description>요청하신 내용을 찾을 수 없어요</Description>
        <BackLink onClick={handleGoBack}>이전으로 돌아가기</BackLink>
      </ContentWrapper>
    </Container>
  );
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: ${colors.background};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const AnimationWrapper = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Description = styled.p`
  font-size: 2.5vw;
  font-weight: 500;
  color: ${colors.text};
  margin: 0;
`;

export const BackLink = styled.button`
  font-family: 'Paperlogy', sans-serif;
  font-size: ${fontSizes.H3};
  font-weight: 400;
  color: ${colors.primary};
  text-align: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;
