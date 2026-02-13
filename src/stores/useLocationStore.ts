import { create } from 'zustand';

interface LocationState {
    place: string;
    setPlace: (newPlace: string) => void;
}

const useLocation = create<LocationState>((set) => ({
    place: '',
    setPlace: (newPlace: string) => set({ place: newPlace }),
}));

export default useLocation;