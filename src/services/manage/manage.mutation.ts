import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateStudentSchedule, deleteEvasionRecord } from './manage.api';

export const useUpdateStudentScheduleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStudentSchedule,
    onSuccess: (data: { message: string }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['manage.studentSchedule'] });
      queryClient.invalidateQueries({ queryKey: ['manage.placeSchedule'] });
      queryClient.invalidateQueries({ queryKey: ['manage.scheduleHistory'] });
    },
    onError: () => {
      toast.error('스케줄 변경에 실패했습니다.');
    },
  });
};

export const useDeleteEvasionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEvasionRecord,
    onSuccess: (data: { message: string }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['manage.dailyEvasion'] });
    },
    onError: () => {
      toast.error('이탈 기록 삭제에 실패했습니다.');
    },
  });
};

export const useDeleteExitHistoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEvasionRecord,
    onSuccess: (data: { message: string }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['manage.weeklyExitHistory'] });
    },
    onError: () => {
      toast.error('이탈 기록 삭제에 실패했습니다.');
    },
  });
};
