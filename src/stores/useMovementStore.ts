import { create } from 'zustand';

interface SelectedMovement {
  leaveseatId: string;
  place: string;
}

interface MovementState {
  selectedMovement: SelectedMovement | null;
  setSelectedMovement: (movement: SelectedMovement | null) => void;
}

export const useMovementStore = create<MovementState>((set) => ({
  selectedMovement: null,
  setSelectedMovement: (movement) => set({ selectedMovement: movement }),
}));
