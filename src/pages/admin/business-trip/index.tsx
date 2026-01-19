import { useMemo, useState } from 'react';
import * as S from './style';
import BusinessTripSection from '@/containers/admin/business-trip';
import ConfirmModal from '@/components/layout/modal/confirm';
import Modal from '@/components/layout/modal';
import type { CalendarEvent } from '@/types/calendar';
import type { AfterSchoolTeacher } from '@/types/admin';
import type { PlaceSearchItem } from '@/services/admin/afterSchool/adminAfterSchool.api';
import { formatDateString } from '@/utils/admin';
import { AllCompleteContent, MakeupSelectionContent, TripCompleteContent, TripConfirmMessage } from '@/containers/admin/business-trip/modal-content';
import { transformBusinessTripToCalendarEvents, transformMakeupToCalendarEvents } from '@/utils/admin';
import {
  useAdminAfterSchoolSearchQuery,
  useAdminPlaceSearchQuery,
  useBusinessTripAffordableQuery,
  useReinforcementAffordableQuery,
} from '@/services/admin/afterSchool/adminAfterSchool.query';
import {
  useRequestBusinessTripMutation,
  useRequestReinforcementMutation,
} from '@/services/admin/afterSchool/adminAfterSchool.mutation';

export default function BusinessTripPage() {
  type Step = 'select' | 'confirm-trip' | 'ask-makeup' | 'trip-complete' | 'select-makeup' | 'makeup-modal' | 'all-complete';

  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [step, setStep] = useState<Step>('select');
  const [selectedTeacher, setSelectedTeacher] = useState<AfterSchoolTeacher | undefined>(undefined);
  const [teacherSearchQuery, setTeacherSearchQuery] = useState('');
  const [selectedTripDate, setSelectedTripDate] = useState<Date | null>(null);
  const [selectedMakeupDate, setSelectedMakeupDate] = useState<Date | null>(null);
  const [availableMakeupPeriods, setAvailableMakeupPeriods] = useState<string[]>([]);
  const [selectedMakeupPeriods, setSelectedMakeupPeriods] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceSearchItem | null>(null);
  const [placeSearchQuery, setPlaceSearchQuery] = useState('');

  const { data: afterSchoolOptions } = useAdminAfterSchoolSearchQuery(teacherSearchQuery);
  const { data: tripAffordable } = useBusinessTripAffordableQuery(month, selectedTeacher?.id);
  const { data: makeupAffordable } = useReinforcementAffordableQuery(month, selectedTeacher?.id);
  const { data: placeOptions } = useAdminPlaceSearchQuery(placeSearchQuery);
  const { mutate: requestBusinessTrip } = useRequestBusinessTripMutation();
  const { mutate: requestReinforcement } = useRequestReinforcementMutation();

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
    setSelectedTripDate(null);
    setSelectedMakeupDate(null);
    setSelectedMakeupPeriods([]);
    setSelectedPlace(null);
  };

  const handleTripEventClick = (event: CalendarEvent) => {
    setSelectedTripDate(event.date);
    setStep('confirm-trip');
  };

  const handleConfirmTrip = () => {
    if (!selectedTeacher || !selectedTripDate) return;
    requestBusinessTrip(
      {
        day: formatDateString(selectedTripDate),
        afterschool_id: selectedTeacher.id,
      },
      {
        onSuccess: () => setStep('ask-makeup'),
      }
    );
  };

  const handleProceedToMakeup = () => {
    setStep('select-makeup');
  };

  const handleTripComplete = () => {
    resetState();
  };

  const handleMakeupDateClick = (date: Date) => {
    const dateString = formatDateString(date);
    const availableData = (makeupAffordable ?? []).filter(item => item.day === dateString);

    if (availableData.length === 0) return;

    const periods: string[] = [];
    availableData.forEach(item => {
      if (item.start_period === 8 && item.end_period === 9) periods.push('8~9');
      if (item.start_period === 10 && item.end_period === 11) periods.push('10~11');
    });

    setAvailableMakeupPeriods(periods);
    setSelectedMakeupDate(date);
    setSelectedMakeupPeriods([]);
    setSelectedPlace(null);
    setPlaceSearchQuery('');
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
    if (!selectedTeacher || !selectedMakeupDate || selectedMakeupPeriods.length === 0 || !selectedPlace) {
      alert('보강 시간과 장소를 선택해주세요.');
      return;
    }

    const day = formatDateString(selectedMakeupDate);
    selectedMakeupPeriods.forEach((period) => {
      const isFirst = period === '8~9';
      requestReinforcement({
        day,
        afterschool_id: selectedTeacher.id,
        change_start_period: isFirst ? 8 : 10,
        change_end_period: isFirst ? 9 : 11,
        change_place_id: selectedPlace.id,
      });
    });

    setStep('all-complete');
  };

  const handleAllComplete = () => {
    console.log('출장 및 보강 완료:', {
      tripDate: selectedTripDate,
      makeupDate: selectedMakeupDate,
      makeupPeriods: selectedMakeupPeriods,
      location: selectedPlace,
    });
    resetState();
  };

  const resetState = () => {
    setStep('select');
    setSelectedTripDate(null);
    setSelectedMakeupDate(null);
    setAvailableMakeupPeriods([]);
    setSelectedMakeupPeriods([]);
    setSelectedPlace(null);
    setPlaceSearchQuery('');
  };

  const tripEvents = useMemo<CalendarEvent[]>(() => {
    if (!tripAffordable) return [];
    const mapped = tripAffordable.map((item) => ({
      day: item.day,
      startPeriod: item.start_period,
      endPeriod: item.end_period,
    }));
    return transformBusinessTripToCalendarEvents(mapped);
  }, [tripAffordable]);

  const makeupEvents = useMemo<CalendarEvent[]>(() => {
    if (!makeupAffordable) return [];
    const mapped = makeupAffordable.map((item) => ({
      day: item.day,
      startPeriod: item.start_period,
      endPeriod: item.end_period,
    }));
    return transformMakeupToCalendarEvents(mapped);
  }, [makeupAffordable]);

  return (
    <S.Container>
      <BusinessTripSection
        year={year}
        month={month}
        onMonthChange={handleMonthChange}
        selectedTeacher={selectedTeacher}
        teacherOptions={afterSchoolOptions ?? []}
        teacherSearchQuery={teacherSearchQuery}
        onTeacherSearchChange={setTeacherSearchQuery}
        onTeacherSelect={handleTeacherSelect}
        onTripEventClick={handleTripEventClick}
        onMakeupDateClick={handleMakeupDateClick}
        tripEvents={tripEvents}
        makeupEvents={makeupEvents}
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
          selectedPlace={selectedPlace}
          placeItems={placeOptions ?? []}
          placeQuery={placeSearchQuery}
          onPlaceQueryChange={setPlaceSearchQuery}
          onPlaceChange={setSelectedPlace}
          onTogglePeriod={handleTogglePeriod}
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
