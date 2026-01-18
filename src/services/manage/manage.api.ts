import axiosInstance from '@/lib/axiosInstance';

// Enums
export type StudentState = 
  | 'LEAVE_SEAT'
  | 'AFTER_SCHOOL'
  | 'SELF_STUDY'
  | 'EARLY_LEAVE'
  | 'EVASION';

export type Period = 
  | 'SEVEN_PERIOD'
  | 'EIGHT_AND_NINE_PERIOD'
  | 'TEN_AND_ELEVEN_PERIOD';

// Types
export interface StudentSchedule {
  number: number;
  name: string;
  state: StudentState;
}

export interface GetStudentScheduleParams {
  grade: number;
  period: Period;
}

export interface UpdateStudentScheduleRequest {
  student_id: number;
  state: StudentState;
  period: Period;
}

export interface PlaceSchedule {
  place_id: number;
  place_name: string;
  students: StudentSchedule[];
}

export interface GetPlacesByFloorParams {
  floor: number;
}

export interface EvasionRecord {
  leaveseat_id: number;
  student_number: number;
  student_name: string;
  reason: string;
  date: string;
}

export interface MessageResponse {
  message: string;
}

// APIs

// 학년별 학생 전체 스케줄 조회
export const getStudentSchedule = async (params: GetStudentScheduleParams): Promise<StudentSchedule[]> => {
  const response = await axiosInstance.get<StudentSchedule[]>('/student-schedule', { params });
  return response.data;
};

// 학생 스케줄 변경 (조퇴/이탈 등)
export const updateStudentSchedule = async (data: UpdateStudentScheduleRequest): Promise<MessageResponse> => {
  const response = await axiosInstance.patch<MessageResponse>('/student-schedule', data);
  return response.data;
};

// 장소별 학생 스케줄 상태 조회
export const getPlaceSchedule = async (placeId: number): Promise<PlaceSchedule> => {
  const response = await axiosInstance.get<PlaceSchedule>(`/student-schedule/place/${placeId}`);
  return response.data;
};

// 층별 장소 상태 조회
export const getPlacesByFloor = async (params: GetPlacesByFloorParams): Promise<any> => {
  const response = await axiosInstance.get('/student-schedule/place', { params });
  return response.data;
};

// 모든 층 상태 조회 (각 층에 몇 곳의 교실이 있는지)
export const getAllFloorsStatus = async (): Promise<number[]> => {
  const response = await axiosInstance.get<number[]>('/student-schedule/place');
  return response.data;
};

// 이탈 학생 조회 (일간)
export const getDailyEvasion = async (date: string): Promise<EvasionRecord[]> => {
  const response = await axiosInstance.get<EvasionRecord[]>('/leaveseat/daily', { params: { date } });
  return response.data;
};

// 학생 스케줄 기록 전체 조회
export const getScheduleHistory = async (studentId?: number): Promise<any> => {
  const params = studentId ? { student_id: studentId } : {};
  const response = await axiosInstance.get('/student-schedule/history', { params });
  return response.data;
};
