import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  loadingCount: number;
  startLoading: () => void;
  stopLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  loadingCount: 0,
  startLoading: () =>
    set((state) => ({
      loadingCount: state.loadingCount + 1,
      isLoading: true,
    })),
  stopLoading: () =>
    set((state) => {
      const newCount = Math.max(0, state.loadingCount - 1);
      return {
        loadingCount: newCount,
        isLoading: newCount > 0,
      };
    }),
}));
