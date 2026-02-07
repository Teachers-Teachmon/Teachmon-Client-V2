import axiosInstance from '@/lib/axiosInstance';

// Types
export interface Teacher {
  teacher_id: string; // json-bigint로 큰 숫자를 문자열로 처리
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

export interface CreateTeacherRequest {
  role: 'ADMIN' | 'TEACHER';
  name: string;
  email: string;
}

export interface UpdateTeacherRequest {
  teacher_id: string;
  role?: 'ADMIN' | 'TEACHER';
  name?: string;
  email?: string;
}

export interface DeleteTeacherRequest {
  teacher_id: string;
}

export type ForbiddenDay = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

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
export const getAllTeachers = async (query: string = ""): Promise<Teacher[]> => {
  const response = await axiosInstance.get<Teacher[]>('/teacher', { 
    params: { query }
  });
  return response.data;
};

export const createTeacher = async (data: CreateTeacherRequest): Promise<MessageResponse> => {
  const response = await axiosInstance.post<MessageResponse>('/teacher', data);
  return response.data;
};

export const updateTeacher = async (data: UpdateTeacherRequest): Promise<MessageResponse> => {
  const response = await axiosInstance.patch<MessageResponse>(`/teacher/${data.teacher_id}`, data);
  return response.data;
};

export const deleteTeacher = async (data: DeleteTeacherRequest): Promise<MessageResponse> => {
  const response = await axiosInstance.delete<MessageResponse>(`/teacher/${data.teacher_id}`);
  return response.data;
};

// Forbidden Date APIs
export const getForbiddenDates = async (teacherId: string): Promise<ForbiddenDay[]> => {
  const response = await axiosInstance.get<ForbiddenDay[]>(`/teacher/${teacherId}/ban`);
  return response.data;
};

export const setForbiddenDates = async (
  teacherId: string,
  weekdays: ForbiddenDay[]
): Promise<MessageResponse> => {
  const response = await axiosInstance.post<MessageResponse>(`/teacher/${teacherId}/ban`, weekdays);
  return response.data;
};

// Student APIs
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
