import axiosInstance from '@/lib/axiosInstance';

// Types
export interface Student {
  id: number | string; // json-bigint로 큰 숫자는 문자열, 작은 숫자는 number로 처리됨
  name: string;
  grade: number;
  classNumber: number;
  number: number;
}

// Student Search API
export const searchStudents = async (query?: string): Promise<Student[]> => {
  const response = await axiosInstance.get<Student[]>('/student/search', { 
    params: { query: query ?? '' } 
  });
  return response.data;
};