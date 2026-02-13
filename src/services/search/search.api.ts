import axiosInstance from '@/lib/axiosInstance';

// Types
export interface Student {
  id: number;
  name: string;
  grade: number;
  classNumber: number;
  number: number;
}

export interface Place {
  id: number;
  name: string;
  floor: number;
}

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
export const searchStudents = async (query?: string): Promise<Student[]> => {
  const params = query ? { query } : {};
  const response = await axiosInstance.get<Student[]>('/student/search', { params });
  return response.data;
};

export const searchPlaces = async (query?: string): Promise<Place[]> => {
  const params = query ? { query } : {};
  const response = await axiosInstance.get<Place[]>('/place/search', { params });
  return response.data;
};

export const searchTeams = async (query?: string): Promise<Team[]> => {
  const params = query ? { query } : {};
  const response = await axiosInstance.get<Team[]>('/team/search', { params });
  return response.data;
};
