export interface BarListItem {
  slug: string;
  cityId: number;
  name: string;
  address: string;
  priceLevel: number;
  rating: number;
  latitude: number;
  longitude: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface BarFilters {
  cityId?: number;
  q?: string;
  priceLevel?: number;
  minRating?: number;
  active?: boolean;
  page?: number;
  size?: number;
  sortBy?: 'rating' | 'name' | 'priceLevel';
  sortDir?: 'ASC' | 'DESC';
}
