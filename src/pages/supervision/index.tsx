import * as S from './style';
import Calendar from '@/components/ui/calendar';
import ExchangeDetailModal from '@/components/ui/exchange-detail-modal';
import SupervisionHeader from '@/containers/supervision/header';
import { useSupervision } from '@/hooks/useSupervision';
import { LEGENDS, CURRENT_TEACHER_ID } from '@/constants/supervision';

export default function SupervisionPage() {
  const {
    year,
    month,
    events,
    exchangeMode,
    selectedMyEvent,
    isModalOpen,
    exchangeRequest,
    handleMonthChange,
    handleExchangeClick,
    handleMyEventSelect,
    handleTargetEventSelect,
    handleCloseModal,
    handleSubmit,
  } = useSupervision();

  return (
    <S.Container>
      <SupervisionHeader
        exchangeMode={exchangeMode}
        onExchangeClick={handleExchangeClick}
      />
      <S.CalendarWrapper>
        <Calendar
          year={year}
          month={month}
          onMonthChange={handleMonthChange}
          events={events}
          legends={LEGENDS}
          showYear={true}
          showLegend={true}
          exchangeMode={exchangeMode}
          currentTeacherId={CURRENT_TEACHER_ID}
          selectedMyEvent={selectedMyEvent}
          onMyEventSelect={handleMyEventSelect}
          onTargetEventSelect={handleTargetEventSelect}
        />
      </S.CalendarWrapper>

      <ExchangeDetailModal
        isOpen={isModalOpen}
        exchange={exchangeRequest}
        currentTeacherId={CURRENT_TEACHER_ID}
        onClose={handleCloseModal}
        onAccept={() => { }}
        onReject={() => { }}
        onSubmit={handleSubmit}
      />
    </S.Container>
  );
}
