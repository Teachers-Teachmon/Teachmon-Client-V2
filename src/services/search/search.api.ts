import axiosInstance from '@/lib/axiosInstance';

// Types
export interface Student {
  id: number;
  name: string;
  grade: number;
  class: number;
  number: number;
}

// Student Search API
export const searchStudents = async (query?: string): Promise<Student[]> => {
  const params = query ? { query } : {};
  const response = await axiosInstance.get<Student[]>('/search/student', { params });
  return response.data;
};
