import { useDevice } from '@/hooks/useDevice';
import * as S from './style';

interface FloorSelectorProps {
    selectedFloor: number;
    onFloorChange: (floor: number) => void;
}

export default function FloorSelector({ selectedFloor, onFloorChange }: FloorSelectorProps) {
    const floors = [1, 2, 3, 4];
    const { isMobile } = useDevice();

    return (
        <S.Container>
            <S.HintText>
                {isMobile ? '확대, 축소할 수 있어요' : '스크롤로 확대, 축소할 수 있어요'}
            </S.HintText>
            <S.FloorTabs>
                {floors.map((floor) => (
                    <S.FloorTab
                        key={floor}
                        $isSelected={selectedFloor === floor}
                        onClick={() => onFloorChange(floor)}
                    >
                        {floor}층
                    </S.FloorTab>
                ))}
            </S.FloorTabs>
        </S.Container>
    );
}
