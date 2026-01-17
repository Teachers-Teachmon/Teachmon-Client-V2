import axiosInstance from '@/lib/axiosInstance';
import type { Period, Reason } from '@/constants/movement';

// Types
export interface LeaveSeat {
  leaveseat_id: number;
  period: Period;
  teacher: string;
  place: string;
  personnel: number;
  students: string[];
}

export interface LeaveSeatDetail {
  leaveseat_id: number;
  period: Period;
  reason: Reason;
  teacher: string;
  place: string;
  personnel: number;
  items: string;
  students: string[];
}

export interface GetLeaveSeatListParams {
  day: string;
  period: Period;
}

export interface CreateLeaveSeatRequest {
  period: Period;
  reason: Reason;
  place: string;
  items?: string;
  students: string[];
}

export interface UpdateLeaveSeatRequest {
  period?: Period;
  reason?: Reason;
  place?: string;
  items?: string;
  students?: string[];
}

export interface MessageResponse {
  message: string;
}

// APIs
export const getLeaveSeatList = async (params: GetLeaveSeatListParams): Promise<LeaveSeat[]> => {
  const response = await axiosInstance.get<LeaveSeat[]>('/leaveseat', { params });
  return response.data;
};

export const getLeaveSeatDetail = async (leaveseatId: number): Promise<LeaveSeatDetail> => {
  const response = await axiosInstance.get<LeaveSeatDetail>(`/leaveseat/${leaveseatId}`);
  return response.data;
};

export const createLeaveSeat = async (data: CreateLeaveSeatRequest): Promise<MessageResponse> => {
  const response = await axiosInstance.post<MessageResponse>('/leaveseat', data);
  return response.data;
};

export const updateLeaveSeat = async (
  leaveseatId: number,
  data: UpdateLeaveSeatRequest
): Promise<MessageResponse> => {
  const response = await axiosInstance.patch<MessageResponse>(`/leaveseat/${leaveseatId}`, data);
  return response.data;
};

export const deleteLeaveSeat = async (leaveseatId: number): Promise<MessageResponse> => {
  const response = await axiosInstance.delete<MessageResponse>(`/leaveseat/${leaveseatId}`);
  return response.data;
};
