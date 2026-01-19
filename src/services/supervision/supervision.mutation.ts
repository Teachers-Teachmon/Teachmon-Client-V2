import { useMutation } from '@tanstack/react-query';
import { requestSupervisionExchange } from './supervision.api';

export const useRequestSupervisionExchangeMutation = () =>
  useMutation({
    mutationFn: requestSupervisionExchange,
  });
