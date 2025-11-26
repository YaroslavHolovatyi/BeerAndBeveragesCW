import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isOpen = input<boolean>(false);
  closeSidebar = output<void>();

  menuItems = [
    { label: 'List of Pubs', route: '/pubs' },
    { label: 'Random Pub', route: '/random' },
    { label: 'Check Time', route: '/check-time' },
    { label: 'Achievements', route: '/achievements' },
    { label: 'About', route: '/about' },
  ];

  constructor(private router: Router) {}

  onClose() {
    this.closeSidebar.emit();
  }

  onMenuItemClick(item: any) {
    if (item.route === '/random') {
      this.navigateToRandomBar();
    } else {
      this.router.navigate([item.route]);
    }
    this.closeSidebar.emit();
  }

  navigateToRandomBar() {
    // Generate a random bar ID between 1 and 5
    const randomBarId = Math.floor(Math.random() * 5) + 1;
    this.router.navigate(['/bar', randomBarId]);
  }
}
