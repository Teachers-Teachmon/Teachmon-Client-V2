import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { CalendarEvent } from '@/types/calendar';
import type { ExchangeRequest } from '@/types/home';
import { CURRENT_TEACHER_ID } from '@/constants/supervision';
import { convertToCalendarEvents } from '@/utils/supervision';
import { useSupervisionSearchQuery } from '@/services/supervision/supervision.query';
import { useRequestSupervisionExchangeMutation } from '@/services/supervision/supervision.mutation';

export const useSupervision = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const monthParam = searchParams.get('month');
    const queryParam = searchParams.get('query') ?? '';

    const currentDate = new Date();
    const [year, setYear] = useState(currentDate.getFullYear());
    const [month, setMonth] = useState(monthParam ? parseInt(monthParam, 10) : currentDate.getMonth() + 1);

    const [exchangeMode, setExchangeMode] = useState(false);
    const [selectedMyEvent, setSelectedMyEvent] = useState<CalendarEvent | null>(null);
    const [showMyOnly, setShowMyOnly] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [exchangeRequest, setExchangeRequest] = useState<ExchangeRequest | null>(null);
    const [exchangeIds, setExchangeIds] = useState<{ requestorId: number; changeId: number } | null>(null);

    const { data: supervisionDays } = useSupervisionSearchQuery(month, queryParam);
    const { mutate: requestExchange } = useRequestSupervisionExchangeMutation();

    const baseEvents = useMemo(
        () => convertToCalendarEvents(supervisionDays ?? []),
        [supervisionDays]
    );

    const events = useMemo(() => {
        if (!showMyOnly) return baseEvents;
        return baseEvents.filter((event) => event.teacherId === CURRENT_TEACHER_ID);
    }, [baseEvents, showMyOnly]);

    const parseSupervisionId = (eventId: string) => {
        const id = Number(eventId.split('_')[1]);
        return Number.isNaN(id) ? null : id;
    };

    useEffect(() => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('month', String(month));
        setSearchParams(newParams, { replace: true });
    }, [month, setSearchParams]);

    const handleMonthChange = (newYear: number, newMonth: number) => {
        setYear(newYear);
        setMonth(newMonth);
    };

    const handleExchangeClick = () => {
        if (exchangeMode) {
            setExchangeMode(false);
            setSelectedMyEvent(null);
            setExchangeIds(null);
        } else {
            setExchangeMode(true);
        }
    };

    const handleMyEventSelect = (event: CalendarEvent) => {
        setSelectedMyEvent(event);
    };

    const handleTargetEventSelect = (event: CalendarEvent) => {
        if (selectedMyEvent && selectedMyEvent.teacherId && selectedMyEvent.supervisionType && event.teacherId && event.supervisionType) {
            const requestorId = parseSupervisionId(selectedMyEvent.id);
            const changeId = parseSupervisionId(event.id);
            if (!requestorId || !changeId) return;

            const newRequest: ExchangeRequest = {
                id: Date.now(),
                status: 'PENDING',
                requestor: {
                    teacher: { id: selectedMyEvent.teacherId, name: selectedMyEvent.label.replace(' 선생님', '') },
                    day: selectedMyEvent.date.toISOString(),
                    type: selectedMyEvent.supervisionType,
                },
                responser: {
                    teacher: { id: event.teacherId, name: event.label.replace(' 선생님', '') },
                    day: event.date.toISOString(),
                    type: event.supervisionType,
                },
                reason: '',
            };
            setExchangeRequest(newRequest);
            setExchangeIds({ requestorId, changeId });
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setExchangeRequest(null);
        setExchangeIds(null);
    };

    const handleSubmit = (reason: string) => {
        if (!exchangeIds) return;
        requestExchange(
            {
                requestor_supervision_id: exchangeIds.requestorId,
                change_supervision_id: exchangeIds.changeId,
                reason,
            },
            {
                onSuccess: () => {
                    handleCloseModal();
                    setExchangeMode(false);
                    setSelectedMyEvent(null);
                },
            }
        );
    };

    return {
        year,
        month,
        events,
        exchangeMode,
        selectedMyEvent,
        showMyOnly,
        isModalOpen,
        exchangeRequest,
        handleMonthChange,
        handleExchangeClick,
        setShowMyOnly,
        handleMyEventSelect,
        handleTargetEventSelect,
        handleCloseModal,
        handleSubmit,
    };
};
