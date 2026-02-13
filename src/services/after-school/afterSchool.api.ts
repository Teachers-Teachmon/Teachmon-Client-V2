import axiosInstance from '@/lib/axiosInstance';
import type {
  TodayAfterSchool,
  MyAfterSchool,
  AllAfterSchool,
  AfterSchoolSearchParams,
} from '@/types/after-school';

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
