import axiosInstance from '@/lib/axiosInstance';
import type { SupervisionDay } from '@/types/supervision';

export interface FetchSupervisionParams {
  month: number;
  query?: string;
}

export const fetchSupervision = async (params: FetchSupervisionParams): Promise<SupervisionDay[]> => {
  const { data } = await axiosInstance.get('/supervision', { params });
  return data;
};

export interface RequestExchangePayload {
  requestor_supervision_id: string;
  change_supervision_id: string;
  reason: string;
}

export const requestSupervisionExchange = async (payload: RequestExchangePayload) => {
  const { data } = await axiosInstance.post('/supervision/exchange', payload);
  return data;
};
