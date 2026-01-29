import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { reissueToken } from '@/services/auth/auth.api';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// axios 인스턴스의 Authorization 헤더를 설정하는 함수
export const setAuthToken = (token: string | null) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log('Authorization header set');
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
        console.log('Authorization header cleared');
    }
};

// axios 인스턴스의 Authorization 헤더를 제거하는 함수
export const clearAuthToken = () => {
    delete axiosInstance.defaults.headers.common['Authorization'];
    console.log('Authorization header cleared');
};

// Request 인터셉터는 이제 필요 없음 (기본 헤더가 스토어에서 자동 설정됨)
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        console.log('Request interceptor - Authorization header:', config.headers?.Authorization ? 'set' : 'not set');
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
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

        return Promise.reject(error);
    }
);

export default axiosInstance;
