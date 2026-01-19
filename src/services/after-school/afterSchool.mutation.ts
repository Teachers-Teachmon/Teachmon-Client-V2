import { useMutation } from '@tanstack/react-query';
import { requestReinforcement } from './afterSchool.api';

export const useRequestReinforcementMutation = () =>
  useMutation({
    mutationFn: requestReinforcement,
  });
