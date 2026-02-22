export const SUPERVISION_TYPE_LABELS = {
  self_study: '자습 감독',
  leave_seat: '이석 감독',
  seventh_period: '7교시 감독',
} as const;

export const SUPERVISION_TYPE_OPTIONS = [
  SUPERVISION_TYPE_LABELS.self_study,
  SUPERVISION_TYPE_LABELS.leave_seat,
  SUPERVISION_TYPE_LABELS.seventh_period,
];

export const SUPERVISION_TYPE_VALUES = ['self_study', 'leave_seat', 'seventh_period'] as const;

export type AdminSupervisionType = typeof SUPERVISION_TYPE_VALUES[number];

export const SUPERVISION_LABEL_TO_TYPE: Record<string, AdminSupervisionType> = {
  [SUPERVISION_TYPE_LABELS.self_study]: 'self_study',
  [SUPERVISION_TYPE_LABELS.leave_seat]: 'leave_seat',
  [SUPERVISION_TYPE_LABELS.seventh_period]: 'seventh_period',
};

export const SUPERVISION_TYPE_STYLES: Record<AdminSupervisionType, { bgColor: string; textColor: string }> = {
  self_study: { bgColor: '#0085FF0D', textColor: '#0085FF' },
  leave_seat: { bgColor: '#D8CCFF', textColor: '#7D55FF' },
  seventh_period: { bgColor: '#E8F7EA', textColor: '#1D9B49' },
};

export const SUPERVISION_EDITOR_WIDTH = 240;
export const SUPERVISION_EDITOR_HEIGHT = 220;
