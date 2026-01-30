import axiosInstance from './axiosInstance';

// axios 인스턴스의 Authorization 헤더를 설정하는 함수
export const setAuthToken = (token: string | null) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log('Authorization header set:', token.substring(0, 20) + '...');
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
        console.log('Authorization header cleared (null token)');
    }
};

// axios 인스턴스의 Authorization 헤더를 제거하는 함수
export const clearAuthToken = () => {
    delete axiosInstance.defaults.headers.common['Authorization'];
    console.log('Authorization header cleared');
};
