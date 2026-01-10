import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { SIDEBAR_MENU_ITEMS, SIDEBAR_ICONS, LOGO, MINI_LOGO } from '@/constants/sidebar'
import type { MenuItemType } from '@/constants/sidebar'
import * as S from './style'

const userName = '이혜정 선생님'

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const getActiveMenu = (): MenuItemType => {
    const currentPath = location.pathname
    const menuItem = SIDEBAR_MENU_ITEMS.find(item => item.path === currentPath)
    return menuItem?.id || 'home'
  }

  const handleMenuClick = (path: string) => {
    navigate(path)
  }

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleLogout = () => {
    console.log('로그아웃')
  }

  const activeMenu = getActiveMenu()

  return (
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

      <S.FooterSection collapsed={isCollapsed}>
        <S.ProfileAvatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher" alt="프로필" />
        <S.ProfileInfo collapsed={isCollapsed}>
          <S.ProfileName>{userName}</S.ProfileName>
          <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
        </S.ProfileInfo>
      </S.FooterSection>
    </S.SidebarContainer>
  )
}