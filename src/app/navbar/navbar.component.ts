import { Component, input, output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isSidebarOpen = input<boolean>(false);
  toggleSidebar = output<void>();

  constructor(private router: Router) {}

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
    // TODO: Check if user is logged in, if not navigate to login
    this.router.navigate(['/login']);
  }
}
