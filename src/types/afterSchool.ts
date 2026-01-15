export interface AffordableReinforcement {
    day: string;
    start_period: number;
    end_period: number;
}

export interface AdminAfterSchoolClass {
    id: string;
    grade: 1 | 2 | 3;
    day: string;
    period: string;
    teacher: string;
    location: string;
    subject: string;
    students: string[];
}