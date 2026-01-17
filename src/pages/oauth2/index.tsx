import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthCodeMutation } from '@/services/auth/auth.mutation';
import Loading from '@/components/ui/loading';

export default function Oauth() {
  const navigate = useNavigate();
  const { mutate: sendAuthCode } = useAuthCodeMutation();

  useEffect(() => {
    const handleOAuthCallback = () => {
      // URL에서 hash 부분 파싱 (#code=... 또는 #error=...)
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1));
      
      // 에러가 있는 경우
      const error = params.get('error');
      if (error) {
        toast.error('로그인에 실패했습니다.');
        navigate('/');
        return;
      }
      
      const code = params.get('code');

      if (!code) {
        toast.error('인증 코드가 없습니다.');
        navigate('/');
        return;
      }

      // 인증 코드를 서버로 전송
      sendAuthCode(code);
    };

    handleOAuthCallback();
  }, [navigate, sendAuthCode]);

  return <Loading />;
}