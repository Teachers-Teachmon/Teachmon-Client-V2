import axiosInstance from '@/lib/axiosInstance';

// Types
export interface Place {
  id: number;
  name: string;
  floor: number;
}

// APIs
export const searchPlaces = async (query?: string): Promise<Place[]> => {
  const params = query ? { query } : {};
  const response = await axiosInstance.get<Place[]>('/search/place', { params });
  return response.data;
};
