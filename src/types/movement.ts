import type { Period } from '@/constants/movement';

export interface LeaveSeatStudent {
  id: number;
  number: number;
  name: string;
  state: string;
}

export interface LeaveSeat {
  leaveseat_id: string;
  period: Period;
  teacher: string;
  place: string;
  personnel: number;
  students: string[];
}

export interface LeaveSeatDetail {
  day: string;
  period: Period;
  teacher: string;
  place: {
    id: number;
    name: string;
  };
  personnel: number;
  cause: string;
  students: LeaveSeatStudent[];
}

export interface GetLeaveSeatListParams {
  day: string;
  period: Period;
}

export interface CreateLeaveSeatRequest {
  day: string;
  period: Period;
  place_id: number;
  cause: string;
  students: number[];
}

export interface UpdateLeaveSeatRequest {
  day: string;
  period: Period;
  place: number;
  cause: string;
  students: number[];
}

export interface MessageResponse {
  message: string;
}
