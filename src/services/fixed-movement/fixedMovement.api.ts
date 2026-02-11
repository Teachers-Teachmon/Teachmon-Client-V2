import axiosInstance from '@/lib/axiosInstance';
import type {
  FixedMovementResponse,
  CreateFixedMovementRequest,
  CreateFixedMovementResponse,
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
