import { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import LocationDetail from '../modal/location-detail';
import useLocationStore from '@/stores/useLocationStore';
import { colors } from '@/styles/theme';
import { FLOOR_ELEMENTS_MAP, type FloorElement } from '@/constants/floorMaps';
import * as S from './style';

interface MapProps {
    selectedFloor: number;
    highlightedPlace?: string;
}

export default function Map({ selectedFloor, highlightedPlace }: MapProps) {
    const [isModal, setIsModal] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<string>('');
    const setPlace = useLocationStore((state: any) => state.setPlace);
    
    // 임시 데이터 - 실제로는 API에서 가져와야 함
    const data: { [key: string]: { status: string; studentName: string; studentNumber: number } } = {
        "1-1": { status: "자습", studentName: "김철수", studentNumber: 10101 },
        "1-2": { status: "이석", studentName: "이영희", studentNumber: 10102 },
        "1-3": { status: "자습", studentName: "박민수", studentNumber: 10103 },
        "과학실": { status: "이석", studentName: "최지연", studentNumber: 10201 },
        "프로그래밍실2": { status: "자습", studentName: "정수현", studentNumber: 10202 },
        "인공지능모델링실2": { status: "자습", studentName: "강동훈", studentNumber: 10203 },
        "운동장": { status: "이석", studentName: "윤서아", studentNumber: 10301 },
        "음악실": { status: "자습", studentName: "한지민", studentNumber: 10302 },
        "2-1": { status: "자습", studentName: "김민준", studentNumber: 20101 },
        "2-2": { status: "이석", studentName: "박서연", studentNumber: 20102 },
        "3-1": { status: "자습", studentName: "이도현", studentNumber: 30101 },
        "4-1": { status: "이석", studentName: "최유진", studentNumber: 40101 },
    };

    const handlePlaceClick = (placeName: string) => {
        setSelectedPlace(placeName);
        setIsModal(true);
        setPlace(placeName);
    };

    const handleModalClose = () => {
        setIsModal(false);
        setSelectedPlace('');
    };

    // 임시 학생 데이터 - 실제로는 API에서 가져와야 함
    const getStudentsForPlace = (_placeName: string) => {
        const mockStudents = [
            { studentNumber: 1401, studentName: '김동욱' },
            { studentNumber: 1402, studentName: '김동욱' },
            { studentNumber: 1403, studentName: '김동욱' },
            { studentNumber: 1404, studentName: '김동욱' },
            { studentNumber: 1405, studentName: '김동욱' },
            { studentNumber: 1401, studentName: '김동욱' },
        ];
        return mockStudents;
    };

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
                                        const status = data && data[el.name];
                                        const isHighlighted = highlightedPlace === el.name && el.name !== '' && el.name !== 'X';
                                        
                                        return (
                                            <S.Element
                                                onClick={() => {
                                                    if (status && el.name && el.name !== '' && el.name !== 'X') {
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
                                                        : status && status.status === '이석'
                                                        ? '#CCBCFF'
                                                        : status && status.status === '자습'
                                                        ? '#72FAAA'
                                                        : '#DDDDDD'
                                                }
                                                $cursor={status ? true : false}
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
                locationName={selectedPlace}
                students={getStudentsForPlace(selectedPlace)}
                onClose={handleModalClose}
            />
        </S.Container>
    );
}
