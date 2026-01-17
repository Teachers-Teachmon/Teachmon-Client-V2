import axiosInstance from '@/lib/axiosInstance';

// Types
export interface Teacher {
  teacher_id: number;
  role: 'ADMIN' | 'TEACHER';
  name: string;
  email: string;
  supervision_count: number;
}

export interface Student {
  id: number;
  name: string;
  grade: number;
  class: number;
  number: number;
}

export interface UpdateTeacherRequest {
  teacher_id: number;
  role?: 'ADMIN' | 'TEACHER';
  name?: string;
  email?: string;
}

export interface DeleteTeacherRequest {
  teacher_id: number;
}

export type ForbiddenDay = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export interface SetForbiddenDateRequest {
  days: ForbiddenDay[];
}

export interface CreateStudentRequest {
  name: string;
  grade: number;
  class: number;
  number: number;
}

export interface UpdateStudentRequest {
  id: number;
  name?: string;
  grade?: number;
  class?: number;
  number?: number;
}

export interface DeleteStudentRequest {
  id: number;
}

export interface MessageResponse {
  message: string;
}

// Teacher APIs
export const getAllTeachers = async (query?: string): Promise<Teacher[]> => {
  const params = query ? { query } : {};
  const response = await axiosInstance.get<Teacher[]>('/teacher', { params });
  return response.data;
};

export const updateTeacher = async (data: UpdateTeacherRequest): Promise<MessageResponse> => {
  const response = await axiosInstance.patch<MessageResponse>('/teacher', data);
  return response.data;
};

export const deleteTeacher = async (data: DeleteTeacherRequest): Promise<MessageResponse> => {
  const response = await axiosInstance.delete<MessageResponse>('/teacher', { data });
  return response.data;
};

// Forbidden Date APIs
export const getForbiddenDates = async (): Promise<ForbiddenDay[]> => {
  const response = await axiosInstance.get<ForbiddenDay[]>('/forbidden-date');
  return response.data;
};

export const setForbiddenDates = async (data: SetForbiddenDateRequest): Promise<MessageResponse> => {
  const response = await axiosInstance.post<MessageResponse>('/forbidden-date', data);
  return response.data;
};

// Student APIs
export const searchStudents = async (query?: string): Promise<Student[]> => {
  const params = query ? { query } : {};
  const response = await axiosInstance.get<Student[]>('/search/student', { params });
  return response.data;
};

export const createStudent = async (data: CreateStudentRequest): Promise<MessageResponse> => {
  const response = await axiosInstance.post<MessageResponse>('/student', data);
  return response.data;
};

export const updateStudent = async (data: UpdateStudentRequest): Promise<MessageResponse> => {
  const response = await axiosInstance.patch<MessageResponse>('/student', data);
  return response.data;
};

export const deleteStudent = async (data: DeleteStudentRequest): Promise<MessageResponse> => {
  const response = await axiosInstance.delete<MessageResponse>('/student', { data });
  return response.data;
};
