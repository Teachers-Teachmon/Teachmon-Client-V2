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

export interface SupervisionRankResponse {
  rank: number;
  name: string;
  self_study_supervision_count: number;
  leave_seat_supervision_count: number;
  seventh_period_supervision_count: number;
  total_supervision_count: number;
}

export const getSupervisionRank = async () => {
  const { data } = await axiosInstance.get<SupervisionRankResponse[]>('/supervision/rank');
  return data;
};
