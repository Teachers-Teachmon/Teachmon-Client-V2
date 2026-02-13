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

export interface TableColumn<T> {
  key: string;
  header: string | React.ReactNode;
  width?: string;
  render?: (row: T) => React.ReactNode;
}

export interface Student {
  number: number;
  name: string;
}

export interface Teacher {
  id: number;
  name: string;
}

export interface Place {
  id: number;
  name: string;
}

export interface AfterSchoolResponse {
  id: number;
  week_day: string;
  period: string;
  name: string;
  teacher: Teacher;
  place: Place;
  students: Student[];
}

export interface AfterSchoolRequestParams {
  grade?: number;
  branch?: number;
  week_day?: string;
  start_period?: number;
  end_period?: number;
}

export interface CreateAfterSchoolRequest {
  grade: number;
  week_day: string;
  period: string;
  teacher_id: number;
  place_id: number;
  name: string;
  students_id: number[];
}