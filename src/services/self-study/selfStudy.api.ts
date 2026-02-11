import axiosInstance from '@/lib/axiosInstance';
import type {
  AdditionalSelfStudyResponse,
  CreateAdditionalSelfStudyRequest,
} from '@/types/selfStudy';

export const getAdditionalSelfStudy = async (
  year: number,
): Promise<AdditionalSelfStudyResponse[]> => {
  const response = await axiosInstance.get<AdditionalSelfStudyResponse[]>(
    '/self-study/additional',
    { params: { year } },
  );
  return response.data;
};

export const createAdditionalSelfStudy = async (
  data: CreateAdditionalSelfStudyRequest,
): Promise<{ message: string }> => {
  const response = await axiosInstance.post<{ message: string }>(
    '/self-study/additional',
    data,
  );
  return response.data;
};

export const deleteAdditionalSelfStudy = async (
  additionalId: number,
): Promise<{ message: string }> => {
  const response = await axiosInstance.delete<{ message: string }>(
    `/self-study/additional/${additionalId}`,
  );
  return response.data;
};
