import { useState } from 'react';
import * as S from './style';
import type { ExchangeRequest, ExitStudent } from '@/types/home';
import WelcomeSection from '@/containers/home/welcome';
import QuickLinkSection from '@/containers/home/quick-link';
import ExchangeRequestSection from '@/containers/home/exchange-request';
import WeeklyExitSection from '@/containers/home/weekly-exit';
import ExchangeDetailModal from '@/components/ui/exchange-detail-modal';

const CURRENT_TEACHER_ID = 353526346;

const SAMPLE_EXCHANGES: ExchangeRequest[] = [
    {
        id: 3252354,
        requestor: {
            teacher: { id: 353526346, name: '이혜정' },
            day: '2025-03-02',
            type: 'self_study',
        },
        responser: {
            teacher: { id: 35351223, name: '김철수' },
            day: '2025-03-03',
            type: 'leave_seat',
        },
        status: 'PENDING',
    },
    {
        id: 3252355,
        requestor: {
            teacher: { id: 353526347, name: '박영희' },
            day: '2025-03-04',
            type: 'self_study',
        },
        responser: {
            teacher: { id: 353526346, name: '이혜정' },
            day: '2025-03-05',
            type: 'leave_seat',
        },
        status: 'REJECTED',
    },
    {
        id: 3252356,
        requestor: {
            teacher: { id: 353526346, name: '이혜정' },
            day: '2025-03-06',
            type: 'leave_seat',
        },
        responser: {
            teacher: { id: 35351225, name: '홍길동' },
            day: '2025-03-07',
            type: 'self_study',
        },
        status: 'ACCEPTED',
    },
];

const SAMPLE_EXITS: ExitStudent[] = [
    { exit_id: 243, day: '2026-01-06', teacher: '이정하', number: 2208, name: '오주현', period: 'SEVEN_PERIOD' },
    { exit_id: 244, day: '2026-01-06', teacher: '이정하', number: 2209, name: '김민수', period: 'EIGHT_PERIOD' },
    { exit_id: 245, day: '2026-01-07', teacher: '박영희', number: 2210, name: '이지은', period: 'NINE_PERIOD' },
    { exit_id: 246, day: '2026-01-07', teacher: '박영희', number: 2211, name: '최유진', period: 'SEVEN_PERIOD' },
    { exit_id: 247, day: '2026-01-08', teacher: '김철수', number: 2212, name: '박서준', period: 'EIGHT_PERIOD' },
    { exit_id: 248, day: '2026-01-08', teacher: '김철수', number: 2213, name: '정수민', period: 'NINE_PERIOD' },
    { exit_id: 249, day: '2026-01-08', teacher: '김철수', number: 2213, name: '정수민', period: 'NINE_PERIOD' },
];

export default function HomePage() {
    const [selectedExchange, setSelectedExchange] = useState<ExchangeRequest | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (exchange: ExchangeRequest) => {
        setSelectedExchange(exchange);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedExchange(null);
    };

    const handleAccept = () => {
        console.log('수락:', selectedExchange?.id);
        handleCloseModal();
    };

    const handleReject = () => {
        console.log('거절:', selectedExchange?.id);
        handleCloseModal();
    };

    return (
        <S.Container>
            <S.TopSection>
                <WelcomeSection />
                <QuickLinkSection />
            </S.TopSection>

            <S.BottomSection>
                <ExchangeRequestSection
                    exchanges={SAMPLE_EXCHANGES}
                    currentTeacherId={CURRENT_TEACHER_ID}
                    onOpenModal={handleOpenModal}
                />
                <WeeklyExitSection exits={SAMPLE_EXITS} />
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
