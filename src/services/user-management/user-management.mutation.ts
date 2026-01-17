import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  updateTeacher,
  deleteTeacher,
  setForbiddenDates,
  createStudent,
  updateStudent,
  deleteStudent,
} from './user-management.api';

// Teacher Mutations
export const useUpdateTeacherMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTeacher,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userManagement.teachers'] });
      toast.success(data.message);
    },
    onError: (error) => {
      console.error('선생님 정보 수정 실패:', error);
      toast.error('선생님 정보 수정에 실패했습니다.');
    },
  });
};

export const useDeleteTeacherMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTeacher,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userManagement.teachers'] });
      toast.success(data.message);
    },
    onError: (error) => {
      console.error('선생님 삭제 실패:', error);
      toast.error('선생님 삭제에 실패했습니다.');
    },
  });
};

// Forbidden Date Mutations
export const useSetForbiddenDatesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setForbiddenDates,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userManagement.forbiddenDates'] });
      toast.success(data.message);
    },
    onError: (error) => {
      console.error('금지날짜 설정 실패:', error);
      toast.error('금지날짜 설정에 실패했습니다.');
    },
  });
};

// Student Mutations
export const useCreateStudentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStudent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userManagement.students'] });
      toast.success(data.message);
    },
    onError: (error) => {
      console.error('학생 추가 실패:', error);
      toast.error('학생 추가에 실패했습니다.');
    },
  });
};

export const useUpdateStudentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStudent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userManagement.students'] });
      toast.success(data.message);
    },
    onError: (error) => {
      console.error('학생 정보 수정 실패:', error);
      toast.error('학생 정보 수정에 실패했습니다.');
    },
  });
};

export const useDeleteStudentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userManagement.students'] });
      toast.success(data.message);
    },
    onError: (error) => {
      console.error('학생 삭제 실패:', error);
      toast.error('학생 삭제에 실패했습니다.');
    },
  });
};
