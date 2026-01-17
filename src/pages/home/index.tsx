import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import * as S from './style';
import type { ExchangeRequest } from '@/types/home';
import WelcomeSection from '@/containers/home/welcome';
import QuickLinkSection from '@/containers/home/quick-link';
import ExchangeRequestSection from '@/containers/home/exchange-request';
import WeeklyExitSection from '@/containers/home/weekly-exit';
import ExchangeDetailModal from '@/components/ui/exchange-detail-modal';
import {
    homeQueryKeys,
    useExchangeRequestsQuery,
    useMySupervisionDaysQuery,
    useTodaySupervisionQuery,
    useWeeklyExitStudentsQuery,
} from '@/services/home/home.query';
import {
    useAcceptExchangeRequestMutation,
    useRejectExchangeRequestMutation,
} from '@/services/home/home.mutation';

const CURRENT_TEACHER_ID = 353526346;

export default function HomePage() {
    const [selectedExchange, setSelectedExchange] = useState<ExchangeRequest | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data: todaySupervision } = useTodaySupervisionQuery();
    const { data: mySupervisionDays } = useMySupervisionDaysQuery();
    const { data: exchangeRequests } = useExchangeRequestsQuery();
    const { data: weeklyExitStudents } = useWeeklyExitStudentsQuery();
    const { mutate: acceptExchange } = useAcceptExchangeRequestMutation();
    const { mutate: rejectExchange } = useRejectExchangeRequestMutation();

    const exchanges = exchangeRequests ?? [];
    const exits = weeklyExitStudents ?? [];
    const totalSupervisionCount = mySupervisionDays?.length ?? 0;

    const handleOpenModal = (exchange: ExchangeRequest) => {
        setSelectedExchange(exchange);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedExchange(null);
    };

    const handleAccept = () => {
        if (!selectedExchange?.id) return;
        acceptExchange(selectedExchange.id, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: homeQueryKeys.exchangeRequests(),
                });
                handleCloseModal();
            },
        });
    };

    const handleReject = () => {
        if (!selectedExchange?.id) return;
        rejectExchange(selectedExchange.id, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: homeQueryKeys.exchangeRequests(),
                });
                handleCloseModal();
            },
        });
    };

    return (
        <S.Container>
            <S.TopSection>
                <WelcomeSection
                    todayType={todaySupervision?.type}
                    totalCount={totalSupervisionCount}
                />
                <QuickLinkSection />
            </S.TopSection>

            <S.BottomSection>
                <ExchangeRequestSection
                    exchanges={exchanges}
                    currentTeacherId={CURRENT_TEACHER_ID}
                    onOpenModal={handleOpenModal}
                />
                <WeeklyExitSection exits={exits} />
            </S.BottomSection>

            <ExchangeDetailModal
                isOpen={isModalOpen}
                exchange={selectedExchange}
                currentTeacherId={CURRENT_TEACHER_ID}
                onClose={handleCloseModal}
                onAccept={handleAccept}
                onReject={handleReject}
            />
        </S.Container>
    );
}
