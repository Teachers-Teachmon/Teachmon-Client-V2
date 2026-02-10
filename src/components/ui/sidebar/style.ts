import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { colors, radius, zIndex } from '@/styles/theme'
import { mq } from '@/styles/media'

export const SidebarContainer = styled.aside<{ collapsed: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${({ collapsed }) => (collapsed ? '5rem' : '15vw')};
  min-width: ${({ collapsed }) => (collapsed ? '4rem' : '12rem')};
  max-width: ${({ collapsed }) => (collapsed ? '5rem' : '17.5rem')};
  height: 100vh;
  background-color: ${colors.n01};
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  transition: width 0.3s ease, min-width 0.3s ease, max-width 0.3s ease;
  overflow: visible;
  z-index: ${zIndex.dropdown};

  ${mq.mobile} {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: 5rem;
    flex-direction: row;
    align-items: center;
    box-shadow: 0 -0.25rem 0.5rem rgba(0, 0, 0, 0.12);
  }
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

  ${mq.mobile} {
    display: none;
  }
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

  ${mq.mobile} {
    display: none;
  }
`

export const LogoImage = styled.img`
  height: clamp(1.8rem, 2vw, 2.2rem);
`

export const LogoImageSmall = styled.img`
  height: clamp(1.6rem, 1.8vw, 2rem);
`

export const MenuSection = styled.nav<{ collapsed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: ${({ collapsed }) => (collapsed ? '1rem 0' : '1.5rem 1.125rem')};
  flex: 1;

  ${mq.mobile} {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 0;
    padding: 0 0.5rem;
  }
`

export const MenuIcon = styled.img`
  width: 2.5rem;
  height: 2.5rem;

  ${mq.mobile} {
    width: 2.25rem;
    height: 2.25rem;
  }
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

  ${mq.mobile} {
    flex-direction: column;
    padding: 0.25rem 0.5rem;
    width: auto;
    gap: 0.125rem;
  }

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

  ${mq.mobile} {
    display: none;
  }
`

export const MobileActions = styled.div`
  display: none;

  ${mq.mobile} {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.75rem;
  }
`

export const MobileProfileButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const MobileOverlay = styled.div`
  display: none;

  ${mq.mobile} {
    display: block;
    position: fixed;
    inset: 0;
    background: transparent;
    z-index: ${zIndex.overlay};
  }
`

const mobilePopoverIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(0.75rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const MobileSheet = styled.div`
  display: none;

  ${mq.mobile} {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    position: fixed;
    right: 0.75rem;
    bottom: 5.5rem;
    width: 11.5rem;
    padding: 0.875rem 1rem 1rem;
    background: ${colors.n01};
    border-radius: ${radius.lg};
    border: 1px solid ${colors.n02};
    box-shadow: 0 0.5rem 1.25rem rgba(0, 0, 0, 0.12);
    transform: translateY(0.5rem);
    opacity: 0;
    animation: ${mobilePopoverIn} 0.18s ease forwards;
    z-index: ${zIndex.modal};
  }
`

export const MobilePopoverPointer = styled.span`
  display: none;

  ${mq.mobile} {
    display: block;
    position: absolute;
    right: 0.6rem;
    bottom: -0.5rem;
    width: 1rem;
    height: 1rem;
    background: ${colors.n01};
    border-right: 1px solid ${colors.n02};
    border-bottom: 1px solid ${colors.n02};
    transform: rotate(45deg);
  }
`

export const MobileSheetHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

export const MobileProfileName = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 600;
  font-size: 1.125rem;
  color: ${colors.n04};
`

export const MobileLogoutButton = styled.button`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  color: ${colors.n04};
  background: ${colors.primary100};
  border: none;
  border-radius: ${radius.lg};
  padding: 0.75rem 1rem;
  cursor: pointer;

  &:hover {
    color: ${colors.primary};
  }
`


export const FooterSection = styled.div<{ collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ collapsed }) => (collapsed ? 'center' : 'flex-start')};
  gap: 0.75rem;
  padding: ${({ collapsed }) => (collapsed ? '1rem' : '1.5rem')};
  height: 5.5rem;
  border-top: 1px solid ${colors.n02};

  ${mq.mobile} {
    display: none;
  }
`

export const ProfileAvatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;

  ${mq.mobile} {
    width: 2.125rem;
    height: 2.125rem;
  }
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

  ${mq.mobile} {
    font-size: 1rem;
  }
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

  ${mq.mobile} {
    font-size: 0.75rem;
  }

  &:hover {
    color: ${colors.primary};
  }
`
