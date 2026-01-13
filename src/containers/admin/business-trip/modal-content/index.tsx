import Button from '@/components/ui/button';
import Dropdown from '@/components/ui/input/dropdown';
import { formatDate } from '@/utils/admin';
import type { AfterSchoolTeacher } from '@/types/admin';
import { LOCATION_OPTIONS } from '../data';
import * as S from './style';

interface TripCompleteContentProps {
  selectedTripDate: Date | null;
  onConfirm: () => void;
}

export function TripCompleteContent({ selectedTripDate, onConfirm }: TripCompleteContentProps) {
  return (
    <S.ModalContainer>
      <S.ModalTitle>출장</S.ModalTitle>
      <S.ModalMessage>
        {selectedTripDate && (
          <>
            <S.HighlightText>{formatDate(selectedTripDate)}</S.HighlightText>에 출장 처리가 완료되었습니다.
          </>
        )}
      </S.ModalMessage>
      <S.ModalButtonGroup>
        <Button variant="confirm" text="확인" onClick={onConfirm} width="100%" />
      </S.ModalButtonGroup>
    </S.ModalContainer>
  );
}

interface MakeupSelectionContentProps {
  selectedMakeupDate: Date | null;
  availableMakeupPeriods: string[];
  selectedMakeupPeriods: string[];
  selectedLocation: string;
  onTogglePeriod: (period: string) => void;
  onLocationChange: (value: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export function MakeupSelectionContent({
  selectedMakeupDate,
  availableMakeupPeriods,
  selectedMakeupPeriods,
  selectedLocation,
  onTogglePeriod,
  onLocationChange,
  onCancel,
  onConfirm,
}: MakeupSelectionContentProps) {
  return (
    <S.ModalContainer>
      <S.ModalTitle>방과후 보강 선택</S.ModalTitle>
      <S.ModalDateText>{selectedMakeupDate && formatDate(selectedMakeupDate)}</S.ModalDateText>

      <S.SelectionContainer>
        {availableMakeupPeriods.includes('8~9') && (
          <S.SelectionBox
            $isSelected={selectedMakeupPeriods.includes('8~9')}
            onClick={() => onTogglePeriod('8~9')}
          >
            8~9교시 보강
          </S.SelectionBox>
        )}
        {availableMakeupPeriods.includes('10~11') && (
          <S.SelectionBox
            $isSelected={selectedMakeupPeriods.includes('10~11')}
            onClick={() => onTogglePeriod('10~11')}
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
          onChange={onLocationChange}
        />
      </S.DropdownSection>

      <S.ModalButtonGroup>
        <Button variant="cancel" text="취소" onClick={onCancel} width="50%" />
        <Button variant="confirm" text="완료" onClick={onConfirm} width="50%" />
      </S.ModalButtonGroup>
    </S.ModalContainer>
  );
}

interface AllCompleteContentProps {
  selectedTripDate: Date | null;
  selectedMakeupDate: Date | null;
  selectedMakeupPeriods: string[];
  onConfirm: () => void;
}

export function AllCompleteContent({
  selectedTripDate,
  selectedMakeupDate,
  selectedMakeupPeriods,
  onConfirm,
}: AllCompleteContentProps) {
  return (
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
        <Button variant="confirm" text="확인" onClick={onConfirm} width="100%" />
      </S.ModalButtonGroup>
    </S.ModalContainer>
  );
}

interface TripConfirmMessageProps {
  selectedTripDate: Date | null;
  selectedTeacher?: AfterSchoolTeacher;
}

export function TripConfirmMessage({ selectedTripDate, selectedTeacher }: TripConfirmMessageProps) {
  if (!selectedTripDate) return '';
  const nameMatch = selectedTeacher?.name?.match(/\((.+)\)/)?.[1];
  return `${formatDate(selectedTripDate)}에 ${nameMatch ?? ''} 선생님의 출장을 대신 처리하시겠습니까?`;
}
