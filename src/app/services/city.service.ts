import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { City } from '../shared/cities';

/**
 * CityService
 *
 * Fetches cities from the backend API.
 * Endpoint: GET /api/cities
 *
 * Response structure matches backend:
 * {
 *   id: number,
 *   name: string,
 *   slug: string,
 *   x: number,
 *   y: number
 * }
 */
@Injectable({
  providedIn: 'root',
})
export class CityService {
  private apiUrl = '/api/cities';
  private cachedCities: City[] | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Fetch all cities from backend
   * Caches result to avoid repeated API calls
   */
  getCities(): Observable<City[]> {
    // Return cached cities if available
    if (this.cachedCities) {
      return of(this.cachedCities);
    }

    return this.http.get<City[]>(this.apiUrl).pipe(
      tap((cities) => {
        this.cachedCities = cities;
        console.log('Cities loaded from API:', cities.length);
      }),
      catchError((error) => {
        console.error('Failed to fetch cities:', error);
        // Return empty array on error to prevent app crash
        return of([]);
      })
    );
  }

  /**
   * Clear cache (useful for refresh scenarios)
   */
  clearCache(): void {
    this.cachedCities = null;
  }
}
