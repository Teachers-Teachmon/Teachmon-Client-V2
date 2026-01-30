import styled from '@emotion/styled';
import { colors, fontSizes } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Container = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100vh;
  min-height: 0;
  box-sizing: border-box;
  justify-content: stretch;

  ${mq.mobile} {
    padding: 2rem;
    gap: 0rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mq.mobile} {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: ${fontSizes.H2};
  font-weight: 700;
  color: ${colors.text};
  margin: 0;

  ${mq.mobile} {
    font-size: 20px;
    white-space: nowrap;
    margin-right: 16rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  ${mq.mobile} {
    gap: 0.5rem;
  }
`;

export const HeaderButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border: 1px solid ${colors.n02};
  background: ${colors.background};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: ${fontSizes.Body};
  color: ${colors.text};
  font-weight: 500;

  &:hover {
    background-color: ${colors.primaryBackground};
  }

  img {
    width: 20px;
    height: 20px;
  }

  span {
    white-space: nowrap;
  }
`;
