export interface City {
  id?: number; // Added to match backend response
  slug: string;
  name: string;
  x: number;
  y: number;
  icon?: string;
}

// Registration request payload
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mainCityId: number;
}
