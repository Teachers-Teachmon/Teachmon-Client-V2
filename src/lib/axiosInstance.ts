import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import JSONbig from 'json-bigint';
import { reissueToken } from '@/services/auth/auth.api';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';
import { useLoadingStore } from '@/stores/useLoadingStore';
import { showErrorToast } from '@/utils/error';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const JSONbigNative = JSONbig({ useNativeBigInt: false, storeAsString: true });

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    transformResponse: [(data) => {
        if (typeof data === 'string') {
            try {
                return JSONbigNative.parse(data);
            } catch {
                return data;
            }
        }
        return data;
    }],
});

// Request 인터셉터
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        console.log('Request interceptor - Authorization header:', config.headers?.Authorization ? 'set' : 'not set');
        
        // skipLoading이 true가 아니면 로딩 시작
        if (!config.skipLoading) {
            useLoadingStore.getState().startLoading();
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
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // 401 또는 403 에러이고 재시도하지 않은 경우
        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // 토큰 재발급 요청
                const { access_token } = await reissueToken();
                
                // 새 토큰을 메모리에 저장 (자동으로 axios 기본 헤더도 업데이트됨)
                useAuthStore.getState().setAccessToken(access_token);

                // 원래 요청 재시도 (기본 헤더가 이미 업데이트되어 있음)
                return axiosInstance(originalRequest);
            } catch (reissueError) {
                // 토큰 재발급 실패 시 로그아웃 처리 (toast 없이)
                useAuthStore.getState().clearAuth();
                useUserStore.getState().clearUser();
                
                // 현재 페이지가 루트가 아닐 때만 리다이렉트
                if (window.location.pathname !== '/') {
                    window.location.href = '/';
                }
                
                return Promise.reject(reissueError);
            }
        }
        
        if (!error.config?.skipLoading) {
            useLoadingStore.getState().stopLoading();
        }

        if (!error.config?.skipErrorToast) {
            showErrorToast(error);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;