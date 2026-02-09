import { useState, useRef, useEffect } from 'react';

/**
 * 액션 메뉴 상태 관리 훅
 * - 메뉴 열기/닫기 상태 관리
 * - 외부 클릭 시 메뉴 자동 닫기
 */
export function useActionMenu() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openMenuId) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // menuRef 내부 클릭이면 무시
      if (menuRef.current && menuRef.current.contains(target)) {
        return;
      }
      
      // 드롭다운 메뉴 아이템 클릭이면 무시
      const clickedElement = event.target as HTMLElement;
      if (clickedElement.closest('[data-dropdown-menu]') || clickedElement.closest('[data-dropdown-item]')) {
        return;
      }
      
      setOpenMenuId(null);
    };
    
    // 약간의 지연을 두고 이벤트 리스너 등록
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);
    
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  return {
    openMenuId,
    setOpenMenuId,
    menuRef,
  };
}
