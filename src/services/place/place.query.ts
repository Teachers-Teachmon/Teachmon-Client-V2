import { queryOptions } from '@tanstack/react-query';
import { searchPlaces } from './place.api';

export const placeQuery = {
  search: (query?: string) =>
    queryOptions({
      queryKey: ['place.search', query],
      queryFn: () => searchPlaces(query),
      enabled: !!query && query.length > 0,
    }),
};
