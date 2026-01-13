export interface Student {
  studentNumber: number;
  name: string;
}

export interface FixedMovement {
  id: string;
  day: string;
  period: string;
  location: string;
  reason: string;
  students: Student[];
}
