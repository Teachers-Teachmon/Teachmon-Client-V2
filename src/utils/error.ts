import axios from 'axios';

interface ApiErrorResponse {
  message?: string;
}

export const getApiErrorMessage = (error: unknown, fallback = '요청 처리에 실패했습니다.'): string => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const message = error.response?.data?.message;
    if (typeof message === 'string' && message.trim()) {
      return message;
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
};
