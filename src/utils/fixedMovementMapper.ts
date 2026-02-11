import type {
  FixedMovementResponse,
  FixedMovement,
} from '@/types/fixedMovement';
import { WEEKDAY_API_TO_KEY, PERIOD_LABEL } from '@/constants/fixedMovement';

export function toFixedMovement(res: FixedMovementResponse): FixedMovement {
  return {
    id: String(res.static_leaveseat_id),
    day: WEEKDAY_API_TO_KEY[res.weekday] ?? 'mon',
    period: PERIOD_LABEL[res.period] ?? res.period,
    location: res.place,
    personnel: res.personnel,
    students: res.students.map((s) => ({
      studentNumber: s.number,
      name: s.name,
    })),
  };
}

export function toFixedMovements(list: FixedMovementResponse[]): FixedMovement[] {
  return list.map(toFixedMovement);
}
