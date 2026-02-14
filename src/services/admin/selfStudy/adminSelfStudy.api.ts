import axiosInstance from '@/lib/axiosInstance';
import type { SelfStudyQuarterlyItem } from '@/types/selfStudy';

export interface SelfStudyQuarterlyParams {
  year: number;
  branch: number;
  grade: number;
}

export const fetchSelfStudyQuarterly = async (
  params: SelfStudyQuarterlyParams
): Promise<SelfStudyQuarterlyItem[]> => {
  const { data } = await axiosInstance.get('/self-study', { params });
  return data;
};

export const updateSelfStudyQuarterly = async (
  params: SelfStudyQuarterlyParams,
  payload: SelfStudyQuarterlyItem[]
) => {
  const { data } = await axiosInstance.post('/self-study', payload, { params });
  return data;
};
