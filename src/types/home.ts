export type ExchangeStatus = 'PENDING' | 'REJECTED' | 'ACCEPTED';

export type SupervisionType = 'self_study' | 'leave_seat';

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
  id: number;
  requestor: ExchangeParty;
  responser: ExchangeParty;
  status: ExchangeStatus;
  reason?: string;
}

export type PeriodType =
  | 'SEVEN_PERIOD'
  | 'EIGHT_PERIOD'
  | 'NINE_PERIOD'
  | 'TEN_PERIOD';

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

