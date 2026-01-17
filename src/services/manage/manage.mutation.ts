import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateStudentSchedule } from './manage.api';

export const useUpdateStudentScheduleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStudentSchedule,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['manage.studentSchedule'] });
      queryClient.invalidateQueries({ queryKey: ['manage.placeSchedule'] });
    },
    onError: () => {
      toast.error('스케줄 변경에 실패했습니다.');
    },
  });
};
