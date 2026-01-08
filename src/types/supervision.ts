export interface SupervisionTeacher {
  id: number;
  name: string;
}

export interface SupervisionInfo {
  id: number;
  teacher: SupervisionTeacher;
}

export interface SupervisionDay {
  day: string;
  self_study_supervision: SupervisionInfo | null;
  leave_seat_supervision: SupervisionInfo | null;
}
