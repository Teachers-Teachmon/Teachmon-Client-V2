import { useState } from 'react';
import HeaderLeft from '../../containers/manage-student/header-left';
import HeaderRight from '../../containers/manage-student/header-right';
import ClassCard from '../../containers/manage-student/class-card';
import FloorSelector from '../../containers/manage-student/floor-selector';
import Map from '@/containers/manage-student/map';
import TextInput from '../../components/ui/input/text-input';
import * as S from './style';

export default function Manage() {
    const [selectedGrade, setSelectedGrade] = useState<number>(1);
    const [selectedFloor, setSelectedFloor] = useState<number>(1);
    const [selectedDate, setSelectedDate] = useState<string>('12월 12일 (수)');
    const [selectedPeriod, setSelectedPeriod] = useState<string>('7교시');
    const [isMapEnabled, setIsMapEnabled] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [highlightedPlace, setHighlightedPlace] = useState<string>('');

    const handleDatePeriodChange = (date: string, period: string) => {
        setSelectedDate(date);
        setSelectedPeriod(period);
    };

    const classes = [1, 2, 3, 4];

    // 모든 층의 장소 리스트
    const allPlaces = [
        // 1층
        { name: "응용프로그래밍화면구현실", floor: 1 },
        { name: "학습준비실", floor: 1 },
        { name: "과학실", floor: 1 },
        { name: "과학준비실", floor: 1 },
        { name: "프로그래밍실2", floor: 1 },
        { name: "학습자료실(1층)", floor: 1 },
        { name: "인공지능모델링실2", floor: 1 },
        { name: "학생자치회실", floor: 1 },
        { name: "학부모회실", floor: 1 },
        { name: "보건실", floor: 1 },
        { name: "크리에이티브존(1층)", floor: 1 },
        { name: "기획회의실", floor: 1 },
        { name: "교장실", floor: 1 },
        { name: "행정지원실", floor: 1 },
        { name: "문서관리실", floor: 1 },
        { name: "학년지원실(1학년)", floor: 1 },
        { name: "1-1", floor: 1 },
        { name: "1-2", floor: 1 },
        { name: "1-3", floor: 1 },
        { name: "1-4", floor: 1 },
        { name: "운동장", floor: 1 },
        { name: "빅데이터분석실", floor: 1 },
        { name: "인공지능모델링실1", floor: 1 },
        { name: "네트워크프로그래밍실", floor: 1 },
        { name: "소프트웨어개발과연구실", floor: 1 },
        { name: "다목적홀", floor: 1 },
        { name: "강사대기실", floor: 1 },
        { name: "음악실", floor: 1 },
        { name: "음악준비실", floor: 1 },
        { name: "외부", floor: 1 },
        // 2층
        { name: "공간-Arisori", floor: 2 },
        { name: "취업상담실", floor: 2 },
        { name: "학생지도실", floor: 2 },
        { name: "전문교무실", floor: 2 },
        { name: "전산관리실", floor: 2 },
        { name: "프로그래밍실1", floor: 2 },
        { name: "학습자료실(2층)", floor: 2 },
        { name: "응용프로그래밍개발실", floor: 2 },
        { name: "위클래스실", floor: 2 },
        { name: "일반회의실", floor: 2 },
        { name: "크리에이티브존(2층)", floor: 2 },
        { name: "여교사휴게실", floor: 2 },
        { name: "sw카페", floor: 2 },
        { name: "남교사휴게실", floor: 2 },
        { name: "일반교무실", floor: 2 },
        { name: "성적처리실", floor: 2 },
        { name: "방송실", floor: 2 },
        { name: "스튜디오", floor: 2 },
        { name: "학년지원실(2학년)", floor: 2 },
        { name: "2-1", floor: 2 },
        { name: "2-2", floor: 2 },
        { name: "2-3", floor: 2 },
        { name: "2-4", floor: 2 },
        { name: "BSSM GYM", floor: 2 },
        { name: "임베디드소프트웨어개발과연구실", floor: 2 },
        { name: "로봇소프트웨어개발실", floor: 2 },
        { name: "시스템프로그래밍실", floor: 2 },
        { name: "정보통신기기소프트웨어개발실", floor: 2 },
        { name: "글누리", floor: 2 },
        { name: "글가람", floor: 2 },
        // 3층
        { name: "커뮤니티홀", floor: 3 },
        { name: "3D프린터용제품제작실", floor: 3 },
        { name: "모둠학습실", floor: 3 },
        { name: "영어교과실", floor: 3 },
        { name: "기숙사운영부", floor: 3 },
        { name: "3-4", floor: 3 },
        { name: "3-3", floor: 3 },
        { name: "3-2", floor: 3 },
        { name: "3-1", floor: 3 },
        { name: "학습지원실(3학년)", floor: 3 },
        { name: "진로활동실", floor: 3 },
        { name: "베르실1", floor: 3 },
        { name: "베르실2", floor: 3 },
        { name: "베르실3", floor: 3 },
        { name: "베르실5", floor: 3 },
        { name: "베르실6", floor: 3 },
        { name: "산학협력부", floor: 3 },
        { name: "기숙사(3층)", floor: 3 },
        // 4층
        { name: "기숙사(4층)", floor: 4 },
        { name: "베르실7", floor: 4 },
        { name: "베르실8", floor: 4 },
        { name: "베르실9", floor: 4 },
    ];

    // 검색 결과 필터링
    const searchResults = searchQuery.trim() 
        ? allPlaces.filter(place => 
            place.name && 
            place.name !== "" && 
            place.name !== "X" &&
            place.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [];

    // 검색 결과 선택 핸들러
    const handleSelectPlace = (place: { name: string; floor: number }) => {
        setSelectedFloor(place.floor);
        setHighlightedPlace(place.name);
        setSearchQuery(''); // 검색어 초기화
    };

    // 8x2 학생 배치
    const students = Array.from({ length: 16 }, (_, i) => ({
        id: i + 1,
        number: 1,
        name: '김동욱'
    }));

    return (
        <S.Container>
            <S.Header isMapEnabled={isMapEnabled}>
                {isMapEnabled ? (
                    <FloorSelector
                        selectedFloor={selectedFloor}
                        onFloorChange={setSelectedFloor}
                    />
                ) : (
                    <HeaderLeft
                        selectedDate={selectedDate}
                        selectedPeriod={selectedPeriod}
                        selectedGrade={selectedGrade}
                        onGradeChange={setSelectedGrade}
                        onDatePeriodChange={handleDatePeriodChange}
                    />
                )}
                <S.RightSection>
                    <HeaderRight
                        isMapEnabled={isMapEnabled}
                        onMapToggle={() => setIsMapEnabled(!isMapEnabled)}
                    />
                    {isMapEnabled && (
                        <S.SearchContainer>
                            <S.SearchInputWrapper>
                                <TextInput
                                    placeholder="장소 검색"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </S.SearchInputWrapper>
                            {searchResults.length > 0 && (
                                <S.SearchResults>
                                    {searchResults.map((place, index) => (
                                        <S.SearchResultItem
                                            key={index}
                                            onClick={() => handleSelectPlace(place)}
                                        >
                                            <S.PlaceName>{place.name}</S.PlaceName>
                                            <S.FloorBadge>{place.floor}층</S.FloorBadge>
                                        </S.SearchResultItem>
                                    ))}
                                </S.SearchResults>
                            )}
                        </S.SearchContainer>
                    )}
                </S.RightSection>
            </S.Header>

            {isMapEnabled ? (
                <Map selectedFloor={selectedFloor} highlightedPlace={highlightedPlace} />
            ) : (
                <S.ClassGrid>
                    {classes.map((classNum) => (
                        <ClassCard
                            key={classNum}
                            classNum={classNum}
                            students={students}
                        />
                    ))}
                </S.ClassGrid>
            )}
        </S.Container>
    );
}