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
      } catch (error) {
        // 리프레시 토큰이 없거나 만료된 경우, 또는 유저 정보 조회 실패 시
        console.log('Authentication failed:', error);
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
