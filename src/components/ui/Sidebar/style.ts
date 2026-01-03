import styled from '@emotion/styled'
import { colors, radius } from '@/styles/theme'

export const SidebarContainer = styled.aside<{ collapsed: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${({ collapsed }) => (collapsed ? '5rem' : '17.5rem')};
  height: 100vh;
  background-color: ${colors.n01};
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  transition: width 0.3s ease;
  overflow: visible;
`

export const CollapseButton = styled.button`
  position: absolute;
  top: 1.875rem;
  right: -0.875rem;
  width: 1.75rem;
  height: 1.75rem;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CollapseIcon = styled.img<{ collapsed: boolean }>`
  width: 1.75rem;
  height: 1.75rem;
  transform: ${({ collapsed }) => (collapsed ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
`

export const LogoSection = styled.div<{ collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ collapsed }) => (collapsed ? '1rem 0' : '1.5rem')};
  min-height: ${({ collapsed }) => (collapsed ? '4.375rem' : '6.25rem')};
`

export const LogoImage = styled.img`
  height: 2.2rem;
`

export const LogoImageSmall = styled.img`
  height: 2.0rem;
`

export const MenuSection = styled.nav<{ collapsed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: ${({ collapsed }) => (collapsed ? '1rem 0' : '1.5rem 1.125rem')};
  flex: 1;
`

export const MenuIcon = styled.img<{ active: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  filter: ${({ active }) => active 
    ? 'invert(36%) sepia(93%) saturate(1352%) hue-rotate(206deg) brightness(97%) contrast(92%)' 
    : 'invert(72%) sepia(8%) saturate(654%) hue-rotate(189deg) brightness(91%) contrast(87%)'};
  transition: filter 0.2s ease;
`

export const MenuItemButton = styled.button<{ active: boolean; collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: ${({ collapsed }) => (collapsed ? '0.5rem' : '0.438rem 1.438rem')};
  border-radius: ${radius.lg};
  border: none;
  background-color: ${({ active }) => (active ? colors.primary100 : 'transparent')};
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: ${({ collapsed }) => (collapsed ? '3.5rem' : '100%')};

  &:hover {
    background-color: ${colors.primary100};
  }
`

export const MenuLabel = styled.span<{ active: boolean; collapsed: boolean }>`
  font-family: 'Paperlogy', sans-serif;
  font-weight: ${({ active }) => (active ? 500 : 400)};
  font-size: 1.125rem;
  color: ${({ active }) => (active ? colors.primary : colors.primaryGray)};
  letter-spacing: 0.056rem;
  white-space: nowrap;
  display: ${({ collapsed }) => (collapsed ? 'none' : 'block')};
`

export const FooterSection = styled.div<{ collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ collapsed }) => (collapsed ? 'center' : 'flex-start')};
  gap: 0.75rem;
  padding: ${({ collapsed }) => (collapsed ? '1rem' : '1.5rem')};
  height: 5.5rem;
  border-top: 1px solid ${colors.n02};
`

export const ProfileAvatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
`

export const ProfileInfo = styled.div<{ collapsed: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  overflow: hidden;
  width: ${({ collapsed }) => (collapsed ? '0' : 'auto')};
  opacity: ${({ collapsed }) => (collapsed ? 0 : 1)};
  transition: opacity 0.3s ease;
`

export const ProfileName = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 500;
  font-size: 1.125rem;
  color: ${colors.n04};
  white-space: nowrap;
`

export const LogoutButton = styled.button`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  color: ${colors.n03};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;

  &:hover {
    color: ${colors.primary};
  }
`
