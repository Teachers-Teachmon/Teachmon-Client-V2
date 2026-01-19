import { useMutation } from '@tanstack/react-query';
import {
  createSupervisionSchedule,
  deleteSupervisionSchedule,
  updateSupervisionSchedule,
} from './adminSupervision.api';

export const useCreateSupervisionScheduleMutation = () =>
  useMutation({
    mutationFn: createSupervisionSchedule,
  });

export const useUpdateSupervisionScheduleMutation = () =>
  useMutation({
    mutationFn: updateSupervisionSchedule,
  });

export const useDeleteSupervisionScheduleMutation = () =>
  useMutation({
    mutationFn: deleteSupervisionSchedule,
  });
