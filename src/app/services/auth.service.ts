import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../user-profile/user-profile.component';
import { RegisterRequest } from '../shared/cities';
import * as AuthActions from '../store/auth.actions';
import { selectCurrentUser, selectIsAuthenticated } from '../store/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private store = inject(Store);
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
    // TODO: Implement actual API call
    // For now, simulate login with mock data
    return new Observable((observer) => {
      setTimeout(() => {
        const user: User = {
          id: 1,
          email: email,
          firstName: 'John',
          lastName: 'Doe',
          nickname: 'DragonSlayer',
          mainCity: {
            id: 1,
            name: 'Kyiv',
            slug: 'kyiv',
          },
          race: 'Dragonborn',
          raceImage: 'races_images/dragonborn_m.jpg',
        };

        this.setCurrentUser(user);
        observer.next(user);
        observer.complete();
      }, 500);
    });
  }

  signup(registerRequest: RegisterRequest): Observable<User> {
    // TODO: Implement actual API call to POST /api/auth/register
    // For now, simulate signup with mock data
    return new Observable((observer) => {
      setTimeout(() => {
        const user: User = {
          id: Date.now(),
          email: registerRequest.email,
          firstName: registerRequest.firstName,
          lastName: registerRequest.lastName,
          mainCity: {
            id: registerRequest.mainCityId,
            name: 'Selected City', // This will come from backend response
            slug: 'selected-city',
          },
        };

        this.setCurrentUser(user);
        observer.next(user);
        observer.complete();
      }, 500);
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.store.dispatch(AuthActions.logout());
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
