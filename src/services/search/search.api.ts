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
  const response = await axiosInstance.get<Student[]>('/student/search', { 
    params: { query: query ?? '' } 
  });
  return response.data;
};