import Modal from '@/components/layout/modal';
import * as S from './style';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const handleGoogleLogin = () => {
    // 구글 로그인 로직 추가
    console.log('Google 로그인');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} padding="0">
      <S.LoginContainer>
        <S.LogoSection>
          <S.Logo src="/assets/logo.svg" alt="Teach Mon" />
        </S.LogoSection>
        <S.LoginButton onClick={handleGoogleLogin}>
          <S.GoogleIcon src="/icons/landing/google.svg" alt="Google" />
          <S.ButtonText>Google로 로그인</S.ButtonText>
        </S.LoginButton>
      </S.LoginContainer>
    </Modal>
  );
}
