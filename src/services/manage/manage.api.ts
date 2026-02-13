import axiosInstance from '@/lib/axiosInstance';

// Enums
export type StudentState = 
  | 'LEAVE_SEAT'
  | 'AFTER_SCHOOL'
  | 'SELF_STUDY'
  | 'ADDITIONAL_SELF_STUDY'
  | 'EARLY_LEAVE'
  | 'EVASION'
  | 'AWAY'
  | 'EXIT';

export type Period = 
  | 'ONE_PERIOD'
  | 'TWO_PERIOD'
  | 'THREE_PERIOD'
  | 'FOUR_PERIOD'
  | 'FIVE_PERIOD'
  | 'SIX_PERIOD'
  | 'SEVEN_PERIOD'
  | 'EIGHT_AND_NINE_PERIOD'
  | 'TEN_AND_ELEVEN_PERIOD';

// Types
export interface StudentSchedule {
  student_id: number;
  number: number;
  name: string;
  state: StudentState | null;
  schedule_id: number;
}

export interface ClassSchedule {
  class: number;
  students: StudentSchedule[];
}

export interface GetStudentScheduleParams {
  grade: number;
  period: Period;
  day?: string; // 예시: 2026-01-01
}

export interface UpdateStudentScheduleRequest {
  schedule_id: number;
  state: StudentState;
}

export interface PlaceSchedule {
  place_id: number;
  place_name: string;
  students: StudentSchedule[];
}

export interface GetPlacesByFloorParams {
  floor: number;
  day?: string;
  period?: Period;
}

export interface PlaceStatus {
  place_id: number;
  place_name: string;
  state: StudentState;
}

export interface EvasionRecord {
  exit_id: number;
  day: string;
  teacher: string;
  number: number;
  name: string;
  period: Period;
}

export interface MessageResponse {
  message: string;
}

export interface FloorStatus {
  floor: number;
  count: number;
}

export interface GetAllFloorsStatusParams {
  day?: string; // 예시: 2026-01-01
  period?: Period;
}

export interface GetScheduleHistoryParams {
  day?: string; // 예시: 2026-01-01
  query?: string; // 예시: 2115허온
}

export interface PeriodScheduleInfo {
  schedule_id: number;
  state: StudentState | null;
}

export interface ScheduleHistoryRecord {
  student_number: number;
  name: string;
  ONE_PERIOD: PeriodScheduleInfo | null;
  TWO_PERIOD: PeriodScheduleInfo | null;
  THREE_PERIOD: PeriodScheduleInfo | null;
  FOUR_PERIOD: PeriodScheduleInfo | null;
  FIVE_PERIOD: PeriodScheduleInfo | null;
  SIX_PERIOD: PeriodScheduleInfo | null;
  SEVEN_PERIOD: PeriodScheduleInfo | null;
  EIGHT_AND_NINE_PERIOD: PeriodScheduleInfo | null;
  TEN_AND_ELEVEN_PERIOD: PeriodScheduleInfo | null;
}

// APIs

// 학년별 학생 전체 스케줄 조회
export const getStudentSchedule = async (params: GetStudentScheduleParams): Promise<ClassSchedule[]> => {
  const response = await axiosInstance.get<ClassSchedule[]>('/student-schedule', { params });
export const getStudentSchedule = async (params: GetStudentScheduleParams): Promise<ClassSchedule[]> => {
  const response = await axiosInstance.get<ClassSchedule[]>('/student-schedule', { params });
  return response.data;
};

// 학생 스케줄 변경 (조퇴, 이탈로 처리)
// 학생 스케줄 변경 (조퇴, 이탈로 처리)
export const updateStudentSchedule = async (data: UpdateStudentScheduleRequest): Promise<MessageResponse> => {
  const { schedule_id, state } = data;
  const response = await axiosInstance.patch<MessageResponse>(`/student-schedule/${schedule_id}`, { state });
  return response.data;
};

// 학생 스케줄 변경 취소 (조퇴, 이탈로 처리)
export const cancelStudentSchedule = async (scheduleId: number, state: StudentState): Promise<MessageResponse> => {
  const response = await axiosInstance.delete<MessageResponse>(`/student-schedule/${scheduleId}`, { data: { state } });
  return response.data;
};

// 장소별 학생 스케줄 상태 조회
export const getPlaceSchedule = async (placeId: number, params?: { day?: string; period?: Period }): Promise<PlaceSchedule> => {
  const response = await axiosInstance.get<PlaceSchedule>(`/student-schedule/place/${placeId}`, { params });
  return response.data;
};

// 층별 장소 상태 조회
export const getPlacesByFloor = async (params: GetPlacesByFloorParams): Promise<PlaceStatus[]> => {
  const response = await axiosInstance.get<PlaceStatus[]>('/student-schedule/place', { params });
  return response.data;
};


// 모든 층 상태 조회 (각 층에 이석/자습 상태의 교실이 몇 곳인지)
export const getAllFloorsStatus = async (params?: GetAllFloorsStatusParams): Promise<FloorStatus[]> => {
  const response = await axiosInstance.get<FloorStatus[]>('/student-schedule/place/state', { params });
  return response.data;
};

// 이탈 학생 조회 (일간)
export const getDailyEvasion = async (day: string): Promise<EvasionRecord[]> => {
  const response = await axiosInstance.get<EvasionRecord[]>('/exit/history', { params: { day } });
  return response.data;
};

// 학생 스케줄 기록 전체 조회
export const getScheduleHistory = async (params?: GetScheduleHistoryParams): Promise<ScheduleHistoryRecord[]> => {
  const response = await axiosInstance.get<ScheduleHistoryRecord[]>('/student-schedule/history', { params });
  return response.data;
};

// 이탈 기록 삭제
export const deleteEvasionRecord = async (exitId: number): Promise<MessageResponse> => {
  const response = await axiosInstance.delete<MessageResponse>(`/exit/${exitId}`);
  return response.data;
};

// 이탈 기록 삭제
export const deleteEvasionRecord = async (exitId: number): Promise<MessageResponse> => {
  const response = await axiosInstance.delete<MessageResponse>(`/exit/${exitId}`);
  return response.data;
};
export const getWeeklyExitHistory = async () => {
  const { data } = await axiosInstance.get<ExitHistoryResponse[]>('/exit/history/week');
  return data;
};