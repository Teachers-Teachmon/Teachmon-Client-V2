// 공통 타입 정의

// ============================================
// 교환/감독 관련 공통 타입
// ============================================

export type ExchangeStatus = 'PENDING' | 'REJECTED' | 'ACCEPTED' | 'CHECKED';

export type SupervisionType = 'self_study' | 'leave_seat' | 'makeup';

// ============================================
// 교시 관련 공통 타입
// ============================================

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

// ============================================
// 공통 엔티티 타입
// ============================================

export interface Teacher {
  id: number;
  name: string;
}

export interface Student {
  id?: number;
  number: number;
  name: string;
}

export interface Place {
  id: number | string;
  name: string;
}

// ============================================
// 교환 요청 관련 공통 타입
// ============================================

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
