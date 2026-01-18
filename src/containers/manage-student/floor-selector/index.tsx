import { useQuery } from '@tanstack/react-query';
import { manageQuery } from '@/services/manage/manage.query';
import * as S from './style';

interface FloorSelectorProps {
    selectedFloor: number;
    onFloorChange: (floor: number) => void;
}

export default function FloorSelector({ selectedFloor, onFloorChange }: FloorSelectorProps) {
    const floors = [1, 2, 3, 4];

    // 각 층별 교실 수 조회
    const { data: floorsStatus = [0, 0, 0, 0] } = useQuery(manageQuery.allFloorsStatus());

    return (
        <S.Container>
            <S.HintText>
                {isMobile ? '확대, 축소할 수 있어요' : '스크롤로 확대, 축소할 수 있어요'}
            </S.HintText>
            <S.FloorTabs>
                {floors.map((floor, index) => (
                    <S.FloorTab
                        key={floor}
                        $isSelected={selectedFloor === floor}
                        onClick={() => onFloorChange(floor)}
                    >
                        {floor}층
                        {floorsStatus[index] > 0 && (
                            <S.Badge>{floorsStatus[index]}</S.Badge>
                        )}
                    </S.FloorTab>
                ))}
            </S.FloorTabs>
        </S.Container>
    );
}
