import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  createTeacher,
  updateTeacher,
  deleteTeacher,
  setForbiddenDates,
  createStudent,
  updateStudent,
  deleteStudent,
  type ForbiddenDay,
} from './user-management.api';

// Teacher Mutations
export const useCreateTeacherMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userManagement.teachers'] });
      toast.success('선생님이 추가되었습니다.');
    },
    onError: () => {
      toast.error('선생님 추가에 실패했습니다.');
    },
  });
};

export const useUpdateTeacherMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userManagement.teachers'] });
      toast.success('선생님 정보가 수정되었습니다.');
    },
    onError: () => {
      toast.error('선생님 정보 수정에 실패했습니다.');
    },
  });
};

export const useDeleteTeacherMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userManagement.teachers'] });
      toast.success('선생님이 삭제되었습니다.');
    },
    onError: () => {
      toast.error('선생님 삭제에 실패했습니다.');
    },
  });
};

// Forbidden Date Mutations
export const useSetForbiddenDatesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ teacherId, weekdays }: { teacherId: string; weekdays: ForbiddenDay[] }) =>
      setForbiddenDates(teacherId, weekdays),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userManagement.forbiddenDates'] });
      toast.success('금지날짜가 설정되었습니다.');
    },
    onError: () => {
      toast.error('금지날짜 설정에 실패했습니다.');
    },
  });
};

// Student Mutations
export const useCreateStudentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userManagement.students'] });
      queryClient.invalidateQueries({ queryKey: ['search.students'] });
      toast.success('학생이 추가되었습니다.');
    },
    onError: () => {
      toast.error('학생 추가에 실패했습니다.');
    },
  });
};

export const useUpdateStudentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userManagement.students'] });
      queryClient.invalidateQueries({ queryKey: ['search.students'] });
      toast.success('학생 정보가 수정되었습니다.');
    },
    onError: () => {
      toast.error('학생 정보 수정에 실패했습니다.');
    },
  });
};

export const useDeleteStudentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userManagement.students'] });
      queryClient.invalidateQueries({ queryKey: ['search.students'] });
      toast.success('학생이 삭제되었습니다.');
    },
    onError: () => {
      toast.error('학생 삭제에 실패했습니다.');
    },
  });
};
