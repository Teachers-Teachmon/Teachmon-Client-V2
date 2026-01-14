import { useMemo, useState } from 'react';
import * as S from './style';
import BusinessTripSection from '@/containers/admin/business-trip';
import ConfirmModal from '@/components/layout/modal/confirm';
import Modal from '@/components/layout/modal';
import type { CalendarEvent } from '@/types/calendar';
import type { AfterSchoolTeacher } from '@/types/admin';
import { SAMPLE_MAKEUP_SCHEDULES } from '@/containers/admin/business-trip/data';
import { formatDateString } from '@/utils/admin';
import { AllCompleteContent, MakeupSelectionContent, TripCompleteContent, TripConfirmMessage } from '@/containers/admin/business-trip/modal-content';

export default function BusinessTripPage() {
  type Step = 'select' | 'confirm-trip' | 'ask-makeup' | 'trip-complete' | 'select-makeup' | 'makeup-modal' | 'all-complete';

  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [step, setStep] = useState<Step>('select');
  const [selectedTeacher, setSelectedTeacher] = useState<AfterSchoolTeacher | undefined>(undefined);
  const [selectedTripDate, setSelectedTripDate] = useState<Date | null>(null);
  const [selectedMakeupDate, setSelectedMakeupDate] = useState<Date | null>(null);
  const [availableMakeupPeriods, setAvailableMakeupPeriods] = useState<string[]>([]);
  const [selectedMakeupPeriods, setSelectedMakeupPeriods] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  const mode = useMemo(() => {
    if (step === 'select-makeup' || step === 'makeup-modal' || step === 'all-complete') return 'select-makeup';
    return 'select';
  }, [step]);

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

  return (
    <S.Container>
      <BusinessTripSection
        year={year}
        month={month}
        onMonthChange={handleMonthChange}
        selectedTeacher={selectedTeacher}
        onTeacherSelect={handleTeacherSelect}
        onTripEventClick={handleTripEventClick}
        onMakeupDateClick={handleMakeupDateClick}
        mode={mode}
      />

      <ConfirmModal
        isOpen={step === 'confirm-trip'}
        onClose={() => setStep('select')}
        onConfirm={handleConfirmTrip}
        title="출장"
        message={TripConfirmMessage({ selectedTripDate, selectedTeacher })}
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
        <TripCompleteContent selectedTripDate={selectedTripDate} onConfirm={handleTripComplete} />
      </Modal>

      <Modal isOpen={step === 'makeup-modal'} onClose={() => setStep('select-makeup')} padding="2.5rem">
        <MakeupSelectionContent
          selectedMakeupDate={selectedMakeupDate}
          availableMakeupPeriods={availableMakeupPeriods}
          selectedMakeupPeriods={selectedMakeupPeriods}
          selectedLocation={selectedLocation}
          onTogglePeriod={handleTogglePeriod}
          onLocationChange={setSelectedLocation}
          onCancel={() => setStep('select-makeup')}
          onConfirm={handleMakeupComplete}
        />
      </Modal>

      <Modal isOpen={step === 'all-complete'} onClose={handleAllComplete} padding="2.5rem">
        <AllCompleteContent
          selectedTripDate={selectedTripDate}
          selectedMakeupDate={selectedMakeupDate}
          selectedMakeupPeriods={selectedMakeupPeriods}
          onConfirm={handleAllComplete}
        />
      </Modal>
    </S.Container>
  );
}
