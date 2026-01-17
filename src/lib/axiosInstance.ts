import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
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
        if (!error.config?.skipLoading) {
            useLoadingStore.getState().stopLoading();
        }

        // TODO: 인증/인가 구현시 한번에 구현예정
        return Promise.reject(error);
    }
);

export default axiosInstance;
