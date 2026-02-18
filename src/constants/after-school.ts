import type { TodayClass, AfterSchoolClass } from '@/types/after-school';

export const DAYS = ['월요일', '화요일', '수요일', '목요일'] as const;

export const DAY_MAPPING: Record<string, string> = {
    '월요일': '월',
    '화요일': '화',
    '수요일': '수',
    '목요일': '목',
};

export const DAY_TO_ENGLISH: Record<string, 'MON' | 'TUE' | 'WED' | 'THU' > = {
    '월요일': 'MON',
    '화요일': 'TUE',
    '수요일': 'WED',
    '목요일': 'THU',
};

export const ITEMS_PER_PAGE = 4;

export const MENU_OPTIONS = ['출장', '보강', '종료'] as const;

export const MOCK_TODAY_CLASSES: TodayClass[] = [
  {
    id: '1',
    quarter: 3,
    subject: '파이썬을 이용한 문제해결',
    teacher: '곽상미',
    program: '프로그래밍',
    date: '1학년 8~9교시'
  },
  {
    id: '2',
    quarter: 3,
    subject: '파이썬을 이용한 문제해결',
    teacher: '곽상미',
    program: '프로그래밍',
    date: '1학년 8~9교시'
  }
];

export const MOCK_MY_CLASSES: AfterSchoolClass[] = [
  {
    id: '1',
    grade: 1,
    subject: '파이썬을 이용한 문제해결',
    teacher: '곽상미',
    day: '월',
    time: '8~9교시',
    quarter: 1,
    program: '객체지향 프로그래밍'
  },
  {
    id: '2',
    grade: 1,
    subject: '파이썬을 이용한 문제해결',
    teacher: '곽상미',
    day: '월',
    time: '8~9교시',
    quarter: 1,
    program: '객체지향 프로그래밍'
  },
  {
    id: '3',
    grade: 1,
    subject: '파이썬을 이용한 문제해결',
    teacher: '곽상미',
    day: '월',
    time: '8~9교시',
    quarter: 1,
    program: '객체지향 프로그래밍'
  },
  {
    id: '4',
    grade: 1,
    subject: '파이썬을 이용한 문제해결',
    teacher: '곽상미',
    day: '월',
    time: '8~9교시',
    quarter: 1,
    program: '객체지향 프로그래밍'
  }
];

export const MOCK_ALL_CLASSES: AfterSchoolClass[] = [
  {
    id: '1',
    grade: 1,
    subject: '파이썬을 이용한 문제해결',
    teacher: '곽상미',
    day: '월',
    time: '8~9교시',
    quarter: 3,
    program: '객체지향 프로그래밍실'
  },
  {
    id: '2',
    grade: 1,
    subject: '파이썬을 이용한 문제해결',
    teacher: '곽상미',
    day: '월',
    time: '8~9교시',
    quarter: 3,
    program: '객체지향 프로그래밍실'
  },
  {
    id: '3',
    grade: 1,
    subject: '파이썬을 이용한 문제해결',
    teacher: '곽상미',
    day: '월',
    time: '8~9교시',
    quarter: 3,
    program: '객체지향 프로그래밍실'
  },
  {
    id: '4',
    grade: 1,
    subject: '파이썬을 이용한 문제해결',
    teacher: '곽상미',
    day: '월',
    time: '8~9교시',
    quarter: 3,
    program: '객체지향 프로그래밍실'
  },
  {
    id: '5',
    grade: 1,
    subject: '파이썬을 이용한 문제해결',
    teacher: '곽상미',
    day: '월',
    time: '8~9교시',
    quarter: 3,
    program: '객체지향 프로그래밍실'
  },
  {
    id: '6',
    grade: 1,
    subject: '파이썬을 이용한 문제해결',
    teacher: '곽상미',
    day: '월',
    time: '10~11교시',
    quarter: 3,
    program: '객체지향 프로그래밍실'
  },
  {
    id: '7',
    grade: 1,
    subject: '파이썬을 이용한 문제해결',
    teacher: '곽상미',
    day: '월',
    time: '10~11교시',
    quarter: 3,
    program: '객체지향 프로그래밍실'
  },
  {
    id: '8',
    grade: 1,
    subject: '파이썬을 이용한 문제해결',
    teacher: '곽상미',
    day: '월',
    time: '10~11교시',
    quarter: 3,
    program: '객체지향 프로그래밍실'
  },
  {
    id: '9',
    grade: 1,
    subject: '파이썬을 이용한 문제해결',
    teacher: '곽상미',
    day: '월',
    time: '10~11교시',
    quarter: 3,
    program: '객체지향 프로그래밍실'
  },
  {
    id: '10',
    grade: 1,
    subject: '파이썬을 이용한 문제해결',
    teacher: '곽상미',
    day: '월',
    time: '10~11교시',
    quarter: 3,
    program: '객체지향 프로그래밍실'
  },
  {
    id: '11',
    grade: 2,
    subject: '데이터 사이언스 기초',
    teacher: '곽상미',
    day: '월',
    time: '8~9교시',
    quarter: 3,
    program: '데이터 분석 입문'
  },
  {
    id: '12',
    grade: 2,
    subject: '웹 개발 프로젝트',
    teacher: '곽상미',
    day: '월',
    time: '8~9교시',
    quarter: 3,
    program: '프론트엔드 개발'
  },
  {
    id: '13',
    grade: 2,
    subject: 'AI 머신러닝',
    teacher: '곽상미',
    day: '월',
    time: '10~11교시',
    quarter: 3,
    program: '인공지능 기초'
  },
  {
    id: '14',
    grade: 3,
    subject: '알고리즘 심화',
    teacher: '정유진',
    day: '월',
    time: '8~9교시',
    quarter: 3,
    program: '코딩테스트 대비'
  },
  {
    id: '15',
    grade: 3,
    subject: '모바일 앱 개발',
    teacher: '곽상미',
    day: '월',
    time: '8~9교시',
    quarter: 3,
    program: '안드로이드 개발'
  },
  {
    id: '16',
    grade: 3,
    subject: '클라우드 컴퓨팅',
    teacher: '곽상미',
    day: '월',
    time: '10~11교시',
    quarter: 3,
    program: 'AWS 실습'
  }
];
