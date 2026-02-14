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

// Period 옵션
export const PERIOD_OPTIONS: { label: string; value: Period }[] = [
  { label: '8~9교시', value: 'EIGHT_AND_NINE_PERIOD' },
  { label: '10~11교시', value: 'TEN_AND_ELEVEN_PERIOD' },
  { label: '8~11교시', value: 'EIGHT_TO_ELEVEN_PERIOD' },
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