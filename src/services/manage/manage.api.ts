import axiosInstance from '@/lib/axiosInstance';
import type {
  StudentState,
  Period,
  ClassSchedule,
  GetStudentScheduleParams,
  UpdateStudentScheduleRequest,
  PlaceSchedule,
  GetPlacesByFloorParams,
  PlaceStatus,
  EvasionRecord,
  MessageResponse,
  FloorStatus,
  GetAllFloorsStatusParams,
  GetScheduleHistoryParams,
  ScheduleHistoryRecord,
    ExitHistoryResponse,
} from '@/types/manage';

// APIs

// 학년별 학생 전체 스케줄 조회
export const getStudentSchedule = async (params: GetStudentScheduleParams): Promise<ClassSchedule[]> => {
  const response = await axiosInstance.get<ClassSchedule[]>('/student-schedule', { params });
  return response.data;
};

// 학생 스케줄 변경 (조퇴, 이탈로 처리)
export const updateStudentSchedule = async (data: UpdateStudentScheduleRequest): Promise<MessageResponse> => {
  const { schedule_id, state } = data;
  const response = await axiosInstance.patch<MessageResponse>(`/student-schedule/${schedule_id}`, { state }, { skipLoading: true });
  return response.data;
};

// 학생 스케줄 변경 취소 (조퇴, 이탈로 처리)
export const cancelStudentSchedule = async (scheduleId: string, state: StudentState): Promise<MessageResponse> => {
  console.log('cancelStudentSchedule API call:', {
    scheduleId,
    state,
    scheduleIdType: typeof scheduleId,
    url: `/student-schedule/${scheduleId}`
  });
  const response = await axiosInstance.delete<MessageResponse>(`/student-schedule/${scheduleId}`, { data: { state }, skipLoading: true });
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
export const deleteEvasionRecord = async (exitId: number | string): Promise<MessageResponse> => {
  const response = await axiosInstance.delete<MessageResponse>(`/exit/${exitId}`);
  return response.data;
};
export const getWeeklyExitHistory = async () => {
  const { data } = await axiosInstance.get<ExitHistoryResponse[]>('/exit/history/week');
  return data;
};
