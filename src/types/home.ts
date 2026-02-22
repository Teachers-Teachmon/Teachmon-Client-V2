// Home 페이지 관련 타입
// 공통 타입은 common.ts에서 import

export {
  type ExchangeStatus,
  type SupervisionType,
  type Teacher,
  type ExchangeParty,
  type ExchangeRequest,
  type ExitStudent,
  type ExchangeDetailContentProps,
} from './common';

// Home 페이지 전용 PeriodType (7~11교시만)
export type PeriodType =
  | 'SEVEN_PERIOD'
  | 'EIGHT_PERIOD'
  | 'EIGHT_AND_NINE_PERIOD'
  | 'NINE_PERIOD'
  | 'TEN_PERIOD'
  | 'TEN_AND_ELEVEN_PERIOD';


