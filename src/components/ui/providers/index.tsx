import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';
import { reissueToken, getCurrentUser } from '@/services/auth/auth.api';
import Loading from '../loading';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const { setAccessToken, clearAuth } = useAuthStore();
  const { setUser, clearUser } = useUserStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        // 리프레시 토큰으로 새 액세스 토큰 발급 시도
        const response = await reissueToken();
        setAccessToken(response.access_token);
        
        // 유저 정보를 별도로 요청
        try {
          const user = await getCurrentUser();
          setUser(user);
        } catch (error) {
          console.error('Failed to fetch user info:', error);
          // 유저 정보 조회 실패 시 인증 정보 초기화
          clearAuth();
          clearUser();
        }
      } catch (error) {
        // 리프레시 토큰이 없거나 만료된 경우 로그아웃 처리
        console.log('No valid refresh token, user needs to login');
        clearAuth();
        clearUser();
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
