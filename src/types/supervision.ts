// Supervision 페이지 관련 타입
// 공통 타입은 common.ts에서 import

export {
  type ExchangeStatus,
  type SupervisionType,
  type Teacher,
  type ExchangeParty,
  type ExchangeRequest,
  type PeriodType,
  type ExitStudent,
  type ExchangeDetailContentProps,
} from './common';

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
  seventh_period_supervision: Supervision | null;
}

export interface SupervisionRank {
  rank: number;
  name: string;
  self_study_supervision_count: number;
  leave_seat_supervision_count: number;
  total_supervision_count: number;
}
