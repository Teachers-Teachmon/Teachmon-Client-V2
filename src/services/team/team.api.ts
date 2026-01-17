import axiosInstance from '@/lib/axiosInstance';

// Types
export interface Team {
  id: number;
  name: string;
}

// APIs
export const searchTeams = async (query?: string): Promise<Team[]> => {
  const params = query ? { query } : {};
  const response = await axiosInstance.get<Team[]>('/search/team', { params });
  return response.data;
};
