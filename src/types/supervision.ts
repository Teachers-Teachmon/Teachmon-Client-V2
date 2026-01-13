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