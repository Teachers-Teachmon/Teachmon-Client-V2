import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import LocationDetail from '../modal/location-detail';
import useLocationStore from '@/stores/useLocationStore';
import { manageQuery } from '@/services/manage/manage.query';
import { colors } from '@/styles/theme';
import { FLOOR_ELEMENTS_MAP, type FloorElement } from '@/constants/floorMaps';
import * as S from './style';

interface MapProps {
    selectedFloor: number;
    highlightedPlace?: string;
}

export default function Map({ selectedFloor, highlightedPlace }: MapProps) {
    const [isModal, setIsModal] = useState(false);
    const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
    const setPlace = useLocationStore((state: any) => state.setPlace);
    
    // 층별 장소 상태 조회
    const { data: placesData = [] } = useQuery({
        ...manageQuery.placesByFloor({ floor: selectedFloor }),
        retry: false,
    });

    // 선택된 장소의 학생 목록 조회
    const { data: placeSchedule } = useQuery({
        ...manageQuery.placeSchedule(selectedPlaceId!),
        enabled: !!selectedPlaceId && isModal,
        retry: false,
    });

    // 장소 이름으로 place_id 찾기
    const getPlaceIdByName = (placeName: string) => {
        const place = placesData.find((p: any) => p.place_name === placeName);
        return place?.place_id;
    };

    const handlePlaceClick = (placeName: string) => {
        const placeId = getPlaceIdByName(placeName);
        if (placeId) {
            setSelectedPlaceId(placeId);
            setIsModal(true);
            setPlace(placeName);
        }
    };

    const handleModalClose = () => {
        setIsModal(false);
        setSelectedPlaceId(null);
    };

    // 장소별 상태 데이터를 맵으로 변환
    const placeStatusMap: { [key: string]: any } = {};
    placesData.forEach((place: any) => {
        placeStatusMap[place.place_name] = place;
    });

    const elements = FLOOR_ELEMENTS_MAP[selectedFloor] || [];

    return (
        <S.Container>
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
                            <S.ZoomButton onClick={() => resetTransform()}>
                                <img src="/icons/student/mdi_reload.svg" alt="zoom out" style={{ width: '20px', height: '20px' }} />
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
                            <S.MapContent>
                                <S.MapWrapper>
                                    {elements.map((el: FloorElement) => {
                                        const placeData = placeStatusMap[el.name];
                                        const isHighlighted = highlightedPlace === el.name && el.name !== '' && el.name !== 'X';
                                        
                                        return (
                                            <S.Element
                                                onClick={() => {
                                                    if (placeData && el.name && el.name !== '' && el.name !== 'X') {
                                                        handlePlaceClick(el.name);
                                                    }
                                                }}
                                                key={el.id}
                                                $left={el.x}
                                                $top={el.y}
                                                $width={el.width}
                                                $height={el.height}
                                                $background={
                                                    isHighlighted
                                                        ? colors.primary200
                                                        : placeData?.status === 'LEAVE_SEAT'
                                                        ? '#CCBCFF'
                                                        : placeData?.status === 'SELF_STUDY'
                                                        ? '#72FAAA'
                                                        : '#DDDDDD'
                                                }
                                                $cursor={!!placeData}
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
            <LocationDetail
                isOpen={isModal}
                locationName={placeSchedule?.place_name || ''}
                students={placeSchedule?.students.map((s: any) => ({
                    studentNumber: s.number,
                    studentName: s.name,
                })) || []}
                onClose={handleModalClose}
            />
        </S.Container>
    );
}
