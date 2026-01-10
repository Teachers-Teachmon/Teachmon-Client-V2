import * as S from './style';

export default function IntroduceLanding() {
  return (
    <S.IntroduceContainer>
      <S.ContentWrapper>
        <S.TextSection>
          <S.LogoIcon>
            <img src="/icons/landing/small-logo.svg" alt="TeachMon" />
          </S.LogoIcon>
          <S.Title>TeachMon소개</S.Title>
          <S.TagsContainer>
            <S.Tag>개선</S.Tag>
            <S.Tag>간단한 UI</S.Tag>
            <S.Tag>편리</S.Tag>
          </S.TagsContainer>
          <S.Description>
            TeachMon은 학교 선생님들께서 자습감독을 
            <br />
            보다 효율적이게 하실 수 있도록 돕고자 제작하게 되었습니다.
            <br />
            기존에 사용하던 구글시트의 불편했던 점들을 개선하여 전보다
            <br />
            보기 쉽고 편리하게 사용하실 수 있도록 제작하였습니다.
          </S.Description>
        </S.TextSection>
      </S.ContentWrapper>
      <S.ImageSection>
        <img src="/assets/exchange.svg" alt="Exchange" />
      </S.ImageSection>
    </S.IntroduceContainer>
  );
}