import { GRADES } from './common';

// 학급 번호
export const CLASSES = [1, 2, 3, 4] as const;

// 교시 목록
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
] as const;

// 학생 수
export const STUDENT_COUNT = 16;

// 목업 학생 이름 리스트
const STUDENT_NAMES = [
  '김민수', '이서연', '박지훈', '최유진',
  '정수현', '강동훈', '윤서아', '한지민',
  '임태양', '송하늘', '오바다', '신별',
  '장구름', '권달', '문하늘', '배산'
] as const;

// 목업 학생 데이터 생성 함수
export const generateMockStudents = (count: number = STUDENT_COUNT) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    number: i + 1,
    name: STUDENT_NAMES[i % STUDENT_NAMES.length]
  }));
};
