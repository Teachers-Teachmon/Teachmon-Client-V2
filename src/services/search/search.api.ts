import axiosInstance from '@/lib/axiosInstance';
import type {
  StudentSearchResponse,
  PlaceSearchResponse,
  TeamSearchResponse,
  TeacherSearchResponse,
} from '@/types/search';

export const searchStudents = async (query: string): Promise<StudentSearchResponse[]> => {
  const response = await axiosInstance.get<StudentSearchResponse[]>('/student/search', {
    params: { query },
  });
  return response.data;
};

export const searchPlaces = async (query: string): Promise<PlaceSearchResponse[]> => {
  const response = await axiosInstance.get<PlaceSearchResponse[]>('/place/search', {
    params: { query },
  });
  return response.data;
};

export const searchTeams = async (query: string): Promise<TeamSearchResponse[]> => {
  const response = await axiosInstance.get<TeamSearchResponse[]>('/team/search', {
    params: { query },
  });
  return response.data;
};

export const searchTeachers = async (query: string): Promise<TeacherSearchResponse[]> => {
  const response = await axiosInstance.get<TeacherSearchResponse[]>('/teacher/search', {
    params: { query },
  });
  return response.data;
};
