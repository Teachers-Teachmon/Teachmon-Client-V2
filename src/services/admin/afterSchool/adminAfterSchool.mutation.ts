import { useMutation } from '@tanstack/react-query';
import {
  requestBusinessTrip,
  requestReinforcement,
  type BusinessTripPayload,
  type ReinforcementPayload,
} from './adminAfterSchool.api';

export const useRequestBusinessTripMutation = () =>
  useMutation({
    mutationFn: (payload: BusinessTripPayload) => requestBusinessTrip(payload),
  });

export const useRequestReinforcementMutation = () =>
  useMutation({
    mutationFn: (payload: ReinforcementPayload) => requestReinforcement(payload),
  });
