import axiosInstance from '@/lib/axiosInstance';
import type {
  FixedMovementResponse,
  CreateFixedMovementRequest,
  CreateFixedMovementResponse,
  UpdateFixedMovementRequest,
  UpdateFixedMovementResponse,
} from '@/types/fixedMovement';

export const getFixedMovements = async (): Promise<FixedMovementResponse[]> => {
  const response = await axiosInstance.get<FixedMovementResponse[]>('/leaveseat/static');
  return response.data;
};

export const getFixedMovementDetail = async (id: string): Promise<FixedMovementResponse> => {
  const response = await axiosInstance.get<FixedMovementResponse>(`/leaveseat/static/${id}`);
  return response.data;
};

export const createFixedMovement = async (
  data: CreateFixedMovementRequest,
): Promise<CreateFixedMovementResponse> => {
  const response = await axiosInstance.post<CreateFixedMovementResponse>('/leaveseat/static', data);
  return response.data;
};

export const updateFixedMovement = async (
  id: string,
  data: UpdateFixedMovementRequest,
): Promise<UpdateFixedMovementResponse> => {
  const response = await axiosInstance.patch<UpdateFixedMovementResponse>(
    `/leaveseat/static/${id}`,
    data,
  );
  return response.data;
};

export const deleteFixedMovement = async (
  id: string,
): Promise<{ message: string }> => {
  const response = await axiosInstance.delete<{ message: string }>(
    `/leaveseat/static/${id}`,
  );
  return response.data;
};
