import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { reissueToken } from '@/services/auth/auth.api';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';
import { useLoadingStore } from '@/stores/useLoadingStore';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Request 인터셉터 - 디버깅용
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        console.log('Request interceptor - Authorization header:', config.headers?.Authorization ? 'set' : 'not set');
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
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // 401 에러이고 재시도하지 않은 경우
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // 토큰 재발급 요청
                const { access_token } = await reissueToken();
                
                // 새 토큰을 메모리에 저장 (자동으로 axios 기본 헤더도 업데이트됨)
                useAuthStore.getState().setAccessToken(access_token);

                // 원래 요청 재시도 (기본 헤더가 이미 업데이트되어 있음)
                return axiosInstance(originalRequest);
            } catch (reissueError) {
                // 토큰 재발급 실패 시 로그아웃 처리
                useAuthStore.getState().clearAuth();
                useUserStore.getState().clearUser();
                window.location.href = '/';
                return Promise.reject(reissueError);
            }
        }
        
        if (!error.config?.skipLoading) {
            useLoadingStore.getState().stopLoading();
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
