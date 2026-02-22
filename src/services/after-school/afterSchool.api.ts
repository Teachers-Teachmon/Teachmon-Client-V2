import axiosInstance from '@/lib/axiosInstance';
import type { AfterSchoolResponse, AfterSchoolRequestParams, CreateAfterSchoolRequest, UpdateAfterSchoolRequest } from '@/types/afterSchool';
import type {
  TodayAfterSchool,
  MyAfterSchool,
  AllAfterSchool,
  AfterSchoolSearchParams,
} from '@/types/after-school';

export const getAfterSchoolClasses = async (
  params: AfterSchoolRequestParams,
): Promise<AfterSchoolResponse[]> => {
  const response = await axiosInstance.get<AfterSchoolResponse[]>(
    '/afterschool',
    { params },
  );
  return response.data;
};

export const createAfterSchoolClass = async (
  data: CreateAfterSchoolRequest,
): Promise<{ message: string }> => {
  const response = await axiosInstance.post<{ message: string }>(
    '/afterschool',
    data,
  );
  return response.data;
};

export const updateAfterSchoolClass = async (
  data: UpdateAfterSchoolRequest,
): Promise<{ message: string }> => {
  const response = await axiosInstance.patch<{ message: string }>(
    '/afterschool',
    data,
  );
  return response.data;
};

export const deleteAfterSchoolClass = async (
  afterSchoolId: number,
): Promise<{ message: string }> => {
  const response = await axiosInstance.delete<{ message: string }>(
    '/afterschool',
    { data: { after_school_id: afterSchoolId } },
  );
  return response.data;
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

export const getBranchInfo = async (): Promise<{
  number: number;
  start_day: string;
  end_day: string;
}[]> => {
  const response = await axiosInstance.get('/branch');
  return response.data;
};

export const createAfterSchoolBusinessTrip = async (data: {
  day: string;
  afterschool_id: string;
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
