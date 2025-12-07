import { Component, input, output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subject, takeUntil } from 'rxjs';

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

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to authentication state
    this.authService.currentUser$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.isAuthenticated = user !== null;
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
