import { create } from 'zustand';
import { breakpoints } from '@/styles/media';

interface DeviceState {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

export const useDeviceStore = create<DeviceState>((set) => ({
  isMobile: typeof window !== 'undefined' ? window.innerWidth <= breakpoints.mobile : false,
  setIsMobile: (isMobile: boolean) => set({ isMobile }),
}));
