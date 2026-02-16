import axiosInstance from '@/lib/axiosInstance';
import type {
  TeamResponse,
  CreateTeamRequest,
  UpdateTeamRequest,
  DeleteTeamRequest,
} from '@/types/fixedMovement';

export const getTeams = async (): Promise<TeamResponse[]> => {
  const response = await axiosInstance.get<TeamResponse[]>('/team/search/all');
  return response.data;
};

export const getTeamById = async (id: string): Promise<TeamResponse> => {
  const response = await axiosInstance.get<TeamResponse>(`/team/${id}`);
  return response.data;
};

export const createTeam = async (
  data: CreateTeamRequest,
): Promise<{ message: string }> => {
  const response = await axiosInstance.post<{ message: string }>('/team', data);
  return response.data;
};

export const updateTeam = async (
  data: UpdateTeamRequest,
): Promise<{ message: string }> => {
  const response = await axiosInstance.patch<{ message: string }>('/team', data);
  return response.data;
};

export const deleteTeam = async (
  data: DeleteTeamRequest,
): Promise<{ message: string }> => {
  const response = await axiosInstance.delete<{ message: string }>('/team', { data });
  return response.data;
};
