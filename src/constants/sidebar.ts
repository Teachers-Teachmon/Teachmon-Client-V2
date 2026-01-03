export type MenuItemType = 'home' | 'supervision' | 'manage' | 'afterSchool' | 'admin'

export interface SidebarMenuItem {
  id: MenuItemType
  label: string
  icon: string
  path: string
}

export const SIDEBAR_ICONS = {
  home: '/icons/Home.svg',
  supervision: '/icons/Supervision.svg',
  manage: '/icons/LeaveSeat.svg',
  afterSchool: '/icons/AfterSchool.svg',
  admin: '/icons/Admin.svg',
  collapse: '/icons/Collapse.svg',
} as const

export const LOGO = '/assets/logo.svg'
export const MINI_LOGO = '/assets/MiniLogo.svg'

export const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  { id: 'home', label: '홈', icon: SIDEBAR_ICONS.home, path: '/' },
  { id: 'supervision', label: '자습감독', icon: SIDEBAR_ICONS.supervision, path: '/supervision' },
  { id: 'manage', label: '학생관리', icon: SIDEBAR_ICONS.manage, path: '/manage' },
  { id: 'afterSchool', label: '방과후', icon: SIDEBAR_ICONS.afterSchool, path: '/after-school' },
  { id: 'admin', label: '관리자', icon: SIDEBAR_ICONS.admin, path: '/admin' },
]
