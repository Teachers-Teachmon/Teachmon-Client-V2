import styled from '@emotion/styled';
import { mq } from '@/styles/media';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 140px;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  ${mq.mobile} {
    height: 60px;
    padding: 0 20px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;

  img {
    height: 36px;
    width: auto;
  }

  ${mq.mobile} {
    img {
      height: 28px;
    }
  }
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 60px;

  ${mq.mobile} {
    display: none;
  }
`;

export const NavItem = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.4;
  color: ${({ active }) => (active ? '#2e6ff2' : '#000000')};
  cursor: pointer;
  padding: 12px 0;
  transition: color 0.3s ease;
  white-space: nowrap;

  &:hover {
    color: #2e6ff2;
  }
`;

export const LoginButton = styled.button`
  min-width: 100px;
  height: 44px;
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 22px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.4;
  color: #000000;
  cursor: pointer;
  padding: 0 24px;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background-color: #000000;
    color: #ffffff;
  }

  ${mq.mobile} {
    min-width: 80px;
    height: 36px;
    font-size: 14px;
    padding: 0 16px;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #000000;
  
  ${mq.mobile} {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;

  ${mq.mobile} {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background-color: #ffffff;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    gap: 16px;
  }
`;

export const MobileNavItem = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.4;
  color: ${({ active }) => (active ? '#2e6ff2' : '#000000')};
  cursor: pointer;
  padding: 12px 0;
  text-align: left;
  transition: color 0.3s ease;

  &:hover {
    color: #2e6ff2;
  }
`;