import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '../../../styles/theme';
import { mq } from '../../../styles/media';

export const IntroduceContainer = styled.div`
  width: 100vw;
  z-index: -1;
  height: calc(100vh - 80px);
  background: ${colors.background};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 80px 140px;
  position: relative;
  overflow: hidden;

  ${mq.mobile} {
    padding: 60px 20px;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  ${mq.mobile} {
    justify-content: center;
  }
`;

export const TextSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;

  ${mq.mobile} {
    max-width: 100%;
  }
`;

export const LogoIcon = styled.div`
  img {
    width: 100px;
    height: auto;

    ${mq.mobile} {
      width: 80px;
    }
  }
`;

export const Title = styled.h2`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 800;
  font-size: clamp(24px, 2.2vw, 31.66px);
  color: ${colors.text};
  margin: 0;
  line-height: 1.2;

  ${mq.mobile} {
    font-size: ${fontSizes.H2};
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: ${colors.primary100};
  padding: 8px 16px;
  border-radius: 22px;
  width: fit-content;

  ${mq.mobile} {
    padding: 6px 12px;
    gap: 8px;
  }
`;

export const Tag = styled.span`
  background: ${colors.background};
  color: ${colors.primary};
  border: 1px solid ${colors.primary};
  border-radius: 30px;
  padding: 6px 16px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: clamp(12px, 1vw, 14.77px);
  line-height: 1.2;

  ${mq.mobile} {
    font-size: ${fontSizes.Small};
    padding: 4px 12px;
  }
`;

export const Description = styled.p`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: clamp(14px, 1.3vw, 19px);
  color: ${colors.text};
  line-height: 1.75;
  margin: 0;

  ${mq.mobile} {
    font-size: ${fontSizes.Body};
    line-height: 1.6;
  }
`;

export const ImageSection = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  pointer-events: none;

  img {
    height: 100%;
    width: 80%;
    object-fit: contain;

    ${mq.mobile} {
      display: none;
    }
  }
`;