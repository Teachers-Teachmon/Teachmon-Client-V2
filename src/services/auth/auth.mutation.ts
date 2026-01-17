import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendAuthCode, logout } from './auth.api';
import { useUserStore } from '@/stores/useUserStore';

export const useAuthCodeMutation = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: sendAuthCode,
    onSuccess: ({ access_token, user }) => {
      // 토큰 저장
      localStorage.setItem('accessToken', access_token);
      
      // 유저 정보 저장 (Zustand store에 저장하면 자동으로 localStorage에도 저장됨)
      setUser(user);
      
      toast.success('로그인 성공!');
      navigate('/main');
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

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate('/');
      toast.success('로그아웃되었습니다.');
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
      navigate('/');
      toast.error('로그아웃 중 오류가 발생했습니다.');
    },
    onSettled: () => {
      // 토큰 삭제
      localStorage.removeItem('accessToken');
      
      // 유저 정보 삭제 (Zustand store에서 삭제하면 자동으로 localStorage에서도 삭제됨)
      clearUser();
    },
  });
};
