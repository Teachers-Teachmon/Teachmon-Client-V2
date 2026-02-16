import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createSupervisionSchedule,
  deleteSupervisionSchedule,
  updateSupervisionSchedule,
  createAutoSchedule,
} from './adminSupervision.api';
import { adminSupervisionQueryKeys } from './adminSupervision.query';

export const useCreateSupervisionScheduleMutation = () =>
{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSupervisionSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminSupervisionQueryKeys.all,
      });
    },
  });
};

export const useUpdateSupervisionScheduleMutation = () =>
{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSupervisionSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminSupervisionQueryKeys.all,
      });
    },
  });
};

export const useDeleteSupervisionScheduleMutation = () =>
{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSupervisionSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminSupervisionQueryKeys.all,
      });
    },
  });
};

export const useCreateAutoScheduleMutation = () =>
{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAutoSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminSupervisionQueryKeys.all,
      });
    },
  });
};
