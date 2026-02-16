// Enums
export type StudentState = 
  | 'LEAVE_SEAT'
  | 'AFTER_SCHOOL'
  | 'SELF_STUDY'
  | 'ADDITIONAL_SELF_STUDY'
  | 'EARLY_LEAVE'
  | 'EVASION'
  | 'AWAY'
  | 'EXIT';

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

// Types
export interface StudentSchedule {
  student_id: number;
  number: number;
  name: string;
  state: StudentState | null;
  schedule_id: string;
}

export interface ClassSchedule {
  class: number;
  students: StudentSchedule[];
}

export interface GetStudentScheduleParams {
  grade: number;
  period: Period;
  day?: string;
}

export interface UpdateStudentScheduleRequest {
  schedule_id: string;
  state: StudentState;
}

export interface PlaceSchedule {
  place_id: number;
  place_name: string;
  students: StudentSchedule[];
}

export interface GetPlacesByFloorParams {
  floor: number;
  day?: string;
  period?: Period;
}

export interface PlaceStatus {
  place_id: number;
  place_name: string;
  state: StudentState;
}

export interface EvasionRecord {
  exit_id: number;
  day: string;
  teacher: string;
  number: number;
  name: string;
  period: Period;
}

export interface MessageResponse {
  message: string;
}

export interface FloorStatus {
  floor: number;
  count: number;
}

export interface GetAllFloorsStatusParams {
  day?: string;
  period?: Period;
}

export interface GetScheduleHistoryParams {
  day?: string;
  query?: string;
}

export interface PeriodScheduleInfo {
  schedule_id: string;
  state: StudentState | null;
}

export interface ScheduleHistoryRecord {
  student_number: number;
  name: string;
  ONE_PERIOD: PeriodScheduleInfo | null;
  TWO_PERIOD: PeriodScheduleInfo | null;
  THREE_PERIOD: PeriodScheduleInfo | null;
  FOUR_PERIOD: PeriodScheduleInfo | null;
  FIVE_PERIOD: PeriodScheduleInfo | null;
  SIX_PERIOD: PeriodScheduleInfo | null;
  SEVEN_PERIOD: PeriodScheduleInfo | null;
  EIGHT_AND_NINE_PERIOD: PeriodScheduleInfo | null;
  TEN_AND_ELEVEN_PERIOD: PeriodScheduleInfo | null;
}

export interface ExitHistoryResponse {
  exit_id: number;
  day: string;
  teacher: string;
  number: number;
  name: string;
  period: Period;
}
