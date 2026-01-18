import axiosInstance from '@/lib/axiosInstance';

// Types
export interface Student {
  id: number;
  name: string;
  grade: number;
  class: number;
  number: number;
}

export interface Place {
  id: number;
  name: string;
  floor: number;
}

// APIs
export const searchStudents = async (query?: string): Promise<Student[]> => {
  const params = query ? { query } : {};
  const response = await axiosInstance.get<Student[]>('/search/student', { params });
  return response.data;
};

export const searchPlaces = async (query?: string): Promise<Place[]> => {
  const params = query ? { query } : {};
  const response = await axiosInstance.get<Place[]>('/search/place', { params });
  return response.data;
};
