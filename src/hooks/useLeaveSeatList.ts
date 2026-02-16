import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { movementQuery } from '@/services/movement/movement.query';
import type { Period } from '@/constants/movement';

interface UseLeaveSeatListParams {
    day: string;
    period: Period;
    enabled?: boolean;
}

/**
 * 이석 목록 조회 훅
 * - EIGHT_TO_ELEVEN_PERIOD인 경우 8~9교시, 10~11교시 두 번 요청 후 합침
 * - 그 외에는 단일 교시 요청
 */
export function useLeaveSeatList({ day, period, enabled = true }: UseLeaveSeatListParams) {
    const isFullPeriod = period === 'EIGHT_TO_ELEVEN_PERIOD';

    const { data: data89 = [], isPending: isPending89 } = useQuery({
        ...movementQuery.list({ day, period: 'EIGHT_AND_NINE_PERIOD' }),
        enabled: enabled && isFullPeriod,
        retry: false,
    });

    const { data: data1011 = [], isPending: isPending1011 } = useQuery({
        ...movementQuery.list({ day, period: 'TEN_AND_ELEVEN_PERIOD' }),
        enabled: enabled && isFullPeriod,
        retry: false,
    });

    const { data: dataSingle = [], isPending: isPendingSingle } = useQuery({
        ...movementQuery.list({ day, period }),
        enabled: enabled && !isFullPeriod,
        retry: false,
    });

    const data = useMemo(() => {
        return isFullPeriod ? [...data89, ...data1011] : dataSingle;
    }, [isFullPeriod, data89, data1011, dataSingle]);

    const isPending = isFullPeriod
        ? (isPending89 || isPending1011)
        : isPendingSingle;

    return { data, isPending };
}
