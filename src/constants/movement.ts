import { ADMIN_AFTER_SCHOOL_PERIODS } from './common';

// Period (교시)
export type Period = 
  | 'EIGHT_AND_NINE_PERIOD'
  | 'TEN_AND_ELEVEN_PERIOD'
  | 'EIGHT_TO_ELEVEN_PERIOD';

// Reason (사유/상태)
export type Reason = 
  | 'MOVEMENT'
  | 'DEPARTURE'
  | 'AFTER_SCHOOL'
  | 'SELF_STUDY';

// Period 옵션 - common에서 가져온 값 사용
export const PERIOD_OPTIONS: { label: string; value: Period }[] = [
  { label: ADMIN_AFTER_SCHOOL_PERIODS[0], value: 'EIGHT_AND_NINE_PERIOD' },
  { label: ADMIN_AFTER_SCHOOL_PERIODS[1], value: 'TEN_AND_ELEVEN_PERIOD' },
  { label: ADMIN_AFTER_SCHOOL_PERIODS[2], value: 'EIGHT_TO_ELEVEN_PERIOD' },
];

// Reason 옵션
export const REASON_OPTIONS: { label: string; value: Reason }[] = [
  { label: '이동', value: 'MOVEMENT' },
  { label: '이탈', value: 'DEPARTURE' },
  { label: '방과후', value: 'AFTER_SCHOOL' },
  { label: '자습', value: 'SELF_STUDY' },
];

export interface MovementFormData {
    day: string;
    period: Period;
    cause: string;
    students: number[];
    studentDetails?: Array<{ id: number; display: string }>;
}