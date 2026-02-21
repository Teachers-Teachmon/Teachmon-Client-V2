import axiosInstance from '@/lib/axiosInstance';
import type { TeacherAPI, UserRoleAPI } from '@/types/admin';

// Types
export type Teacher = TeacherAPI;

export interface Student {
  id: number | string; // json-bigint로 큰 숫자는 문자열, 작은 숫자는 number로 처리됨
  name: string;
  grade: number;
  classNumber: number;
  number: number;
}

export interface CreateTeacherRequest {
  role: UserRoleAPI;
  name: string;
  email: string;
}

export interface UpdateTeacherRequest {
  teacher_id: string;
  role?: UserRoleAPI;
  name?: string;
}

export interface DeleteTeacherRequest {
  teacher_id: string;
}

export type ForbiddenDay = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export interface CreateStudentRequest {
  name: string;
  grade: number;
  classNumber: number;
  number: number;
}

export interface UpdateStudentRequest {
  id: string;
  name?: string;
  grade?: number;
  classNumber?: number;
  number?: number;
}

export interface DeleteStudentRequest {
  id: string;
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
  const { teacher_id, ...updateData } = data;
  const response = await axiosInstance.patch<MessageResponse>(`/teacher/${teacher_id}`, updateData);
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
  const { classNumber, ...rest } = data;
  const response = await axiosInstance.post<MessageResponse>('/student', {
    ...rest,
    class: classNumber
  });
  return response.data;
};

export const updateStudent = async (data: UpdateStudentRequest): Promise<MessageResponse> => {
  const { id, classNumber, ...rest } = data;
  const response = await axiosInstance.patch<MessageResponse>(`/student/${id}`, {
    ...rest,
    class: classNumber
  });
  return response.data;
};

export const deleteStudent = async (data: DeleteStudentRequest): Promise<MessageResponse> => {
  const response = await axiosInstance.delete<MessageResponse>(`/student/${data.id}`);
  return response.data;
};
