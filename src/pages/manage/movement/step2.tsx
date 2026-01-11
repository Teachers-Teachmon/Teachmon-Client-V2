import { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import TextInput from '@/components/ui/input/text-input';
import { FLOOR_ELEMENTS_MAP, type FloorElement } from '@/constants/floorMaps';
import * as S from './step2Style';

interface MovementStep2Props {
    onBack: () => void;
    onComplete: (location: string) => void;
}

export default function MovementStep2({ onBack, onComplete }: MovementStep2Props) {
    const [selectedFloor, setSelectedFloor] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState<string>('');

    const floors = [1, 2, 3, 4];
    const elements = FLOOR_ELEMENTS_MAP[selectedFloor] || [];

    const handleLocationClick = (placeName: string) => {
        if (placeName && placeName !== '' && placeName !== 'X') {
            setSelectedLocation(placeName);
            onComplete(placeName);
        }
    };

    return (
        <S.Container>
            <S.TopSection>
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
                        leftIcon={
                            <img 
                                src="/icons/common/search.svg" 
                                alt="search"
                                style={{ width: '24px', height: '24px' }}
                            />
                        }
                    />
                </S.SearchWrapper>
            </S.TopSection>

            <S.MapContainer>
                <TransformWrapper
                    initialScale={1}
                    minScale={0.5}
                    maxScale={3}
                >
                    {({ zoomIn, zoomOut, resetTransform }) => (
                        <>
                            <S.ZoomControls>
                                <S.ZoomButton onClick={() => zoomIn()}>
                                    <img src="/icons/student/zoom-in.svg" alt="zoom in" style={{ width: '30px', height: '30px' }} />
                                </S.ZoomButton>
                                <S.ZoomButton onClick={() => resetTransform()}>⟲</S.ZoomButton>
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
                                <S.MapContent>
                                    <S.MapWrapper>
                                        {elements.map((el: FloorElement) => {
                                            const isSelected = selectedLocation === el.name;
                                            const isClickable = el.name && el.name !== '' && el.name !== 'X';
                                            
                                            return (
                                                <S.Element
                                                    key={el.id}
                                                    $left={el.x}
                                                    $top={el.y}
                                                    $width={el.width}
                                                    $height={el.height}
                                                    $background={
                                                        isSelected
                                                            ? '#2e6ff2'
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
            </S.MapContainer>

            <S.ButtonWrapper>
                <S.BackButton onClick={onBack}>이전</S.BackButton>
            </S.ButtonWrapper>
        </S.Container>
    );
}
