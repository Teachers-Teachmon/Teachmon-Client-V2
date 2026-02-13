import axiosInstance from '@/lib/axiosInstance';

// Types
export interface TeamMember {
  id: number;
  number: number;
  name: string;
  grade: number;
  classNumber: number;
}

export interface Team {
  id: number;
  name: string;
  members: TeamMember[];
}

// APIs
export const searchTeams = async (query?: string): Promise<Team[]> => {
  const params = query ? { query } : {};
  const response = await axiosInstance.get<Team[]>('/team/search', { params });
  return response.data;
};
