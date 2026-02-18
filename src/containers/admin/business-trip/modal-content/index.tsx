import Button from '@/components/ui/button';
import SearchDropdown from '@/components/ui/input/dropdown/search';
import { formatDate } from '@/utils/admin';
import type { AfterSchoolTeacher } from '@/types/admin';
import type { PlaceSearchItem } from '@/services/admin/afterSchool/adminAfterSchool.api';
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
  availableMakeupPeriods: ('8~9' | '10~11')[];
  selectedMakeupPeriods: ('8~9' | '10~11')[];
  selectedPlace: PlaceSearchItem | null;
  placeItems: PlaceSearchItem[];
  placeQuery: string;
  onPlaceQueryChange: (value: string) => void;
  onPlaceChange: (place: PlaceSearchItem) => void;
  onTogglePeriod: (period: '8~9' | '10~11') => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export function MakeupSelectionContent({
  selectedMakeupDate,
  availableMakeupPeriods,
  selectedMakeupPeriods,
  selectedPlace,
  placeItems,
  placeQuery,
  onPlaceQueryChange,
  onPlaceChange,
  onTogglePeriod,
  onCancel,
  onConfirm,
}: MakeupSelectionContentProps) {
  return (
    <S.ModalContainer>
      <S.ModalTitle>방과후 보강 선택</S.ModalTitle>
      <S.ModalDateText>{selectedMakeupDate && formatDate(selectedMakeupDate)}</S.ModalDateText>

      <S.SelectionContainer>
        {[
          { label: '8~9교시 보강', value: '8~9' },
          { label: '10~11교시 보강', value: '10~11' },
        ].map(({ label, value }) => {
          const isAvailable = availableMakeupPeriods.includes(value);
          const isSelected = selectedMakeupPeriods.includes(value);

          return (
            <S.SelectionBox
              key={value}
              $isSelected={isSelected}
              $isDisabled={!isAvailable}
              onClick={() => {
                if (isAvailable) {
                  onTogglePeriod(value);
                }
              }}
            >
              <S.SelectionText>{label}</S.SelectionText>
            </S.SelectionBox>
          );
        })}
      </S.SelectionContainer>

      <S.DropdownSection>
        <S.DropdownLabel>장소</S.DropdownLabel>
        <SearchDropdown
          items={placeItems}
          placeholder="장소"
          value={selectedPlace ?? undefined}
          searchQuery={placeQuery}
          onSearchChange={onPlaceQueryChange}
          onChange={onPlaceChange}
          renderItem={(item) => `${item.name} (${item.floor}층)`}
          getItemKey={(item) => item.id}
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
