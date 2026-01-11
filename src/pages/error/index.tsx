import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import * as S from './style';

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
    <S.Container>
      <S.ContentWrapper>
        <S.AnimationWrapper>
          {animationData && <Lottie animationData={animationData} loop autoplay />}
        </S.AnimationWrapper>
          <S.Description>요청하신 내용을 찾을 수 없어요</S.Description>
        <S.BackLink onClick={handleGoBack}>이전으로 돌아가기</S.BackLink>
      </S.ContentWrapper>
    </S.Container>
  );
}
