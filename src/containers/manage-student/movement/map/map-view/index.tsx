import { FLOOR_ELEMENTS_MAP, type FloorElement } from '@/constants/floorMaps';
import * as S from './style';
import { colors } from '@/styles/theme';

interface MapViewProps {
    selectedFloor: number;
    searchQuery: string;
    onLocationClick: (placeName: string) => void;
}

export default function MapView({ selectedFloor, searchQuery, onLocationClick }: MapViewProps) {
    const elements = FLOOR_ELEMENTS_MAP[selectedFloor] || [];

    return (
        <S.MapContent>
            <S.MapWrapper>
                {elements.map((el: FloorElement) => {
                    const isHighlighted = searchQuery && el.name.includes(searchQuery);
                    const isClickable = el.name && el.name !== '' && el.name !== 'X';
                    
                    return (
                        <S.Element
                            key={el.id}
                            $left={el.x}
                            $top={el.y}
                            $width={el.width}
                            $height={el.height}
                            $background={
                                isHighlighted
                                    ? colors.primary200
                                    : '#DDDDDD'
                            }
                            $cursor={!!isClickable}
                            onClick={() => onLocationClick(el.name)}
                        >
                            {el.name}
                        </S.Element>
                    );
                })}
            </S.MapWrapper>
        </S.MapContent>
    );
}
