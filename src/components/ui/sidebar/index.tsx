import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { SIDEBAR_MENU_ITEMS, SIDEBAR_ICONS, LOGO, MINI_LOGO } from '@/constants/sidebar'
import type { MenuItemType } from '@/constants/sidebar'
import { useLogoutMutation } from '@/services/auth/auth.mutation'
import { useUserStore } from '@/stores/useUserStore'
import * as S from './style'

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { mutate: logoutMutate } = useLogoutMutation()
  const user = useUserStore((state) => state.user)

  const getActiveMenu = (): MenuItemType => {
    const currentPath = location.pathname
    const menuItem = SIDEBAR_MENU_ITEMS.find(item =>
      currentPath === item.path || currentPath.startsWith(`${item.path}/`)
    )
    return menuItem?.id || 'home'
  }

  const handleMenuClick = (path: string) => {
    navigate(path)
    setIsProfileOpen(false)
  }

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleLogout = () => {
    logoutMutate()
  }

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  const handleProfileClose = () => {
    setIsProfileOpen(false)
  }

  const activeMenu = getActiveMenu()

  return (
    <>
      {isProfileOpen && <S.MobileOverlay onClick={handleProfileClose} />}
      {isProfileOpen && (
        <S.MobileSheet>
          <S.MobilePopoverPointer />
          <S.MobileSheetHeader>
            <S.ProfileAvatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher" alt="프로필" />
            <S.MobileProfileName>{userName}</S.MobileProfileName>
          </S.MobileSheetHeader>
          <S.MobileLogoutButton onClick={handleLogout}>로그아웃</S.MobileLogoutButton>
        </S.MobileSheet>
      )}

      <S.SidebarContainer collapsed={isCollapsed}>
        <S.CollapseButton onClick={handleToggleCollapse}>
          <S.CollapseIcon src={SIDEBAR_ICONS.collapse} alt="접기" collapsed={isCollapsed} />
        </S.CollapseButton>
        <S.LogoSection collapsed={isCollapsed}>
          {!isCollapsed && <S.LogoImage src={LOGO} alt="TeachMon" />}
          {isCollapsed && <S.LogoImageSmall src={MINI_LOGO} alt="TeachMon" />}
        </S.LogoSection>

        <S.MenuSection collapsed={isCollapsed}>
          {SIDEBAR_MENU_ITEMS.map((item) => {
            const isActive = activeMenu === item.id
            return (
              <S.MenuItemButton
                key={item.id}
                active={isActive}
                collapsed={isCollapsed}
                onClick={() => handleMenuClick(item.path)}
              >
                <S.MenuIcon src={isActive ? item.activeIcon : item.icon} alt={item.label} />
                <S.MenuLabel active={isActive} collapsed={isCollapsed}>
                  {item.label}
                </S.MenuLabel>
              </S.MenuItemButton>
            )
          })}
        </S.MenuSection>

<<<<<<< HEAD
        <S.MobileActions>
          <S.MobileProfileButton onClick={handleProfileToggle} aria-label="프로필 메뉴">
            <S.ProfileAvatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher" alt="프로필" />
          </S.MobileProfileButton>
        </S.MobileActions>

        <S.FooterSection collapsed={isCollapsed}>
          <S.ProfileAvatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher" alt="프로필" />
          <S.ProfileInfo collapsed={isCollapsed}>
            <S.ProfileName>{userName}</S.ProfileName>
            <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
          </S.ProfileInfo>
        </S.FooterSection>
      </S.SidebarContainer>
    </>
=======
      <S.FooterSection collapsed={isCollapsed}>
        <S.ProfileAvatar 
          src={user?.profileImage || "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher"} 
          alt="프로필" 
        />
        <S.ProfileInfo collapsed={isCollapsed}>
          <S.ProfileName>{user?.name || '선생님'}</S.ProfileName>
          <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
        </S.ProfileInfo>
      </S.FooterSection>
    </S.SidebarContainer>
>>>>>>> 888f11d (feat/TC-29 :: 인증/인가 프론트 api 제작)
  )
}
