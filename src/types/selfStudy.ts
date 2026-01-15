export type Grade = 1 | 2 | 3 | 'all';

export interface SelfStudySchedule {
  id: string;
  date: Date;
  grade: Grade;
  periods: string[];
  startDate: Date;
  endDate: Date;
}

export interface SelfStudyScheduleGroup {
  date: Date;
  schedules: SelfStudySchedule[];
}

