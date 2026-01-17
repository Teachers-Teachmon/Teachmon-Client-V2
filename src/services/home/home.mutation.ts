import { useMutation } from '@tanstack/react-query';
import { acceptExchangeRequest, rejectExchangeRequest } from './home.api';

export const useAcceptExchangeRequestMutation = () =>
    useMutation({
        mutationFn: acceptExchangeRequest,
    });

export const useRejectExchangeRequestMutation = () =>
    useMutation({
        mutationFn: rejectExchangeRequest,
    });
