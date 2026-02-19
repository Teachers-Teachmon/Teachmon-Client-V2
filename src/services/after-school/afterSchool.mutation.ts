import { useMutation } from '@tanstack/react-query';
import { requestReinforcement } from './afterSchool.api';
import { quitAfterSchool, createAfterSchoolBusinessTrip } from './afterSchool.api';
import { toast } from 'react-toastify';

export const useRequestReinforcementMutation = () =>
  useMutation({
    mutationFn: requestReinforcement,
  });

export const useQuitAfterSchoolMutation = (options?: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation({
    mutationFn: quitAfterSchool,
    onSuccess: () => {
      toast.success('방과후를 종료했습니다.');
      options?.onSuccess?.();
    },
    onError: (error: unknown) => {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as any).response?.data?.message === 'string'
          ? (error as any).response.data.message
          : '방과후 종료에 실패했습니다.';
      toast.error(message);
      options?.onError?.(error);
    },
  });
};

export const useBusinessTripMutation = (options?: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation({
    mutationFn: createAfterSchoolBusinessTrip,
    onSuccess: () => {
      toast.success('출장을 등록했습니다.');
      options?.onSuccess?.();
    },
    onError: (error: unknown) => {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as any).response?.data?.message === 'string'
          ? (error as any).response.data.message
          : '출장 등록에 실패했습니다.';
      toast.error(message);
      options?.onError?.(error);
    },
  });
};
