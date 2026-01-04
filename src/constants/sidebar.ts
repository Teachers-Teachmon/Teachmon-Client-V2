export type MenuItemType = 'home' | 'supervision' | 'manage' | 'afterSchool' | 'admin'

export interface SidebarMenuItem {
  id: MenuItemType
  label: string
  icon: string
  activeIcon: string
  path: string
}

export const SIDEBAR_ICONS = {
  home: '/icons/Home.svg',
  homeActive: '/icons/HomeActive.svg',
  supervision: '/icons/Supervision.svg',
  supervisionActive: '/icons/SupervisionActive.svg',
  manage: '/icons/LeaveSeat.svg',
  manageActive: '/icons/LeaveSeatActive.svg',
  afterSchool: '/icons/AfterSchool.svg',
  afterSchoolActive: '/icons/AfterSchoolActive.svg',
  admin: '/icons/Admin.svg',
  adminActive: '/icons/AdminActive.svg',
  collapse: '/icons/Collapse.svg',
} as const

export const LOGO = '/assets/logo.svg'
export const MINI_LOGO = '/assets/MiniLogo.svg'

export const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  { id: 'home', label: '홈', icon: SIDEBAR_ICONS.home, activeIcon: SIDEBAR_ICONS.homeActive, path: '/' },
  { id: 'supervision', label: '자습감독', icon: SIDEBAR_ICONS.supervision, activeIcon: SIDEBAR_ICONS.supervisionActive, path: '/supervision' },
  { id: 'manage', label: '학생관리', icon: SIDEBAR_ICONS.manage, activeIcon: SIDEBAR_ICONS.manageActive, path: '/manage' },
  { id: 'afterSchool', label: '방과후', icon: SIDEBAR_ICONS.afterSchool, activeIcon: SIDEBAR_ICONS.afterSchoolActive, path: '/after-school' },
  { id: 'admin', label: '관리자', icon: SIDEBAR_ICONS.admin, activeIcon: SIDEBAR_ICONS.adminActive, path: '/admin' },
]
