import * as S from './style';
import Calendar from '@/components/ui/calendar';
import ExchangeDetailModal from '@/components/ui/exchange-detail-modal';
import SupervisionHeader from '@/containers/supervision/header';
import { useSupervision } from '@/hooks/useSupervision';
import { LEGENDS } from '@/constants/supervision';

export default function SupervisionPage() {
  const {
    year,
    month,
    events,
    currentTeacherId,
    exchangeMode,
    selectedMyEvent,
    showMyOnly,
    setShowMyOnly,
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
        showMyOnly={showMyOnly}
        onToggleMyOnly={() => setShowMyOnly((prev) => !prev)}
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
          currentTeacherId={currentTeacherId}
          selectedMyEvent={selectedMyEvent}
          onMyEventSelect={handleMyEventSelect}
          onTargetEventSelect={handleTargetEventSelect}
        />
      </S.CalendarWrapper>

      <ExchangeDetailModal
        isOpen={isModalOpen}
        exchange={exchangeRequest}
        currentTeacherId={currentTeacherId}
        onClose={handleCloseModal}
        onAccept={() => { }}
        onReject={() => { }}
        onSubmit={handleSubmit}
      />
    </S.Container>
  );
}
