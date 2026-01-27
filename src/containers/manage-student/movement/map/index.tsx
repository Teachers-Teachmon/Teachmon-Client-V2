import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import TextInput from '@/components/ui/input/text-input';
import { FLOOR_ELEMENTS_MAP, type FloorElement } from '@/constants/floorMaps';
import { colors } from '@/styles/theme';
import * as S from './style';

interface MovementMapProps {
    onBack: () => void;
}

export default function MovementMap({ onBack }: MovementMapProps) {
    const navigate = useNavigate();
    const [selectedFloor, setSelectedFloor] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const handleLocationClick = (placeName: string) => {
        if (placeName && placeName !== '' && placeName !== 'X') {
            console.log('선택된 장소:', placeName);
            navigate('/manage');
        }
    };

    const floors = [1, 2, 3, 4];
    const elements = FLOOR_ELEMENTS_MAP[selectedFloor] || [];

    return (
        <S.Container>
            <S.BackButton onClick={onBack}>
                <img src="/icons/common/back.svg" alt="back" style={{ width: '24px', height: '24px' }} />
            </S.BackButton>

            {/* Floor Search Controls */}
            <S.FloorSearchContainer>
                <S.FloorSelector>
                    {floors.map((floor) => (
                        <S.FloorTab
                            key={floor}
                            $isSelected={selectedFloor === floor}
                            onClick={() => setSelectedFloor(floor)}
                        >
                            {floor}층
                        </S.FloorTab>
                    ))}
                </S.FloorSelector>

                <S.SearchWrapper>
                    <TextInput
                        placeholder="장소이름을 입력해주세요."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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
            </S.FloorSearchContainer>

            <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={3}
            >
                {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                        {/* Zoom Controls */}
                        <S.ZoomControls>
                            <S.ZoomButton onClick={() => zoomIn()}>
                                <img src="/icons/student/zoom-in.svg" alt="zoom in" style={{ width: '30px', height: '30px' }} />
                            </S.ZoomButton>
                            <S.ZoomButton onClick={() => resetTransform()}>
                                <img src="/icons/student/mdi_reload.svg" alt="reset" style={{ width: '20px', height: '20px' }} />
                            </S.ZoomButton>
                            <S.ZoomButton onClick={() => zoomOut()}>
                                <img src="/icons/student/zoom-out.svg" alt="zoom out" style={{ width: '30px', height: '30px' }} />
                            </S.ZoomButton>
                        </S.ZoomControls>

                        <TransformComponent
                            wrapperStyle={{
                                width: '100%',
                                height: '100%',
                            }}
                            contentStyle={{
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            {/* Map View */}
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
                                                onClick={() => handleLocationClick(el.name)}
                                            >
                                                {el.name}
                                            </S.Element>
                                        );
                                    })}
                                </S.MapWrapper>
                            </S.MapContent>
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
        </S.Container>
    );
}
