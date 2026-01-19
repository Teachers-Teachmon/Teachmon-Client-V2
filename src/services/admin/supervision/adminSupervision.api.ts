import axiosInstance from '@/lib/axiosInstance';
import type { SupervisionDay, SupervisionRank } from '@/types/supervision';

export interface FetchSupervisionParams {
  month: number;
  query?: string;
}

export const fetchSupervision = async (
  params: FetchSupervisionParams
): Promise<SupervisionDay[]> => {
  const { data } = await axiosInstance.get('/supervision', { params });
  return data;
};

export interface FetchSupervisionRankParams {
  query?: string;
  order?: 'asc' | 'desc';
}

export const fetchSupervisionRank = async (
  params: FetchSupervisionRankParams
): Promise<SupervisionRank[]> => {
  const { data } = await axiosInstance.get('/supervision/rank', { params });
  return data;
};

export interface FetchAutoScheduleParams {
  start_day: string;
  end_day: string;
}

export const fetchAutoSchedule = async (
  params: FetchAutoScheduleParams
): Promise<SupervisionDay[]> => {
  const { data } = await axiosInstance.get('/supervision/schedule/auto', { params });
  return data;
};

export interface SupervisionSchedulePayload {
  day: string;
  self_study_supervision_teacher_id: number | null;
  leave_seat_supervision_teacher_id: number | null;
}

export const createSupervisionSchedule = async (payload: SupervisionSchedulePayload) => {
  const { data } = await axiosInstance.post('/supervision/schedule', payload);
  return data;
};

export const updateSupervisionSchedule = async (payload: SupervisionSchedulePayload) => {
  const { data } = await axiosInstance.patch('/supervision/schedule', payload);
  return data;
};

export interface DeleteSupervisionSchedulePayload {
  day: string;
  type: 'self_study' | 'leave_seat' | 'all';
}

export const deleteSupervisionSchedule = async (payload: DeleteSupervisionSchedulePayload) => {
  const { data } = await axiosInstance.delete('/supervision/schedule', { data: payload });
  return data;
};
