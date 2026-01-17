import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
<<<<<<< HEAD
import { useLoadingStore } from '@/stores/useLoadingStore';
=======
import { reissueToken } from '@/services/auth/auth.api';
>>>>>>> 888f11d (feat/TC-29 :: 인증/인가 프론트 api 제작)

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (!config.skipLoading) {
            useLoadingStore.getState().startLoading();
        }

        const token = localStorage.getItem('accessToken');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        useLoadingStore.getState().stopLoading();
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        if (!response.config.skipLoading) {
            useLoadingStore.getState().stopLoading();
        }
        return response;
    },
    async (error: AxiosError) => {
<<<<<<< HEAD
        if (!error.config?.skipLoading) {
            useLoadingStore.getState().stopLoading();
=======
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // 401 에러이고 재시도하지 않은 경우
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // 토큰 재발급 요청
                const { access_token } = await reissueToken();
                
                // 새 토큰 저장
                localStorage.setItem('accessToken', access_token);

                // 원래 요청에 새 토큰 적용
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${access_token}`;
                }

                // 원래 요청 재시도
                return axiosInstance(originalRequest);
            } catch (reissueError) {
                // 토큰 재발급 실패 시 로그아웃 처리
                localStorage.removeItem('accessToken');
                window.location.href = '/';
                return Promise.reject(reissueError);
            }
>>>>>>> 888f11d (feat/TC-29 :: 인증/인가 프론트 api 제작)
        }

        // TODO: 인증/인가 구현시 한번에 구현예정
        return Promise.reject(error);
    }
);

export default axiosInstance;
