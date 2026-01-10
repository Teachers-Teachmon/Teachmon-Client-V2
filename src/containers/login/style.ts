import styled from '@emotion/styled';
import { mq } from '@/styles/media';
import { radius } from '@/styles/theme';

export const LoginContainer = styled.div`
  width: 600px;
  height: 360px;
  background: #ffffff;
  border: 1px solid #ababab;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 48px;
  padding: 60px;

  ${mq.mobile} {
    width: 90vw;
    max-width: 400px;
    height: auto;
    padding: 40px 20px;
    gap: 32px;
  }
`;

export const LogoSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.img`
  width: 300px;
  height: auto;

  ${mq.mobile} {
    width: 200px;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  background: #ffffff;
  border: 1px solid #999999;
  border-radius: ${radius.md};
  display: flex;
  padding: 16px 24px;
  align-items: center;
  justify-content: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
    border-color: #666666;
  }

  ${mq.mobile} {
    width: 100%;
    height: 64px;
    gap: 12px;
  }
`;

export const GoogleIcon = styled.img`
  width: 32px;
  height: 32px;

  ${mq.mobile} {
    width: 24px;
    height: 24px;
  }
`;

export const ButtonText = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 400;
  font-size: 24px;
  color: #303030;
  line-height: 1.2;

  ${mq.mobile} {
    font-size: 18px;
  }
`;
