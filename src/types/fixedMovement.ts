export interface Student {
  studentNumber: number;
  name: string;
}

export interface FixedMovement {
  id: string;
  day: string;
  period: string;
  location: string;
  personnel: number;
  students: Student[];
}

export interface Team {
  id: string;
  name: string;
  students: Student[];
}
export type Weekday = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export type Period =
  | 'ONE_PERIOD'
  | 'TWO_PERIOD'
  | 'THREE_PERIOD'
  | 'FOUR_PERIOD'
  | 'FIVE_PERIOD'
  | 'SIX_PERIOD'
  | 'SEVEN_PERIOD'
  | 'EIGHT_AND_NINE_PERIOD'
  | 'TEN_AND_ELEVEN_PERIOD';

export interface FixedMovementStudentResponse {
  number: number;
  name: string;
}

export interface FixedMovementResponse {
  static_leaveseat_id: number;
  weekday: Weekday;
  period: Period;
  place: string;
  personnel: number;
  students: FixedMovementStudentResponse[];
}

// === 고정 이석 작성 요청/응답 ===

export interface CreateFixedMovementRequest {
  week_day: Weekday;
  period: Period;
  place_id: number;
  cause: string;
  students: number[];
}

export interface CreateFixedMovementResponse {
  message: string;
}

// === 검색 API 응답 ===

export interface StudentSearchResponse {
  id: number;
  grade: number;
  class: number;
  number: number;
  name: string;
}

export interface PlaceSearchResponse {
  id: number;
  name: string;
  floor: number;
}

export interface TeamSearchResponse {
  id: number;
  name: string;
}
