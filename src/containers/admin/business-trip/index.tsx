import { useState, useMemo } from 'react';
import Calendar from '@/components/ui/calendar';
import SearchDropdown from '@/components/ui/input/dropdown/search';
import ConfirmModal from '@/components/layout/modal/confirm';
import Modal from '@/components/layout/modal';
import Button from '@/components/ui/button';
import Dropdown from '@/components/ui/input/dropdown';
import { transformBusinessTripToCalendarEvents, transformMakeupToCalendarEvents, formatDate, formatDateString } from '@/utils/admin';
import type { AfterSchoolTeacher, BusinessTripSchedule, MakeupSchedule } from '@/types/admin';
import type { CalendarEvent } from '@/types/calendar';
import * as S from './style';

type Step = 'select' | 'confirm-trip' | 'ask-makeup' | 'trip-complete' | 'select-makeup' | 'makeup-modal' | 'all-complete';

const SAMPLE_TEACHERS: AfterSchoolTeacher[] = [
  { id: 1, name: '한국사 방과후(이혜정)' },
  { id: 2, name: '영어 방과후(김철수)' },
  { id: 3, name: '수학 방과후(박영희)' },
];

const SAMPLE_TRIP_SCHEDULES: BusinessTripSchedule[] = [
  { day: '2026-01-01', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-02', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-08', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-10', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-13', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-13', startPeriod: 10, endPeriod: 11 },
  { day: '2026-01-14', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-16', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-17', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-17', startPeriod: 10, endPeriod: 11 },
  { day: '2026-01-22', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-30', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-31', startPeriod: 8, endPeriod: 9 },
];

const SAMPLE_MAKEUP_SCHEDULES: MakeupSchedule[] = [
  { day: '2026-01-01', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-02', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-08', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-10', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-13', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-13', startPeriod: 10, endPeriod: 11 },
  { day: '2026-01-14', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-16', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-17', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-17', startPeriod: 10, endPeriod: 11 },
  { day: '2026-01-22', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-30', startPeriod: 8, endPeriod: 9 },
  { day: '2026-01-31', startPeriod: 8, endPeriod: 9 },
];

const LOCATION_OPTIONS = ['1학년 1반', '1학년 2반', '음악실', '미술실'];

export default function BusinessTripSection() {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);

  const [selectedTeacher, setSelectedTeacher] = useState<AfterSchoolTeacher | undefined>(undefined);
  const [step, setStep] = useState<Step>('select');
  const [selectedTripDate, setSelectedTripDate] = useState<Date | null>(null);
  const [selectedMakeupDate, setSelectedMakeupDate] = useState<Date | null>(null);
  const [availableMakeupPeriods, setAvailableMakeupPeriods] = useState<string[]>([]);
  const [selectedMakeupPeriods, setSelectedMakeupPeriods] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  const tripEvents = useMemo(() => {
    if (!selectedTeacher) return [];
    return transformBusinessTripToCalendarEvents(SAMPLE_TRIP_SCHEDULES);
  }, [selectedTeacher]);

  const makeupEvents = useMemo(() => {
    return transformMakeupToCalendarEvents(SAMPLE_MAKEUP_SCHEDULES);
  }, []);

  const handleMonthChange = (newYear: number, newMonth: number) => {
    setYear(newYear);
    setMonth(newMonth);
  };

  const handleTeacherSelect = (teacher: AfterSchoolTeacher) => {
    setSelectedTeacher(teacher);
  };

  const handleTripEventClick = (event: CalendarEvent) => {
    setSelectedTripDate(event.date);
    setStep('confirm-trip');
  };

  const handleConfirmTrip = () => {
    setStep('ask-makeup');
  };

  const handleProceedToMakeup = () => {
    setStep('select-makeup');
  };

  const handleTripComplete = () => {
    resetState();
  };

  const handleMakeupDateClick = (date: Date) => {
    const dateString = formatDateString(date);
    const availableData = SAMPLE_MAKEUP_SCHEDULES.filter(item => item.day === dateString);

    if (availableData.length === 0) return;

    const periods: string[] = [];
    availableData.forEach(item => {
      if (item.startPeriod === 8 && item.endPeriod === 9) periods.push('8~9');
      if (item.startPeriod === 10 && item.endPeriod === 11) periods.push('10~11');
    });

    setAvailableMakeupPeriods(periods);
    setSelectedMakeupDate(date);
    setStep('makeup-modal');
  };

  const handleTogglePeriod = (period: string) => {
    setSelectedMakeupPeriods(prev =>
      prev.includes(period)
        ? prev.filter(p => p !== period)
        : [...prev, period]
    );
  };

  const handleMakeupComplete = () => {
    if (selectedMakeupPeriods.length === 0 || !selectedLocation) {
      alert('보강 시간과 장소를 선택해주세요.');
      return;
    }
    setStep('all-complete');
  };

  const handleAllComplete = () => {
    console.log('출장 및 보강 완료:', {
      tripDate: selectedTripDate,
      makeupDate: selectedMakeupDate,
      makeupPeriods: selectedMakeupPeriods,
      location: selectedLocation,
    });
    resetState();
  };

  const resetState = () => {
    setStep('select');
    setSelectedTripDate(null);
    setSelectedMakeupDate(null);
    setAvailableMakeupPeriods([]);
    setSelectedMakeupPeriods([]);
    setSelectedLocation('');
  };

  const renderContent = () => {
    if (step === 'select-makeup' || step === 'makeup-modal' || step === 'all-complete') {
      return (
        <>
          <S.Title>"{selectedTeacher?.name}" 보강 날짜를 선택해주세요.</S.Title>
          <S.CalendarWrapper>
            <Calendar
              year={year}
              month={month}
              onMonthChange={handleMonthChange}
              events={makeupEvents}
              showYear={true}
              showLegend={false}
              onDateClick={handleMakeupDateClick}
            />
          </S.CalendarWrapper>
        </>
      );
    }

    return (
      <>
        <S.HeaderContainer>
          <S.DropdownWrapper>
            <SearchDropdown<AfterSchoolTeacher>
              placeholder="이름을 입력해주세요"
              items={SAMPLE_TEACHERS}
              value={selectedTeacher}
              onChange={handleTeacherSelect}
              renderItem={(item) => item.name}
              customWidth="250px"
            />
          </S.DropdownWrapper>
        </S.HeaderContainer>
        <S.CalendarWrapper>
          <Calendar
            year={year}
            month={month}
            onMonthChange={handleMonthChange}
            events={tripEvents}
            showYear={true}
            showLegend={false}
            onEventClick={handleTripEventClick}
          />
        </S.CalendarWrapper>
      </>
    );
  };

  return (
    <S.Container>
      {renderContent()}

      <ConfirmModal
        isOpen={step === 'confirm-trip'}
        onClose={() => setStep('select')}
        onConfirm={handleConfirmTrip}
        title="출장"
        message={selectedTripDate ? `${formatDate(selectedTripDate)}에 ${selectedTeacher?.name?.match(/\((.+)\)/)?.[1]} 선생님의 출장을 대신 처리하시겠습니까?` : ''}
        cancelText="취소"
        confirmText="다음"
      />

      <ConfirmModal
        isOpen={step === 'ask-makeup'}
        onClose={() => setStep('trip-complete')}
        onConfirm={handleProceedToMakeup}
        title="출장"
        message="보강 날짜도 미리 정하시겠습니까?"
        cancelText="종료"
        confirmText="다음"
      />

      <Modal isOpen={step === 'trip-complete'} onClose={handleTripComplete} padding="2.5rem">
        <S.ModalContainer>
          <S.ModalTitle>출장</S.ModalTitle>
          <S.ModalMessage>
            {selectedTripDate && (
              <><S.HighlightText>{formatDate(selectedTripDate)}</S.HighlightText>에 출장 처리가 완료되었습니다.</>
            )}
          </S.ModalMessage>
          <S.ModalButtonGroup>
            <Button variant="confirm" text="확인" onClick={handleTripComplete} width="100%" />
          </S.ModalButtonGroup>
        </S.ModalContainer>
      </Modal>

      <Modal isOpen={step === 'makeup-modal'} onClose={() => setStep('select-makeup')} padding="2.5rem">
        <S.ModalContainer>
          <S.ModalTitle>방과후 보강 선택</S.ModalTitle>
          <S.ModalDateText>{selectedMakeupDate && formatDate(selectedMakeupDate)}</S.ModalDateText>

          <S.SelectionContainer>
            {availableMakeupPeriods.includes('8~9') && (
              <S.SelectionBox
                $isSelected={selectedMakeupPeriods.includes('8~9')}
                onClick={() => handleTogglePeriod('8~9')}
              >
                8~9교시 보강
              </S.SelectionBox>
            )}
            {availableMakeupPeriods.includes('10~11') && (
              <S.SelectionBox
                $isSelected={selectedMakeupPeriods.includes('10~11')}
                onClick={() => handleTogglePeriod('10~11')}
              >
                10~11교시 보강
              </S.SelectionBox>
            )}
          </S.SelectionContainer>

          <S.DropdownSection>
            <S.DropdownLabel>장소</S.DropdownLabel>
            <Dropdown
              items={LOCATION_OPTIONS}
              placeholder="장소"
              value={selectedLocation}
              onChange={setSelectedLocation}
            />
          </S.DropdownSection>

          <S.ModalButtonGroup>
            <Button variant="cancel" text="취소" onClick={() => setStep('select-makeup')} width="50%" />
            <Button variant="confirm" text="완료" onClick={handleMakeupComplete} width="50%" />
          </S.ModalButtonGroup>
        </S.ModalContainer>
      </Modal>

      <Modal isOpen={step === 'all-complete'} onClose={handleAllComplete} padding="2.5rem">
        <S.ModalContainer>
          <S.ModalTitle>출장</S.ModalTitle>
          <S.ModalMessage>
            {selectedTripDate && selectedMakeupDate && (
              <>
                <S.HighlightText>{formatDate(selectedTripDate)}</S.HighlightText>에 출장 처리 및
                <br />
                <S.HighlightText>{formatDate(selectedMakeupDate)}({selectedMakeupPeriods.join(', ')})</S.HighlightText>에
                <br />보강 처리가 완료되었습니다.
              </>
            )}
          </S.ModalMessage>
          <S.ModalButtonGroup>
            <Button variant="confirm" text="확인" onClick={handleAllComplete} width="100%" />
          </S.ModalButtonGroup>
        </S.ModalContainer>
      </Modal>
    </S.Container>
  );
}
