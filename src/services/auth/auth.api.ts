import axiosInstance from '@/lib/axiosInstance';

export interface UserInfo {
  id: string;
  name: string;
  profileImage: string;
}

interface AuthCodeResponse {
  access_token: string;
  user: UserInfo;
}

interface ReissueTokenResponse {
  access_token: string;
}

interface LoginUrlResponse {
  url: string;
}

export const getLoginUrl = async (): Promise<LoginUrlResponse> => {
  const response = await axiosInstance.get<LoginUrlResponse>('/auth/login');
  return response.data;
};

export const sendAuthCode = async (code: string): Promise<AuthCodeResponse> => {
  const response = await axiosInstance.post<AuthCodeResponse>('/auth/code', { code });
  return response.data;
};

export const reissueToken = async (): Promise<ReissueTokenResponse> => {
  const response = await axiosInstance.post<ReissueTokenResponse>('/auth/reissue');
  return response.data;
};

export const logout = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
};
