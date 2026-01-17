import { useSuspenseQuery } from '@tanstack/react-query';
import Modal from '@/components/layout/modal';
import { authQuery } from '@/services/auth/auth.query';
import * as S from './style';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { data } = useSuspenseQuery(authQuery.loginUrl());

  const handleGoogleLogin = () => {
    window.location.href = data.url;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} padding="0">
      <S.LoginContainer>
        <S.LogoSection>
          <S.Logo src="/assets/logo.svg" alt="TeachMon" />
        </S.LogoSection>
        <S.LoginButton onClick={handleGoogleLogin}>
          <S.GoogleIcon src="/icons/landing/google.svg" alt="Google" />
          <S.ButtonText>Google로 로그인</S.ButtonText>
        </S.LoginButton>
      </S.LoginContainer>
    </Modal>
  );
}
