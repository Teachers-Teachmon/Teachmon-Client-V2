import axiosInstance from '@/lib/axiosInstance';
import type { FixedMovementResponse } from '@/types/fixedMovement';

export const getFixedMovements = async (): Promise<FixedMovementResponse[]> => {
  const response = await axiosInstance.get<FixedMovementResponse[]>('/leaveseat/static');
  return response.data;
};
