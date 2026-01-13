import TextInput from '@/components/ui/input/text-input';
import * as S from './style';

interface FloorSearchControlsProps {
    selectedFloor: number;
    onFloorChange: (floor: number) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export default function FloorSearchControls({
    selectedFloor,
    onFloorChange,
    searchQuery,
    onSearchChange,
}: FloorSearchControlsProps) {
    const floors = [1, 2, 3, 4];

    return (
        <S.Container>
            <S.FloorSelector>
                {floors.map((floor) => (
                    <S.FloorTab
                        key={floor}
                        $isSelected={selectedFloor === floor}
                        onClick={() => onFloorChange(floor)}
                    >
                        {floor}층
                    </S.FloorTab>
                ))}
            </S.FloorSelector>

            <S.SearchWrapper>
                <TextInput
                    placeholder="장소이름을 입력해주세요."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    customHeight="44px"
                    leftIcon={
                        <img 
                            src="/icons/common/search.svg" 
                            alt="search"
                            style={{ width: '24px', height: '24px' }}
                        />
                    }
                />
            </S.SearchWrapper>
        </S.Container>
    );
}
