import { useEffect } from 'react';
import { useDeviceStore } from '@/stores/useDeviceStore';
import { breakpoints } from '@/styles/media';

export const useDevice = () => {
  const { isMobile, setIsMobile } = useDeviceStore();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= breakpoints.mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsMobile]);

  return { isMobile };
};
