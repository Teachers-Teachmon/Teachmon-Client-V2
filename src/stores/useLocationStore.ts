import { create } from 'zustand';

const useLocation = create((set) => ({
    place: '',
    setPlace: (newPlace : string) => set({ place: newPlace }),
}));

export default useLocation;