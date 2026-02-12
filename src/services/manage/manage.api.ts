import axiosInstance from '@/lib/axiosInstance';

export type Period = 'SEVEN_PERIOD' | 'EIGHT_AND_NINE_PERIOD' | 'TEN_AND_ELEVEN_PERIOD';

export interface ExitHistoryResponse {
  exit_id: number;
  day: string;
  teacher: string;
  number: number;
  name: string;
  period: Period;
}

export interface DeleteExitHistoryResponse {
  message: string;
}

export const getWeeklyExitHistory = async () => {
  const { data } = await axiosInstance.get<ExitHistoryResponse[]>('/exit/history/week');
  return data;
};

export const deleteExitHistory = async (exitHistoryId: number) => {
  const { data } = await axiosInstance.delete<DeleteExitHistoryResponse>(
    `/exit/${exitHistoryId}`
  );
  return data;
};
