import axiosInstance from '@/lib/axiosInstance';
import type { AffordableReinforcement, PlaceSearchResult } from '@/types/afterSchool';

export interface FetchAffordableReinforcementParams {
  month: number;
  afterschoolid: string | number;
}

export const fetchAffordableReinforcement = async (
  params: FetchAffordableReinforcementParams
): Promise<AffordableReinforcement[]> => {
  const { data } = await axiosInstance.get('/afterschool/reinforcement/affordable', { params });
  return data;
};

export const searchPlace = async (query: string): Promise<PlaceSearchResult[]> => {
  const { data } = await axiosInstance.get('/search/place', { params: { query } });
  return data;
};

export interface ReinforcementRequestPayload {
  day: string;
  afterschool_id: number;
  change_start_period: number;
  change_end_period: number;
  change_place_id: number;
}

export const requestReinforcement = async (payload: ReinforcementRequestPayload) => {
  const { data } = await axiosInstance.post('/afterschool/reinforcement', payload);
  return data;
};
