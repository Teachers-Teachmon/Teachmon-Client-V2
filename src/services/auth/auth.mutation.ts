import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendAuthCode, logout, getCurrentUser } from './auth.api';
import { useUserStore } from '@/stores/useUserStore';
import { useAuthStore } from '@/stores/useAuthStore';

export const useAuthCodeMutation = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: sendAuthCode,
    onSuccess: async ({ access_token }) => {
      console.log('Access token received:', access_token);
      
      // 토큰을 메모리에 저장
      setAccessToken(access_token);
      
      try {
        // 유저 정보를 별도로 조회
        const user = await getCurrentUser();
        setUser(user);
        
        toast.success('로그인 성공!');
        navigate('/main');
      } catch (error) {
        console.error('유저 정보 조회 실패:', error);
        toast.error('유저 정보를 불러오는데 실패했습니다.');
        navigate('/');
      }
    },
    onError: (error) => {
      console.error('OAuth 인증 실패:', error);
      toast.error('로그인에 실패했습니다.');
      navigate('/');
    },
  });
};

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const clearUser = useUserStore((state) => state.clearUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // 로그아웃 API 성공 후 토큰과 유저 정보 삭제
      clearAuth();
      clearUser();
      
      navigate('/');
      toast.success('로그아웃되었습니다.');
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
      
      // 에러가 발생해도 로컬 상태는 정리
      clearAuth();
      clearUser();
      
      navigate('/');
      toast.error('로그아웃 중 오류가 발생했습니다.');
    },
  });
};
