export interface MenuCardItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  url: string;
}

export const MENU_CARDS: MenuCardItem[] = [
  {
    id: 1,
    title: '방과후',
    description: '시간표 설정',
    icon: '/icons/admin/afterSchool.svg',
    url: '/admin/after-school',
  },
  {
    id: 2,
    title: '보강출장',
    description: '관리하기',
    icon: '/icons/admin/reinforcement.svg',
    url: '/admin/business-trip',
  },
  {
    id: 3,
    title: '자습감독',
    description: '일정 설정',
    icon: '/icons/admin/blank-calendar.svg',
    url: '/admin/supervision',
  },
  {
    id: 4,
    title: '사용자',
    description: '관리하기',
    icon: '/icons/admin/users.svg',
    url: '/admin/users',
  },
  {
    id: 5,
    title: '자습시간',
    description: '관리하기',
    icon: '/icons/admin/selfStudy.svg',
    url: '/admin/self-study',
  },
  {
    id: 6,
    title: '고정이석',
    description: '설정하기',
    icon: '/icons/admin/fixMovement.svg',
    url: '/admin/fixed-movement',
  },
];
