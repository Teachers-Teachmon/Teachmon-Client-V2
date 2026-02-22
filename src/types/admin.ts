export interface AfterSchoolTeacher {
  id: number;
  name: string;
}

export interface BusinessTripSchedule {
  day: string;
  startPeriod: number;
  endPeriod: number;
}

export interface MakeupSchedule {
  day: string;
  startPeriod: number;
  endPeriod: number;
}

export interface SupervisionTeacher {
  id: number;
  name: string;
}

export interface SupervisionCount {
  rank: number;
  name: string;
  selfStudy: number;
  leaveSeat: number;
  seventhPeriod: number;
  total: number;
}

export interface SupervisionEvent {
  id: string;
  date: Date;
  teacherId: number;
  teacherName: string;
  type: 'self-study' | 'leave-seat';
}
