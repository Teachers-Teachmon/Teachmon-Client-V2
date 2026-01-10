import type { CardData } from '@/types/landing';

export const LANDING_CARDS: Omit<CardData, 'onClick'>[] = [
  {
    icon: '/icons/landing/small-logo.svg',
    title: 'TeachMon소개',
    description: 'TeachMon이 무엇인지 소개해드릴게요!',
  },
  {
    icon: '/icons/landing/role.svg',
    title: '역할',
    description: 'TeachMon에는 2가지의 \n역할이 있어요. 어떤게 있는지 알아보아요',
  },
  {
    icon: '/icons/landing/skill.svg',
    title: '기능소개',
    description: 'TeachMon에있는 주요기능에 대해서 소개해드릴게요!',
  },
  {
    icon: '/icons/landing/method.svg',
    title: '사용방법',
    description: 'TeachMon의 기능들을 어떻게\n사용하는지 알려드릴게요!',
  },
];

export const LANDING_CARD_ANCHORS = ['introduce', 'role', 'skill', 'method'] as const;

export const ROLE_SLIDES: import('@/types/landing').RoleSlide[] = [
  {
    title: '관리 선생님',
    description:
      '관리 선생님은 TeachMon을 통해 자습감독 일정을 자동으로 생성할 수 있고, 방과후를 등록하고 관리할 수 있습니다.',
    image: '/assets/role-admin.svg',
  },
  {
    title: '자습감독 선생님',
    description:
      '도면과 보기쉬운 UI를 통해 자습감독 선생님들은 더욱 편리하게 자습감독을 하실 수 있습니다.',
    image: '/assets/role-teacher.svg',
  },
];

export const SKILL_FEATURES: import('@/types/landing').SkillFeature[] = [
  {
    title: '자습관리',
    description:
      'AI를 활용하여 선생님들의 일정과 학교 일정을 반영한 자습 감독 자동 배정 기능입니다.\n필요한 경우, 자습 감독 관리 선생님께서 수동으로 수정할 수도 있습니다.',
    images: [
      { src: '/assets/manage.svg', position: 'left' },
      { src: '/assets/record.svg', position: 'right' },
    ],
  },
  {
    title: '자습감독 자동배정',
    description:
      'AI를 활용하여 선생님들의 일정과 학교 일정을 반영한 자습 감독 자동 배정 기능입니다.\n필요한 경우, 자습 감독 관리 선생님께서 수동으로 수정할 수도 있습니다.',
    images: [
      { src: '/assets/supervisionSchedule.svg', position: 'left' },
      { src: '/assets/createSupervisionSchedule.svg', position: 'right' },
    ],
  },
  {
    title: '학생이석 관리',
    description:
      '학생들의 이석 현황을 실시간으로 확인하고 관리할 수 있는 기능입니다.\n자습 감독 선생님께서 편리하게 학생 상태를 확인하고 기록할 수 있습니다.',
    images: [
      { src: '/assets/writeMovement.svg', position: 'left' },
      { src: '/assets/recordMovement.svg', position: 'right' },
    ],
  },
];
