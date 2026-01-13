import styled from '@emotion/styled';
import { colors } from '@/styles/theme';
import { mq } from '@/styles/media';

export const SkillContainer = styled.div`
  width: 100%;
  height: calc(100vh - 85px);
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 140px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 60px;
    background: ${colors.primary};
    z-index: 0;
  }

  ${mq.mobile} {
    padding: 40px 20px;
    
    &::before {
      height: 60px;
    }
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;

  ${mq.mobile} {
    justify-content: center;
  }
`;

export const FeatureCard = styled.div`
  width: 100%;
  max-width: 512px;
  background: #ffffff;
  border-radius: 12px;
  padding: 38px 30px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 22px;

  ${mq.mobile} {
    max-width: 100%;
    padding: 28px 20px;
    gap: 18px;
  }
`;

export const FeatureTitle = styled.h2`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 500;
  font-size: clamp(18px, 1.7vw, 24px);
  color: #000000;
  margin: 0;

  ${mq.mobile} {
    font-size: clamp(16px, 5vw, 20px);
  }
`;

export const TabsContainer = styled.div`
  position: relative;
  display: flex;
  gap: 32px;
  border-bottom: 2.75px solid #e0e0e0;
  padding-bottom: 12px;

  ${mq.mobile} {
    gap: 16px;
    overflow-x: auto;
    padding-bottom: 10px;
  }
`;

export const TabIndicator = styled.div<{ activeIndex: number }>`
  position: absolute;
  bottom: -2.75px;
  left: 0;
  height: 2.75px;
  background: #2e6ff2;
  transition: all 0.3s ease;
  transform: translateX(${
    props => props.activeIndex === 0 ? '0' : props.activeIndex === 1 ? 'calc(89px + 32px)' : 'calc(89px + 32px + 168px + 32px)'
  });
  width: ${
    props => props.activeIndex === 0 ? '89px' : props.activeIndex === 1 ? '168px' : '131px'
  };

  ${mq.mobile} {
    display: none;
  }
`;

export const Tab = styled.button<{ active: boolean }>`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 500;
  font-size: clamp(14px, 1.5vw, 21px);
  color: ${props => (props.active ? '#2e6ff2' : '#9ca4ba')};
  background: transparent;
  border: none;
  padding: ${props => (props.active ? '11px 7.5px' : '12px 8px')};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  border-radius: 4px;

  &:hover {
    color: #2e6ff2;
  }

  ${mq.mobile} {
    font-size: clamp(12px, 4vw, 16px);
    padding: ${props => (props.active ? '8px 6px' : '9px 7px')};
  }
`;

export const FeatureDescription = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 500;
  font-size: clamp(14px, 1.3vw, 18px);
  color: #6e7072;
  line-height: 1.4;
  margin: 0;
  white-space: pre-line;

  ${mq.mobile} {
    font-size: clamp(13px, 4vw, 16px);
    line-height: 1.5;
  }
`;

export const TabletImage = styled.img<{ position: 'left' | 'right'; activeTab: number }>`
  position: absolute;
  ${props => (props.position === 'left' ? 'left: 80px;' : 'right: 80px;')}
  top: ${props => {
    const isEven = props.activeTab % 2 === 0;
    if (isEven) {
      return props.position === 'left' ? '30%' : '10%';
    } else {
      return props.position === 'left' ? '10%' : '30%';
    }
  }};
  width: 40%;
  transition: all 0.3s ease;

  ${mq.mobile} {
    display: none;
  }
`;
