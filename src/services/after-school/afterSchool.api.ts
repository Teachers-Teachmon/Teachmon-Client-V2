import axiosInstance from '@/lib/axiosInstance';
import type { AffordableReinforcement, PlaceSearchResult } from '@/types/afterSchool';
import type {
  TodayAfterSchool,
  MyAfterSchool,
  AllAfterSchool,
  AfterSchoolSearchParams,
} from '@/types/after-school';

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

export const getMyTodayAfterSchool = async (): Promise<TodayAfterSchool[]> => {
  const response = await axiosInstance.get<TodayAfterSchool[]>('/afterschool/me/today');
  return response.data;
};

export const getMyAfterSchool = async (grade: number): Promise<MyAfterSchool[]> => {
  const response = await axiosInstance.get<MyAfterSchool[]>('/afterschool/me', {
    params: { grade },
  });
  return response.data;
};

export const getAllAfterSchool = async (params: AfterSchoolSearchParams): Promise<AllAfterSchool[]> => {
  const response = await axiosInstance.get<AllAfterSchool[]>('/afterschool', {
    params,
  });
  return response.data;
};

export const createAfterSchoolBusinessTrip = async (data: {
  day: string;
  after_school_id: string;
}): Promise<unknown> => {
  const response = await axiosInstance.post('/afterschool/business-trip', data);
  return response.data;
};

export const quitAfterSchool = async (data: {
  after_school_id: string;
}): Promise<unknown> => {
  const response = await axiosInstance.post('/afterschool/quit', data);
  return response.data;
};
