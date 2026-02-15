import axiosInstance from '@/lib/axiosInstance';
import type { Student, Place, Team } from '@/types/search';

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
