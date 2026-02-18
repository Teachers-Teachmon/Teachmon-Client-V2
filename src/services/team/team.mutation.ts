import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTeam, updateTeam, deleteTeam } from './team.api';

export const useCreateTeamMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTeam,
    onSuccess: ({ message }) => {
      toast.success(message || '팀을 생성하였습니다.');
      queryClient.invalidateQueries({ queryKey: ['team.list'] });
      navigate('/admin/fixed-movement/team-settings');
    },
    onError: () => {
      toast.error('팀 생성에 실패했습니다.');
    },
  });
};

export const useUpdateTeamMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTeam,
    onSuccess: ({ message }) => {
      toast.success(message || '팀을 수정하였습니다.');
      queryClient.invalidateQueries({ queryKey: ['team.list'] });
      navigate('/admin/fixed-movement/team-settings');
    },
    onError: () => {
      toast.error('팀 수정에 실패했습니다.');
    },
  });
};

export const useDeleteTeamMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTeam,
    onSuccess: ({ message }) => {
      toast.success(message || '팀을 삭제하였습니다.');
      queryClient.invalidateQueries({ queryKey: ['team.list'] });
    },
    onError: () => {
      toast.error('팀 삭제에 실패했습니다.');
    },
  });
};
