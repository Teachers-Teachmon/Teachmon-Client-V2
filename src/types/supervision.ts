export type ExchangeStatus = 'PENDING' | 'REJECTED' | 'ACCEPTED' | 'CHECKED';

export type SupervisionType = 'self_study' | 'leave_seat';
export type SupervisionTodayType = 'NONE' | 'SELF_STUDY' | 'LEAVE_SEAT' | 'ALL';

export interface SupervisionTeacher {
  id: number;
  name: string;
}

export interface Supervision {
  id: number;
  teacher: SupervisionTeacher;
}

export interface SupervisionDay {
  day: string;
  self_study_supervision: Supervision | null;
  leave_seat_supervision: Supervision | null;
}

export interface SupervisionRank {
  rank: number;
  name: string;
  self_study_supervision_count: number;
  leave_seat_supervision_count: number;
  total_supervision_count: number;
}

export interface Teacher {
  id: number;
  name: string;
}

export interface ExchangeParty {
  teacher: Teacher;
  day: string;
  type: SupervisionType;
}

export interface ExchangeRequest {
  id: number | string;
  requestor: ExchangeParty;
  responser: ExchangeParty;
  status: ExchangeStatus;
  reason?: string;
}

export type PeriodType =
  | 'ONE_PERIOD'
  | 'TWO_PERIOD'
  | 'THREE_PERIOD'
  | 'FOUR_PERIOD'
  | 'FIVE_PERIOD'
  | 'SIX_PERIOD'
  | 'SEVEN_PERIOD'
  | 'EIGHT_PERIOD'
  | 'NINE_PERIOD'
  | 'TEN_PERIOD'
  | 'EIGHT_AND_NINE_PERIOD'
  | 'TEN_AND_ELEVEN_PERIOD';

export interface ExitStudent {
  exit_id: number;
  day: string;
  teacher: string;
  number: number;
  name: string;
  period: PeriodType;
}

export interface ExchangeDetailContentProps {
  exchange: ExchangeRequest;
  currentTeacherId: number;
  onClose: () => void;
  onAccept?: () => void;
  onReject?: () => void;
  onReasonChange?: (value: string) => void;
  onSubmit?: () => void;
}
