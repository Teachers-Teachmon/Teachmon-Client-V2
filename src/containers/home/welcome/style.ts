import styled from '@emotion/styled';
import { colors, radius } from '@/styles/theme';

export const WelcomeCard = styled.div<{ bgImage: string }>`
  flex: 2;
  position: relative;
  height: 100%;
  border-radius: ${radius.md};
  overflow: hidden;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url(${(props) => props.bgImage});
    background-size: cover;
    background-position: center;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
  }
`;

export const WelcomeContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const WelcomeTitle = styled.h1`
  font-size: clamp(24px, 3vw, 48px);
  color: ${colors.n01};
  font-weight: 500;
`;

export const WelcomeBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 16px;
`;

export const WelcomeMessage = styled.p`
  font-size: clamp(18px, 2vw, 32px);
  color: ${colors.n01};
  font-weight: 500;
`;

export const SupervisionCount = styled.p`
  font-size: clamp(14px, 1.5vw, 24px);
  color: ${colors.n01};
  font-weight: 500;
`;
