import Modal from '@/components/layout/modal';
import * as S from './style';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/login/google`;
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
