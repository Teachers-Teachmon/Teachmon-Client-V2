export type Grade = 1 | 2 | 3 | 'all';

export interface SelfStudyQuarterlyItem {
  week_day: SelfStudyWeekDay;
  periods: SelfStudyPeriod[];
}

export type SelfStudyWeekDay = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';

export type SelfStudyPeriod =
  | 'ONE_PERIOD'
  | 'TWO_PERIOD'
  | 'THREE_PERIOD'
  | 'FOUR_PERIOD'
  | 'FIVE_PERIOD'
  | 'SIX_PERIOD'
  | 'SEVEN_PERIOD'
  | 'EIGHT_AND_NINE_PERIOD'
  | 'TEN_AND_ELEVEN_PERIOD';

export interface SelfStudySchedule {
  id: string;
  date: Date;
  grade: Grade;
  periods: string[];
  periodIds: Record<string, number>;
  startDate: Date;
  endDate: Date;
}

export interface SelfStudyScheduleGroup {
  date: Date;
  schedules: SelfStudySchedule[];
}

export interface DetailModalProps {
  isOpen: boolean;
  schedule: SelfStudySchedule | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}

// === 자습 추가 API 요청/응답 ===

export interface AdditionalSelfStudyPeriodResponse {
  id: number;
  period: SelfStudyPeriod;
}

export interface AdditionalSelfStudyResponse {
  day: string;
  grade: number;
  periods: AdditionalSelfStudyPeriodResponse[];
}

export interface CreateAdditionalSelfStudyRequest {
  day: string;
  grade: number;
  periods: SelfStudyPeriod[];
}

