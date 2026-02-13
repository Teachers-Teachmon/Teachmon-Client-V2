import axiosInstance from '@/lib/axiosInstance';
import type { AfterSchoolResponse, AfterSchoolRequestParams, CreateAfterSchoolRequest } from '@/types/afterSchool';

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
