import axiosInstance from '@/lib/axiosInstance';

export interface SupervisionRankResponse {
  rank: number;
  name: string;
  self_study_supervision_count: number;
  leave_seat_supervision_count: number;
  total_supervision_count: number;
}

export const getSupervisionRank = async () => {
  const { data } = await axiosInstance.get<SupervisionRankResponse[]>('/rank/supervision');
  return data;
};
