import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { User } from '../user-profile/user-profile.component';
import { RegisterRequest } from '../shared/cities';
import * as AuthActions from '../store/auth.actions';
import { selectCurrentUser, selectIsAuthenticated } from '../store/auth.selectors';
import { environment } from '../../environments/environment';

const TOKEN_KEY = 'auth_token';

interface LoginResponse {
  token: string;
  user: User;
}

interface RegisterResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private store = inject(Store);
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/auth`;

  public currentUser$ = this.store.select(selectCurrentUser);
  private isAuthenticated$ = this.store.select(selectIsAuthenticated);

  constructor() {
    // Try to load user from localStorage on service initialization
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.store.dispatch(AuthActions.login({ user }));
    }
  }

  public get currentUserValue(): User | null {
    let user: User | null = null;
    this.currentUser$.subscribe((u) => (user = u)).unsubscribe();
    return user;
  }

  public get isAuthenticated(): boolean {
    let isAuth = false;
    this.isAuthenticated$.subscribe((auth) => (isAuth = auth)).unsubscribe();
    return isAuth;
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, { email, password }).pipe(
      tap((response) => {
        this.setToken(response.token);
        this.setCurrentUser(response.user);
      }),
      map((response) => response.user)
    );
  }

  signup(registerRequest: RegisterRequest): Observable<User> {
    return this.http.post<RegisterResponse>(`${this.API_URL}/register`, registerRequest).pipe(
      tap((response) => {
        this.setToken(response.token);
        this.setCurrentUser(response.user);
      }),
      map((response) => response.user)
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem(TOKEN_KEY);
    this.store.dispatch(AuthActions.logout());
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  updateUser(user: User): void {
    this.setCurrentUser(user);
  }

  updateUserProfile(user: User): Observable<User> {
    // TODO: Implement actual API call to PUT /api/users/:id
    // For now, just update the user in store and localStorage
    return new Observable((observer) => {
      setTimeout(() => {
        this.setCurrentUser(user);
        observer.next(user);
        observer.complete();
      }, 300);
    });
  }

  changePassword(userId: number, oldPassword: string, newPassword: string): Observable<boolean> {
    // TODO: Implement actual API call to PUT /api/users/:id/password
    // For now, simulate password change
    return new Observable((observer) => {
      setTimeout(() => {
        // In a real implementation, this would verify oldPassword
        // and update the password on the server
        console.log('Password change simulated for user:', userId);
        observer.next(true);
        observer.complete();
      }, 500);
    });
  }

  uploadAvatar(userId: number, file: File): Observable<string> {
    // TODO: Implement actual API call to POST /api/users/:id/avatar
    // This should use FormData to upload the file
    return new Observable((observer) => {
      setTimeout(() => {
        // In a real implementation, this would upload to server
        // and return the new avatar URL
        const mockUrl = `uploads/avatars/${userId}_${Date.now()}.jpg`;
        console.log('Avatar upload simulated, mock URL:', mockUrl);
        observer.next(mockUrl);
        observer.complete();
      }, 1000);
    });
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.store.dispatch(AuthActions.login({ user }));
  }
}
