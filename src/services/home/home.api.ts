import axiosInstance from '@/lib/axiosInstance';
import type { ExchangeRequest, ExitStudent, SupervisionTodayType } from '@/types/home';

export interface TodaySupervisionResponse {
    type: SupervisionTodayType;
}

export const fetchTodaySupervision = async (): Promise<TodaySupervisionResponse> => {
    const { data } = await axiosInstance.get('/supervision/today');
    return data;
};

export const fetchMySupervisionDays = async (): Promise<string[]> => {
    const { data } = await axiosInstance.get('/supervision/me');
    return data;
};

export const fetchExchangeRequests = async (): Promise<ExchangeRequest[]> => {
    const { data } = await axiosInstance.get('/supervision/exchange');
    return data;
};

export const acceptExchangeRequest = async (exchangeRequestId: number) => {
    const { data } = await axiosInstance.post('/supervision/exchange/accept', {
        exchange_request_id: exchangeRequestId,
    });
    return data;
};

export const rejectExchangeRequest = async (exchangeRequestId: number) => {
    const { data } = await axiosInstance.post('/supervision/exchange/reject', {
        exchange_request_id: exchangeRequestId,
    });
    return data;
};

export const fetchWeeklyExitStudents = async (): Promise<ExitStudent[]> => {
    const { data } = await axiosInstance.get('/supervision/exit/weekly');
    return data;
};
