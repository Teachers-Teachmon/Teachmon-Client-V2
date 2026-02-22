import axiosInstance from '@/lib/axiosInstance';

export interface UserInfo {
  id: string;
  name: string;
  profile: string;
}

interface AuthCodeResponse {
  access_token: string;
}

interface ReissueTokenResponse {
  access_token: string;
}

export const sendAuthCode = async (code: string): Promise<AuthCodeResponse> => {
  const response = await axiosInstance.post<AuthCodeResponse>('/auth/code', { code });
  return response.data;
};

export const reissueToken = async (): Promise<ReissueTokenResponse> => {
  const response = await axiosInstance.post<ReissueTokenResponse>('/auth/reissue', {}, {
    skipErrorToast: true, // 리이슈 실패 시 toast 표시 안함
  });
  return response.data;
};

export const logout = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
};

export const getCurrentUser = async (): Promise<UserInfo> => {
  const response = await axiosInstance.get<UserInfo>('/teacher/me');
  return response.data;
};
