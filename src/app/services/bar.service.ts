import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BarListItem, PageResponse, BarFilters } from '../models/bar-list-item.model';
import { BarDetails } from '../models/bar-details.model';

@Injectable({
  providedIn: 'root',
})
export class BarService {
  private readonly API_URL = `${environment.apiUrl}/bars`;

  constructor(private http: HttpClient) {}

  /**
   * Get paginated list of bars with optional filters
   * GET /api/bars
   */
  getBars(filters?: BarFilters): Observable<PageResponse<BarListItem>> {
    let params = new HttpParams();

    if (filters) {
      if (filters.cityId !== undefined) {
        params = params.set('cityId', filters.cityId.toString());
      }
      if (filters.q) {
        params = params.set('q', filters.q);
      }
      if (filters.priceLevel !== undefined) {
        params = params.set('priceLevel', filters.priceLevel.toString());
      }
      if (filters.minRating !== undefined) {
        params = params.set('minRating', filters.minRating.toString());
      }
      if (filters.active !== undefined) {
        params = params.set('active', filters.active.toString());
      }
      if (filters.page !== undefined) {
        params = params.set('page', filters.page.toString());
      }
      if (filters.size !== undefined) {
        params = params.set('size', filters.size.toString());
      }
      if (filters.sortBy) {
        params = params.set('sortBy', filters.sortBy);
      }
      if (filters.sortDir) {
        params = params.set('sortDir', filters.sortDir);
      }
    }

    return this.http.get<PageResponse<BarListItem>>(this.API_URL, { params });
  }

  /**
   * Get single bar by slug
   * GET /api/bars/{slug}
   */
  getBarBySlug(slug: string): Observable<BarDetails> {
    return this.http.get<BarDetails>(`${this.API_URL}/${slug}`);
  }
}
