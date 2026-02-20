import { colors } from '@/styles/theme';

// 상태 타입
export const STATUS_TYPES = {
  AFTER_SCHOOL: '방과후',
  AFTER_SCHOOL_REINFORCEMENT: '방과후 보강',
  SELF_STUDY: '자습',
  LEAVE_SEAT: '이석',
  EARLY_LEAVE: '조퇴',
  ABSENT: '결석',
  DROPOUT: '이탈',
  CANCEL: '취소',
  ADMIN: '관리자',
  NORMAL: '일반',
} as const;

export type StatusType = typeof STATUS_TYPES[keyof typeof STATUS_TYPES];

// 상태별 스타일 설정
export const STATUS_CONFIG: Record<StatusType, {
  background: string;
  dotColor: string;
  textColor: string;
}> = {
  [STATUS_TYPES.AFTER_SCHOOL]: {
    background: '#FFFFFF', // 흰색
    dotColor: colors.primary,
    textColor: colors.primary,
  },
  [STATUS_TYPES.AFTER_SCHOOL_REINFORCEMENT]: {
    background: '#FFFFFF', // 흰색
    dotColor: colors.primary,
    textColor: colors.primary,
  },
  [STATUS_TYPES.SELF_STUDY]: {
    background: '#84FFC7', // 더 진한 초록색 (기존: #ECFDF3)
    dotColor: '#14BA6D',
    textColor: '#037847',
  },
  [STATUS_TYPES.LEAVE_SEAT]: {
    background: '#CCBCFF', // 연한 보라색
    dotColor: '#6A1EC1',
    textColor: '#6A1EC1',
  },
  [STATUS_TYPES.EARLY_LEAVE]: {
    background: '#FFD699', // 더 진한 주황색 (기존: #FFF6E4)
    dotColor: '#FF9000',
    textColor: '#FF9000',
  },
  [STATUS_TYPES.ABSENT]: {
    background: '#FFBAA8', // 더 진한 연한 빨강 (기존: #FDF0EC)
    dotColor: colors.subcolor,
    textColor: colors.subcolor,
  },
  [STATUS_TYPES.DROPOUT]: {
    background: '#F87067', // 더 진한 빨간색 (기존: #FFEBEA)
    dotColor: colors.exit,
    textColor: colors.exit,
  },
  [STATUS_TYPES.CANCEL]: {
    background: '#D1D5DB', // 더 진한 회색 (기존: #F5F5F5)
    dotColor: '#9CA4BA',
    textColor: '#9CA4BA',
  },
  [STATUS_TYPES.ADMIN]: {
    background: '#FFBAA8', // 더 진한 연한 빨강 (기존: #FFF2F1)
    dotColor: colors.subcolor,
    textColor: colors.subcolor,
  },
  [STATUS_TYPES.NORMAL]: {
    background: '#FFFFFF', // 흰색
    dotColor: colors.primary,
    textColor: colors.primary,
  },
};
