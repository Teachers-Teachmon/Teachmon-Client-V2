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
