import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';
import { reissueToken, getCurrentUser } from '@/services/auth/auth.api';
import Loading from '../loading';
import { toast } from 'react-toastify';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setAccessToken, clearAuth } = useAuthStore();
  const { setUser, clearUser } = useUserStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        // 리프레시 토큰으로 새 액세스 토큰 발급 시도
        console.log('Attempting to reissue token...');
        const response = await reissueToken();
        console.log('Token received:', response.access_token);
        
        // 토큰을 스토어에 저장
        setAccessToken(response.access_token);
        console.log('Token saved to store');
        
        // 유저 정보를 별도로 요청
        console.log('Fetching user info...');
        const user = await getCurrentUser();
        console.log('User info received:', user);
        setUser(user);
        
        // 로그인 성공 후 현재 URL이 루트(/)이면 /main으로 리다이렉트
        if (location.pathname === '/') {
          toast.success("이미 로그인한 계정으로 이동합니다.")
          navigate('/main', { replace: true });
        }
      } catch (error: any) {
        console.log('Authentication failed:', error);
        
        // 401 또는 403 에러만 인증 실패로 간주
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          console.log('Unauthorized - clearing auth');
          clearAuth();
          clearUser();
        } else {
          // 500 등 다른 에러는 토큰을 유지하고 앱은 계속 실행
          console.log('Server error - keeping auth, user can retry');
        }
      } finally {
        setIsInitialized(true);
      }
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 빈 배열로 마운트 시 한 번만 실행

  // 초기화가 완료될 때까지 로딩 표시 (선택사항)
  if (!isInitialized) {
    return (
      <Loading/>
    );
  }

  return <>{children}</>;
}
