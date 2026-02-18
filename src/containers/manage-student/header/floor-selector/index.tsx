import { useQuery } from '@tanstack/react-query';
import { manageQuery } from '@/services/manage/manage.query';
import { useDevice } from '@/hooks/useDevice';
import type { Period } from '@/types/manage';

import * as S from './style';

interface FloorSelectorProps {
    selectedFloor: number;
    onFloorChange: (floor: number) => void;
    selectedDate?: string;
    selectedPeriod?: Period;
}

export default function FloorSelector({ selectedFloor, onFloorChange, selectedDate, selectedPeriod }: FloorSelectorProps) {
    const floors = [1, 2, 3, 4];
    const { isMobile } = useDevice();

    // 각 층별 교실 수 조회
    const { data: floorsStatus = [] } = useQuery(
        manageQuery.allFloorsStatus(
            selectedDate && selectedPeriod ? { day: selectedDate, period: selectedPeriod } : undefined
        )
    );

    return (
        <S.Container>
            <S.HintText>
                {isMobile ? '확대, 축소할 수 있어요' : '스크롤로 확대, 축소할 수 있어요'}
            </S.HintText>
            <S.FloorTabs>
                {floors.map((floor) => {
                    const floorData = floorsStatus.find((f) => f.floor === floor);
                    const count = floorData?.count || 0;
                    
                    return (
                        <S.FloorTab
                            key={floor}
                            $isSelected={selectedFloor === floor}
                            onClick={() => onFloorChange(floor)}
                        >
                            {floor}층
                            {count > 0 && <S.Badge>{count}</S.Badge>}
                        </S.FloorTab>
                    );
                })}
            </S.FloorTabs>
        </S.Container>
    );
}
