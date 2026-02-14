import axiosInstance from '@/lib/axiosInstance';
import type { AfterSchoolResponse, AfterSchoolRequestParams, CreateAfterSchoolRequest, UpdateAfterSchoolRequest } from '@/types/afterSchool';

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
