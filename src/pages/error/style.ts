import styled from '@emotion/styled';
import { colors, fontSizes } from '@/styles/theme';

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

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 3vw;
  font-weight: 600;
  color: ${colors.text};
  text-align: center;
  line-height: 1.18;
  margin: 0;
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
