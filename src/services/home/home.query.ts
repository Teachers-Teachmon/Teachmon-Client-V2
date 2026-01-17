import { useQuery } from '@tanstack/react-query';
import {
    fetchExchangeRequests,
    fetchMySupervisionDays,
    fetchTodaySupervision,
    fetchWeeklyExitStudents,
} from './home.api';

export const homeQueryKeys = {
    all: ['home'] as const,
    todaySupervision: () => [...homeQueryKeys.all, 'todaySupervision'] as const,
    mySupervisionDays: () => [...homeQueryKeys.all, 'mySupervisionDays'] as const,
    exchangeRequests: () => [...homeQueryKeys.all, 'exchangeRequests'] as const,
    weeklyExitStudents: () => [...homeQueryKeys.all, 'weeklyExitStudents'] as const,
};

export const useTodaySupervisionQuery = () =>
    useQuery({
        queryKey: homeQueryKeys.todaySupervision(),
        queryFn: fetchTodaySupervision,
    });

export const useMySupervisionDaysQuery = () =>
    useQuery({
        queryKey: homeQueryKeys.mySupervisionDays(),
        queryFn: fetchMySupervisionDays,
    });

export const useExchangeRequestsQuery = () =>
    useQuery({
        queryKey: homeQueryKeys.exchangeRequests(),
        queryFn: fetchExchangeRequests,
    });

export const useWeeklyExitStudentsQuery = () =>
    useQuery({
        queryKey: homeQueryKeys.weeklyExitStudents(),
        queryFn: fetchWeeklyExitStudents,
    });
