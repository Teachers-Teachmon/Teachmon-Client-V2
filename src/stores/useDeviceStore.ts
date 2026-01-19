import { create } from 'zustand';
import { breakpoints } from '@/styles/media';

interface DeviceState {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
  initializeDevice: () => void;
}

export const useDeviceStore = create<DeviceState>((set) => ({
  isMobile: false,
  setIsMobile: (isMobile: boolean) => set({ isMobile }),
  initializeDevice: () => {
    const checkMobile = () => {
      set({ isMobile: window.innerWidth <= breakpoints.mobile });
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // cleanup은 컴포넌트에서 useEffect로 처리
    return () => window.removeEventListener('resize', checkMobile);
  },
}));
