import { createPortal } from 'react-dom';
import ActionBar from '@/containers/manage-student/header/action-bar';
import TextInput from '@/components/ui/input/text-input';
import * as S from './style';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMapEnabled: boolean;
  onMapToggle: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchResults: Array<{ name: string; floor: number }>;
  onSelectPlace: (place: { name: string; floor: number }) => void;
}

export default function MobileSidebar({
  isOpen,
  onClose,
  isMapEnabled,
  onMapToggle,
  searchQuery,
  onSearchChange,
  searchResults,
  onSelectPlace,
}: MobileSidebarProps) {
  if (!isOpen) return null;

  const handleMapToggle = () => {
    onMapToggle();
    onClose();
  };

  return createPortal(
    <>
      <S.Overlay onClick={onClose} />
      <S.Container>
        {isMapEnabled && (
          <S.SearchContainer>
            <TextInput
              placeholder="장소 검색"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchResults.length > 0 && (
              <S.SearchResults>
                {searchResults.map((place, index) => (
                  <S.SearchResultItem
                    key={index}
                    onClick={() => {
                      onSelectPlace(place);
                      onClose();
                    }}
                  >
                    <S.PlaceName>{place.name}</S.PlaceName>
                    <S.FloorBadge>{place.floor}층</S.FloorBadge>
                  </S.SearchResultItem>
                ))}
              </S.SearchResults>
            )}
          </S.SearchContainer>
        )}
        
        <ActionBar
          isMapEnabled={isMapEnabled}
          onMapToggle={handleMapToggle}
        />
      </S.Container>
    </>,
    document.body
  );
}
