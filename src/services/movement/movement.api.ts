import axiosInstance from '@/lib/axiosInstance';
import type {
  LeaveSeat,
  LeaveSeatDetail,
  GetLeaveSeatListParams,
  CreateLeaveSeatRequest,
  UpdateLeaveSeatRequest,
  MessageResponse,
} from '@/types/movement';

// APIs
export const getLeaveSeatList = async (params: GetLeaveSeatListParams): Promise<LeaveSeat[]> => {
  const response = await axiosInstance.get<LeaveSeat[]>('/leaveseat', { params });
  return response.data;
};

export const getLeaveSeatDetail = async (leaveseatId: string): Promise<LeaveSeatDetail> => {
  const response = await axiosInstance.get<LeaveSeatDetail>(`/leaveseat/${leaveseatId}`);
  return response.data;
};

export const createLeaveSeat = async (data: CreateLeaveSeatRequest): Promise<MessageResponse> => {
  const response = await axiosInstance.post<MessageResponse>('/leaveseat', data);
  return response.data;
};

export const updateLeaveSeat = async (
  leaveseatId: string,
  data: UpdateLeaveSeatRequest
): Promise<MessageResponse> => {
  const response = await axiosInstance.patch<MessageResponse>(`/leaveseat/${leaveseatId}`, data);
  return response.data;
};

export const deleteLeaveSeat = async (leaveseatId: string): Promise<MessageResponse> => {
  const response = await axiosInstance.delete<MessageResponse>(`/leaveseat/${leaveseatId}`);
  return response.data;
};
