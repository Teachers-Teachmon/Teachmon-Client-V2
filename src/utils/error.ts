import axios from 'axios';
import { toast } from 'react-toastify';

const DEFAULT_ERROR_MESSAGE = '요청 처리 중 오류가 발생했습니다.';

type ErrorResponse = {
  message?: unknown;
  error?: unknown;
  detail?: unknown;
};

const getMessageFromResponse = (data: unknown): string | null => {
  if (!data) return null;

  if (typeof data === 'string') {
    const trimmed = data.trim();
    return trimmed.length > 0 ? trimmed : null;
  }

  if (typeof data === 'object') {
    const { message, error, detail } = data as ErrorResponse;
    const firstValid = [message, error, detail].find(
      (value): value is string => typeof value === 'string' && value.trim().length > 0
    );
    return firstValid ?? null;
  }

  return null;
};

export const getErrorMessage = (error: unknown, fallback = DEFAULT_ERROR_MESSAGE): string => {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ERR_CANCELED') {
      return '';
    }

    const messageFromResponse = getMessageFromResponse(error.response?.data);
    if (messageFromResponse) {
      return messageFromResponse;
    }

    if (typeof error.message === 'string' && error.message.trim().length > 0) {
      return error.message;
    }
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return fallback;
};

export const showErrorToast = (error: unknown, fallback = DEFAULT_ERROR_MESSAGE): void => {
  const message = getErrorMessage(error, fallback);
  if (message) {
    toast.error(message);
  }
};

// Alias for backward compatibility
export const getApiErrorMessage = getErrorMessage;