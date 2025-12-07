import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user-profile/user-profile.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor() {
    // Try to load user from localStorage on service initialization
    const storedUser = localStorage.getItem('currentUser');
    const user = storedUser ? JSON.parse(storedUser) : null;

    this.currentUserSubject = new BehaviorSubject<User | null>(user);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
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
          mainCity: 'Kyiv',
          currentCity: 'Kyiv',
          race: 'Dragonborn',
          raceImage: 'races_images/dragonborn_m.jpg',
        };

        this.setCurrentUser(user);
        observer.next(user);
        observer.complete();
      }, 500);
    });
  }

  signup(userData: Partial<User>): Observable<User> {
    // TODO: Implement actual API call
    // For now, simulate signup with mock data
    return new Observable((observer) => {
      setTimeout(() => {
        const user: User = {
          id: Date.now(),
          email: userData.email!,
          firstName: userData.firstName!,
          lastName: userData.lastName,
          nickname: userData.nickname,
          mainCity: userData.mainCity!,
          currentCity: userData.mainCity!,
          race: userData.race,
          raceImage: userData.raceImage,
        };

        this.setCurrentUser(user);
        observer.next(user);
        observer.complete();
      }, 500);
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  updateUser(user: User): void {
    this.setCurrentUser(user);
  }

  updateCurrentCity(cityName: string): void {
    const user = this.currentUserValue;
    if (user) {
      user.currentCity = cityName;
      this.setCurrentUser(user);
    }
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
