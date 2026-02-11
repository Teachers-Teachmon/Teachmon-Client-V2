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
