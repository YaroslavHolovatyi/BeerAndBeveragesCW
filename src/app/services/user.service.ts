import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

// DTOs matching backend
export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatarUrl?: string;
  race?: string;
  gender?: string;
  mainCity: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mainCityId: number;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Get current authenticated user
   * GET /api/users/me
   */
  getCurrentUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.API_URL}/me`).pipe(catchError(this.handleError));
  }

  /**
   * Update user profile
   * PUT /api/users/me
   */
  updateProfile(data: UpdateProfileRequest): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.API_URL}/me`, data).pipe(
      tap((updatedUser) => {
        // Update user in auth service/store
        this.authService.updateUser(this.mapToUser(updatedUser));
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Change user password
   * PUT /api/users/me/password
   */
  changePassword(data: ChangePasswordRequest): Observable<void> {
    return this.http
      .put<void>(`${this.API_URL}/me/password`, data)
      .pipe(catchError(this.handleError));
  }

  /**
   * Upload user avatar
   * POST /api/users/me/avatar
   */
  uploadAvatar(file: File): Observable<UserResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<UserResponse>(`${this.API_URL}/me/avatar`, formData).pipe(
      tap((updatedUser) => {
        // Update user in auth service/store
        this.authService.updateUser(this.mapToUser(updatedUser));
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Map UserResponse to User type used in auth
   */
  private mapToUser(userResponse: UserResponse): any {
    return {
      id: userResponse.id,
      email: userResponse.email,
      firstName: userResponse.firstName,
      lastName: userResponse.lastName,
      nickname: userResponse.username,
      mainCity: userResponse.mainCity,
      profileImage: userResponse.avatarUrl,
      race: userResponse.race,
      gender: userResponse.gender,
    };
  }

  /**
   * Centralized error handler
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unexpected error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else if (error.status === 0) {
      // Network error or CORS issue
      errorMessage =
        'Cannot connect to server. Please check if the backend is running and CORS is configured.';
    } else {
      // Backend error - prioritize backend message
      const backendMessage = error.error?.message || error.error?.error;

      switch (error.status) {
        case 400:
          errorMessage = backendMessage || 'Invalid request data. Please check your input.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please login again.';
          break;
        case 409:
          // Conflict - email or username already exists
          errorMessage =
            backendMessage || 'Email or username already exists. Please choose a different one.';
          break;
        case 404:
          errorMessage = backendMessage || 'Resource not found. Please try again.';
          break;
        case 500:
          errorMessage = backendMessage || 'Server error. Please try again later.';
          break;
        default:
          errorMessage = backendMessage || `Error: ${error.status}`;
      }
    }

    console.error('UserService Error:', {
      status: error.status,
      message: errorMessage,
      details: error.error,
    });

    return throwError(() => new Error(errorMessage));
  }
}
