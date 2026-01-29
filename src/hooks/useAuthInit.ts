import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';
import { reissueToken } from '@/services/auth/auth.api';

export const useAuthInit = () => {
  const { setAccessToken, setInitialized, clearAuth } = useAuthStore();
  const { clearUser } = useUserStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        // 리프레시 토큰으로 새 액세스 토큰 발급 시도
        const { access_token } = await reissueToken();
        setAccessToken(access_token);
        setInitialized(true);
      } catch (error) {
        // 리프레시 토큰이 없거나 만료된 경우 로그아웃 처리
        console.log('No valid refresh token, user needs to login');
        clearAuth();
        clearUser();
        setInitialized(true);
      }
    };

    initAuth();
  }, [setAccessToken, setInitialized, clearAuth, clearUser]);
};
