export interface Student {
  id: number;
  name: string;
  grade: number;
  classNumber: number;
  number: number;
}

export interface Place {
  id: number;
  name: string;
  floor: number;
}

export interface TeamMember {
  id: number;
  number: number;
  name: string;
  grade: number;
  classNumber: number;
}

export interface Team {
  id: number;
  name: string;
  members: TeamMember[];
}
