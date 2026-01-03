import { Component, input, output, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { selectIsAuthenticated } from '../store/auth.selectors';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  isSidebarOpen = input<boolean>(false);
  toggleSidebar = output<void>();

  isAuthenticated = false;
  private destroy$ = new Subject<void>();
  private store = inject(Store);

  constructor(private router: Router) {}

  ngOnInit() {
    // Subscribe to authentication state from NgRx store
    this.store.select(selectIsAuthenticated)
      .pipe(takeUntil(this.destroy$))
      .subscribe((isAuth) => {
        this.isAuthenticated = isAuth;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBurgerMenuClick() {
    this.toggleSidebar.emit();
  }

  onLogoClick() {
    this.router.navigate(['/']);
  }

  onFavoritesClick() {
    // TODO: Implement favorites functionality
    console.log('Favorites clicked');
  }

  onFriendsClick() {
    this.router.navigate(['/friends']);
  }

  onUserProfileClick() {
    if (this.isAuthenticated) {
      // User is logged in, navigate to profile
      this.router.navigate(['/profile']);
    } else {
      // User is not logged in, navigate to login
      this.router.navigate(['/login']);
    }
  }
}
