export interface MenuCardItem {
  id: number;
  title: string;
  description: string;
  mobileTitle?: string;
  mobileDescription?: string;
  icon: string;
  url: string;
}

export const MENU_CARDS: MenuCardItem[] = [
  {
    id: 1,
    title: '방과후',
    description: '방과후 시간표 설정하기',
    mobileTitle: '방과후',
    mobileDescription: '시간표 설정',
    icon: '/icons/admin/afterSchool.svg',
    url: '/admin/after-school',
  },
  {
    id: 2,
    title: '보강 및 출장',
    description: '보강 및 출장 관리하기',
    mobileTitle: '보강출장',
    mobileDescription: '관리하기',
    icon: '/icons/admin/reinforcement.svg',
    url: '/admin/business-trip',
  },
  {
    id: 3,
    title: '자습감독일정',
    description: '자습감독일정 설정하기',
    mobileTitle: '자습감독',
    mobileDescription: '일정 설정',
    icon: '/icons/admin/blank-calendar.svg',
    url: '/admin/supervision',
  },
  {
    id: 4,
    title: '사용자 관리',
    description: '학생, 선생님 관리하기',
    mobileTitle: '사용자',
    mobileDescription: '관리하기',
    icon: '/icons/admin/users.svg',
    url: '/admin/users',
  },
  {
    id: 5,
    title: '자습 시간',
    description: '선생님들을 관리하기',
    mobileTitle: '자습시간',
    mobileDescription: '관리하기',
    icon: '/icons/admin/selfStudy.svg',
    url: '/admin/self-study',
  },
  {
    id: 6,
    title: '고정 이석',
    description: '고정 이석 설정하기',
    mobileTitle: '고정이석',
    mobileDescription: '설정하기',
    icon: '/icons/admin/fixMovement.svg',
    url: '/admin/fixed-movement',
  },
];
