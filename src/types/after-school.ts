// 공통 Place 타입
export interface Place {
  id: string;
  name: string;
}

// GET /afterschool/me/today 응답
export interface TodayAfterSchool {
  id: string;
  branch: number;
  name: string;
  place: Place;
  grade: number;
  period: string;
  day: string;
}

// GET /afterschool/me?grade= 응답
export interface MyAfterSchool {
  id: string;
  week_day: string;
  period: string;
  name: string;
  place: Place;
  reinforcement_count: number;
}

// GET /afterschool 응답
export interface AllAfterSchool {
  id: string;
  week_day: string;
  period: string;
  name: string;
  teacher: {
    id: string;
    name: string;
  };
  place: Place;
  students: {
    number: number;
    name: string;
  }[];
}

// GET /afterschool 쿼리 파라미터
export interface AfterSchoolSearchParams {
  grade: number;
  branch?: number;
  week_day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';
  start_period: number;
  end_period: number;
}

// 기존 호환용 (다른 곳에서 사용 중일 수 있음)
export interface AfterSchoolClass {
  id: string;
  grade: 1 | 2 | 3;
  subject: string;
  teacher: string;
  day: '월' | '화' | '수' | '목' | '금';
  time: string;
  quarter: 1 | 2 | 3;
  program: string;
}

export interface TodayClass {
  id: string;
  quarter: 1 | 2 | 3;
  subject: string;
  teacher: string;
  program: string;
  date: string;
}

export interface TimeSlot {
  time: string;
  classes: AfterSchoolClass[];
}
