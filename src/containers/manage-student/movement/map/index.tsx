import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import FloorSearchControls from './floor-search-controls';
import ZoomControls from './zoom-controls';
import MapView from './map-view';
import { useCreateLeaveSeatMutation } from '@/services/movement/movement.mutation';
import type { MovementFormData } from '@/pages/manage/movement';
import * as S from './style';

interface MovementMapProps {
    onBack: () => void;
    formData: MovementFormData;
}

export default function MovementMap({ onBack, formData }: MovementMapProps) {
    const navigate = useNavigate();
    const [selectedFloor, setSelectedFloor] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const { mutate: createLeaveSeat } = useCreateLeaveSeatMutation();

    const handleLocationClick = (placeName: string) => {
        if (placeName && placeName !== '' && placeName !== 'X') {
            createLeaveSeat(
                {
                    ...formData,
                    place: placeName,
                },
                {
                    onSuccess: () => {
                        navigate('/manage');
                    },
                }
            );
        }
    };

    return (
        <S.Container>
            <S.BackButton onClick={onBack}>
                <img src="/icons/common/back.svg" alt="back" style={{ width: '24px', height: '24px' }} />
            </S.BackButton>
            
            <FloorSearchControls
                selectedFloor={selectedFloor}
                onFloorChange={setSelectedFloor}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            <S.MapContainer>
                <TransformWrapper
                    initialScale={1}
                    minScale={0.5}
                    maxScale={3}
                >
                    {({ zoomIn, zoomOut, resetTransform }) => (
                        <>
                            <ZoomControls
                                onZoomIn={zoomIn}
                                onZoomOut={zoomOut}
                                onReset={resetTransform}
                            />
                            
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
                                <MapView
                                    selectedFloor={selectedFloor}
                                    searchQuery={searchQuery}
                                    onLocationClick={handleLocationClick}
                                />
                            </TransformComponent>
                        </>
                    )}
                </TransformWrapper>
            </S.MapContainer>
        </S.Container>
    );
}
