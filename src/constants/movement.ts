// Period (교시)
export type Period = 
  | 'EIGHT_AND_NINE_PERIOD'
  | 'EIGHT_PERIOD'
  | 'NINE_PERIOD'
  | 'TEN_PERIOD'
  | 'ELEVEN_PERIOD';

// Reason (사유/상태)
export type Reason = 
  | 'MOVEMENT'
  | 'DEPARTURE'
  | 'AFTER_SCHOOL'
  | 'SELF_STUDY';

// Period 옵션
export const PERIOD_OPTIONS: { label: string; value: Period }[] = [
  { label: '8~9교시', value: 'EIGHT_AND_NINE_PERIOD' },
  { label: '8교시', value: 'EIGHT_PERIOD' },
  { label: '9교시', value: 'NINE_PERIOD' },
  { label: '10교시', value: 'TEN_PERIOD' },
  { label: '11교시', value: 'ELEVEN_PERIOD' },
];

// Reason 옵션
export const REASON_OPTIONS: { label: string; value: Reason }[] = [
  { label: '이동', value: 'MOVEMENT' },
  { label: '이탈', value: 'DEPARTURE' },
  { label: '방과후', value: 'AFTER_SCHOOL' },
  { label: '자습', value: 'SELF_STUDY' },
];
