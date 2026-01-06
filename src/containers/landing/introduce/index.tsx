import {
  IntroduceContainer,
  ContentWrapper,
  TextSection,
  LogoIcon,
  Title,
  TagsContainer,
  Tag,
  Description,
  ImageSection,
} from './style';

export default function IntroduceLanding() {
  return (
    <IntroduceContainer>
      <ContentWrapper>
        <TextSection>
          <LogoIcon>
            <img src="/icons/landing/small-logo.svg" alt="Teach Mon" />
          </LogoIcon>
          <Title>Teach Mon소개</Title>
          <TagsContainer>
            <Tag>개선</Tag>
            <Tag>간단한 UI</Tag>
            <Tag>편리</Tag>
          </TagsContainer>
          <Description>
            Teach Mon은 학교 선생님들께서 자습감독을 
            <br />
            보다 효율적이게 하실 수 있도록 돕고자 제작하게 되었습니다.
            <br />
            기존에 사용하던 구글시트의 불편했던 점들을 개선하여 전보다
            <br />
            보기 쉽고 편리하게 사용하실 수 있도록 제작하였습니다.
          </Description>
        </TextSection>
      </ContentWrapper>
      <ImageSection>
        <img src="/assets/exchange.svg" alt="Exchange" />
      </ImageSection>
    </IntroduceContainer>
  );
}