import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import type { ExchangeRequest, ExitStudent } from '@/types/home';
import Modal from '@/components/layout/modal';
import ExchangeDetailContent from '@/components/ui/ExchangeDetailContent';
import {
  formatDate,
  formatSupervisionType,
  formatPeriod,
  getStatusStyle,
  getDisplayName,
} from '@/utils/format';

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
  const navigate = useNavigate();
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

  const exitRows = SAMPLE_EXITS.reduce<ExitStudent[][]>(
    (acc, item, index) => {
      if (index % 2 === 0) {
        acc.push([item]);
      } else {
        acc[acc.length - 1].push(item);
      }
      return acc;
    },
    []
  );

  return (
    <S.Container>
      <S.TopSection>
        <S.WelcomeCard bgImage="/assets/mageBg.png">
          <S.WelcomeContent>
            <S.WelcomeTitle>티치몬에 오신 것을 환영합니다.</S.WelcomeTitle>
            <S.WelcomeBottom>
              <S.WelcomeMessage>오늘은 이석 감독이 있는 날입니다.</S.WelcomeMessage>
              <S.SupervisionCount>총 감독 횟수: 48회</S.SupervisionCount>
            </S.WelcomeBottom>
          </S.WelcomeContent>
        </S.WelcomeCard>

        <S.QuickLinkCard onClick={() => navigate('/manage/movement')}>
          <S.QuickLinkHeader>
            <S.QuickLinkTextContainer>
              <S.QuickLinkTitle>이석작성 바로가기</S.QuickLinkTitle>
              <S.QuickLinkDescription>
                학생관리를 거쳐서 가지 않아도 돼요.
              </S.QuickLinkDescription>
            </S.QuickLinkTextContainer>
            <S.ArrowButton>
              <img src="/icons/RightArrow.svg" alt="바로가기" />
            </S.ArrowButton>
          </S.QuickLinkHeader>
          <S.PencilIcon>
            <img src="/icons/BigPencil.svg" alt="연필" />
          </S.PencilIcon>
        </S.QuickLinkCard>
      </S.TopSection>

      <S.BottomSection>
        <S.SectionCard>
          <S.SectionTitle>교체 요청</S.SectionTitle>
          <S.SectionContent>
            {SAMPLE_EXCHANGES.length > 0 ? (
              <>
                <S.ExchangeHeader>
                  <S.ExchangeHeaderText>받는 사람</S.ExchangeHeaderText>
                  <S.ExchangeHeaderSpacer />
                  <S.ExchangeHeaderText>보내는 사람</S.ExchangeHeaderText>
                </S.ExchangeHeader>
                <S.ExchangeList>
                  {SAMPLE_EXCHANGES.map((exchange) => (
                    <S.ExchangeRow key={exchange.id}>
                      <S.ExchangeItem status={getStatusStyle(exchange.status)}>
                        <S.ExchangeItemLabel status={getStatusStyle(exchange.status)}>
                          {getDisplayName(exchange.requestor.teacher.id, exchange.requestor.teacher.name, CURRENT_TEACHER_ID)}
                        </S.ExchangeItemLabel>
                        <S.ExchangeItemText status={getStatusStyle(exchange.status)}>
                          {formatDate(exchange.requestor.day)} {formatSupervisionType(exchange.requestor.type)}
                        </S.ExchangeItemText>
                      </S.ExchangeItem>
                      <S.ExchangeIcon>
                        <img src="/icons/Exchange.svg" alt="교체" />
                        <S.ExchangeIconLabel onClick={() => handleOpenModal(exchange)}>
                          자세히보기
                        </S.ExchangeIconLabel>
                      </S.ExchangeIcon>
                      <S.ExchangeItem status={getStatusStyle(exchange.status)}>
                        <S.ExchangeItemLabel status={getStatusStyle(exchange.status)}>
                          {getDisplayName(exchange.responser.teacher.id, exchange.responser.teacher.name, CURRENT_TEACHER_ID)}
                        </S.ExchangeItemLabel>
                        <S.ExchangeItemText status={getStatusStyle(exchange.status)}>
                          {formatDate(exchange.responser.day)} {formatSupervisionType(exchange.responser.type)}
                        </S.ExchangeItemText>
                      </S.ExchangeItem>
                    </S.ExchangeRow>
                  ))}
                </S.ExchangeList>
              </>
            ) : (
              <S.EmptyMessage>교체 요청이 없습니다.</S.EmptyMessage>
            )}
          </S.SectionContent>
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionTitle>이번 주 이탈 현황</S.SectionTitle>
          <S.SectionContent>
            {SAMPLE_EXITS.length > 0 ? (
              <S.DepartureGrid>
                {exitRows.map((row, rowIndex) => (
                  <S.DepartureRow key={rowIndex}>
                    {row.map((exit) => (
                      <S.DepartureItem key={exit.exit_id}>
                        <S.DepartureDate>{formatDate(exit.day)}</S.DepartureDate>
                        <S.DepartureInfoWrapper>
                          <S.DepartureName>{exit.number}{exit.name}</S.DepartureName>
                          <S.DepartureTime>{formatPeriod(exit.period)}</S.DepartureTime>
                        </S.DepartureInfoWrapper>
                      </S.DepartureItem>
                    ))}
                  </S.DepartureRow>
                ))}
              </S.DepartureGrid>
            ) : (
              <S.EmptyMessage>이번 주 이탈 현황이 없습니다.</S.EmptyMessage>
            )}
          </S.SectionContent>
        </S.SectionCard>
      </S.BottomSection>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} padding="52px 0">
        {selectedExchange && (
          <ExchangeDetailContent
            exchange={selectedExchange}
            currentTeacherId={CURRENT_TEACHER_ID}
            onClose={handleCloseModal}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        )}
      </Modal>
    </S.Container>
  );
}