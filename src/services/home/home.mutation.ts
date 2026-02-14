import { useMutation } from '@tanstack/react-query';
import {
    acceptExchangeRequest,
    rejectExchangeRequest,
    checkExchangeRequest,
} from './home.api';

export const useAcceptExchangeRequestMutation = () =>
    useMutation({
        mutationFn: acceptExchangeRequest,
    });

export const useRejectExchangeRequestMutation = () =>
    useMutation({
        mutationFn: rejectExchangeRequest,
    });

export const useCheckExchangeRequestMutation = () =>
    useMutation({
        mutationFn: checkExchangeRequest,
    });
