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
