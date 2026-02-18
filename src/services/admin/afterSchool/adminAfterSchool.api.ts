import axiosInstance from '@/lib/axiosInstance';

export interface AfterSchoolSearchItem {
  id: number;
  name: string;
}

export const searchAfterSchool = async (query: string): Promise<AfterSchoolSearchItem[]> => {
  const { data } = await axiosInstance.get('/afterschool/search', { params: { query } });
  return data;
};

export interface AffordableScheduleItem {
  day: string;
  start_period: number;
  end_period: number;
}

interface BusinessTripAffordableResponse {
  dates: string[];
}

export interface FetchAffordableParams {
  month: number;
  afterschoolid: number | string;
}

export const fetchBusinessTripAffordable = async (afterschoolid: number | string): Promise<string[]> => {
  const { data } = await axiosInstance.get<BusinessTripAffordableResponse>(
    `/afterschool/business-trip/affordable/${afterschoolid}`
  );
  return data.dates;
};

export const fetchReinforcementAffordable = async (
  params: FetchAffordableParams
): Promise<AffordableScheduleItem[]> => {
  const { data } = await axiosInstance.get('/afterschool/reinforcement/affordable', { params });
  return data;
};

export interface BusinessTripPayload {
  day: string;
  afterschool_id: number;
}

export const requestBusinessTrip = async (payload: BusinessTripPayload) => {
  const { data } = await axiosInstance.post('/afterschool/business-trip', payload);
  return data;
};

export interface PlaceSearchItem {
  id: number;
  name: string;
  floor: number;
}

export const searchPlace = async (query: string): Promise<PlaceSearchItem[]> => {
  const { data } = await axiosInstance.get('/place/search', { params: { query } });
  return data;
};

export interface ReinforcementPayload {
  day: string;
  afterschool_id: number;
  change_period: ReinforcementPeriod;
  change_place_id: number;
}

export type ReinforcementPeriod =
  | 'EIGHT_AND_NINE_PERIOD'
  | 'TEN_AND_ELEVEN_PERIOD';

export const requestReinforcement = async (payload: ReinforcementPayload) => {
  const { data } = await axiosInstance.post('/afterschool/reinforcement', payload);
  return data;
};
