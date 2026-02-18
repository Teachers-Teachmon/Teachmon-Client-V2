import type {
  FixedMovementResponse,
  FixedMovement,
} from '@/types/fixedMovement';
import { WEEKDAY_API_TO_KEY, PERIOD_LABEL } from '@/constants/fixedMovement';

export function toFixedMovement(res: FixedMovementResponse): FixedMovement {
  const placeName = typeof res.place === 'string' ? res.place : res.place.name;
  const weekday = res.weekday ?? res.week_day;

  return {
    id: String(res.static_leaveseat_id ?? ''),
    day: weekday ? (WEEKDAY_API_TO_KEY[weekday] ?? 'mon') : 'mon',
    period: PERIOD_LABEL[res.period] ?? res.period,
    location: placeName,
    personnel: res.personnel ?? res.students.length,
    cause: res.cause,
    students: res.students.map((s) => ({
      studentNumber: s.number,
      name: s.name,
    })),
  };
}

export function toFixedMovements(list: FixedMovementResponse[]): FixedMovement[] {
  return list.map(toFixedMovement);
}
