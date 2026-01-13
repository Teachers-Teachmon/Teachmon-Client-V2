import type { StatusType } from '@/components/ui/status';

export interface RecordData {
    id: string;
    period: string;
    teacher: string;
    location: string;
    count: string;
    students: string[];
    reason?: string;
}

export interface LeaveData {
    id: string;
    studentInfo: string;
    time: string;
    handlingTeacher: string;
}

export interface StudentData {
    id: string;
    studentInfo: string;
    period5?: StatusType;
    period6?: StatusType;
    period7?: StatusType;
    period89?: StatusType;
    period1011?: StatusType;
}
