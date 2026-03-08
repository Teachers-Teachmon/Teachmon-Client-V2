export interface StudentSearchResponse {
  id: string;
  grade: number;
  classNumber: number;
  number: number;
  name: string;
}

export interface PlaceSearchResponse {
  id: number;
  name: string;
  floor: number;
}

export interface TeacherSearchResponse {
  id: number;
  name: string;
}

export interface TeamSearchResponse {
  id: string;
  name: string;
  members: {
    id: string;
    number: number;
    name: string;
    grade: number;
    classNumber: number;
  }[];
}