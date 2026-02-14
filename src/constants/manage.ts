// 나중에 백엔드 연동 시 이 파일은 삭제될 수 있습니다.

// 학급 번호
export const CLASSES = [1, 2, 3, 4];

// 모든 층의 장소 리스트
export const ALL_PLACES = [
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

// 학생 수
export const STUDENT_COUNT = 16;

export const PERIODS = [
    '1교시',
    '2교시',
    '3교시',
    '4교시',
    '5교시',
    '6교시',
    '7교시',
    '8-9교시',
    '10-11교시',
];

// 목업 학생 이름 리스트
const STUDENT_NAMES = [
    '김민수', '이서연', '박지훈', '최유진',
    '정수현', '강동훈', '윤서아', '한지민',
    '임태양', '송하늘', '오바다', '신별',
    '장구름', '권달', '문하늘', '배산'
];

// 목업 학생 데이터 생성 함수
export const generateMockStudents = (count: number = STUDENT_COUNT) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        number: i + 1,
        name: STUDENT_NAMES[i % STUDENT_NAMES.length]
    }));
};
