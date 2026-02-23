// 사용자 역할 타입
export type UserRole = '관리자' | '일반' | '뷰어';
export type UserRoleAPI = 'ADMIN' | 'TEACHER' | 'VIEWER';

// 선생님 타입 (UI용)
export interface Teacher {
  id: string;
  teacher_id?: string; // API에서 받은 원본 ID
  role: UserRole;
  name: string;
  email: string;
  supervisionCount: number;
  forbiddenDates?: string[];
}

// 선생님 타입 (API용)
export interface TeacherAPI {
  teacher_id: string;
  role: UserRoleAPI;
  name: string;
  email: string;
  supervision_count: number;
}

export interface AfterSchoolTeacher {
  id: number;
  name: string;
}

export interface BusinessTripSchedule {
  day: string;
  startPeriod: number;
  endPeriod: number;
}

export interface MakeupSchedule {
  day: string;
  startPeriod: number;
  endPeriod: number;
}

export interface SupervisionTeacher {
  id: number;
  name: string;
}

export interface SupervisionCount {
  rank: number;
  name: string;
  selfStudy: number;
  leaveSeat: number;
  seventhPeriod: number;
  total: number;
}

export interface SupervisionEvent {
  id: string;
  date: Date;
  teacherId: number;
  teacherName: string;
  type: 'self-study' | 'leave-seat';
}
