// 관리자 페이지 관련 상수

// 요일 목록
export const WEEKDAYS = ['월요일', '화요일', '수요일', '목요일'] as const;

// 사용자 역할
export const USER_ROLES = {
  ADMIN: '관리자',
  NORMAL: '일반',
} as const;

// 탭 타입
export const TAB_TYPES = {
  TEACHER: '선생님',
  STUDENT: '학생',
} as const;

// 정렬 순서
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export const ADMIN_AFTER_SCHOOL_PERIODS = ['7교시', '8~9교시', '10~11교시'] as const;
export const SMILE_OPTIONS = ['객체지향 프로그래밍', '파이썬을 이용한 문제해결', '스프링 수업'] as const;

import type { AdminAfterSchoolClass } from '@/types/afterSchool';

export const MOCK_ADMIN_AFTER_SCHOOL: AdminAfterSchoolClass[] = [
  {
    id: '1',
    grade: 1,
    day: '월요일',
    period: '8~9교시',
    teacher: '자수만',
    location: '객체지향 프로그래밍',
    subject: '정보자신감/기타 과학영 방기 참가 JAVA',
    students: ['1410 윤도훈', '1420 윤도훈', '1430 윤도훈', '1440 윤도훈', '1450 윤도훈'],
  },
  {
    id: '2',
    grade: 1,
    day: '월요일',
    period: '8~9교시',
    teacher: '자수만',
    location: '파이썬을 이용한 문제해결',
    subject: '정보자신감/기타 과학영 방기 참가 JAVA',
    students: ['1410 윤도훈', '1420 윤도훈', '1430 윤도훈', '1440 윤도훈', '1450 윤도훈'],
  },
  {
    id: '3',
    grade: 1,
    day: '월요일',
    period: '8~9교시',
    teacher: '자수만',
    location: '스프링 수업',
    subject: '정보자신감/기타 과학영 방기 참가 JAVA',
    students: ['1410 윤도훈', '1420 윤도훈', '1430 윤도훈', '1440 윤도훈', '1450 윤도훈'],
  },
  {
    id: '4',
    grade: 1,
    day: '월요일',
    period: '8~9교시',
    teacher: '자수만',
    location: '1학년 1반',
    subject: '정보자신감/기타 과학영 방기 참가 JAVA',
    students: ['1410 윤도훈', '1420 윤도훈', '1430 윤도훈', '1440 윤도훈', '1450 윤도훈'],
  },
  {
    id: '5',
    grade: 1,
    day: '월요일',
    period: '8~9교시',
    teacher: '자수만',
    location: '1학년 2반',
    subject: '정보자신감/기타 과학영 방기 참가 JAVA',
    students: ['1410 윤도훈', '1420 윤도훈', '1430 윤도훈', '1440 윤도훈', '1450 윤도훈'],
  },
  {
    id: '6',
    grade: 1,
    day: '월요일',
    period: '8~9교시',
    teacher: '자수만',
    location: '음악실',
    subject: '정보자신감/기타 과학영 방기 참가 JAVA',
    students: ['1410 윤도훈', '1420 윤도훈', '1430 윤도훈', '1440 윤도훈', '1450 윤도훈'],
  },
];



