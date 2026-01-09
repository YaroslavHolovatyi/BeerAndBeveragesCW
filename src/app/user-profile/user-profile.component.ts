import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { City } from '../shared/cities';
import { CitySelectorModalComponent } from '../map/city-selector-modal/city-selector-modal.component';
import { AuthService } from '../services/auth.service';
import { CityService } from '../services/city.service';
import { Subject, takeUntil } from 'rxjs';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName?: string;
  nickname?: string;
  mainCity: {
    id: number;
    name: string;
    slug: string;
  };
  race?: string;
  gender?: string;
  profileImage?: string;
  raceImage?: string;
}

export interface FavoriteBar {
  id: number;
  name: string;
  imageUrl: string;
  address: string;
  phone: string;
  workHours: string;
  timesVisited: number;
  rating: number;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, CitySelectorModalComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user: User | null = null;

  favoriteBars: FavoriteBar[] = [
    {
      id: 1,
      name: "The Dragon's Tavern",
      imageUrl: 'races_images/dwarf_m.jpg',
      address: '123 Castle Street, Kyiv',
      phone: '+380 44 123 4567',
      workHours: '10:00 AM - 2:00 AM',
      timesVisited: 15,
      rating: 4.8,
    },
    {
      id: 2,
      name: 'The Merry Knight',
      imageUrl: 'races_images/dwarf_m.jpg',
      address: '456 Market Square, Lviv',
      phone: '+380 32 234 5678',
      workHours: '12:00 PM - 12:00 AM',
      timesVisited: 8,
      rating: 4.2,
    },
    {
      id: 4,
      name: 'The Golden Chalice',
      imageUrl: 'races_images/dwarf_m.jpg',
      address: '321 Cathedral Avenue, Kharkiv',
      phone: '+380 57 456 7890',
      workHours: '5:00 PM - 1:00 AM',
      timesVisited: 5,
      rating: 4.6,
    },
  ];

  showCityModal = false;
  selectedCityObj: City | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private cityService: CityService
  ) {}

  ngOnInit() {
    // Subscribe to current user
    this.authService.currentUser$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (user) {
        this.user = user;
        // Load cities and find the user's city
        this.cityService.getCities().subscribe((cities) => {
          this.selectedCityObj = cities.find((c) => c.name === user.mainCity.name) || null;
        });
      } else {
        // If no user is logged in, redirect to login
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getDisplayName(): string {
    if (!this.user) return '';
    if (this.user.nickname) {
      return this.user.nickname;
    }
    if (this.user.lastName) {
      return `${this.user.firstName} ${this.user.lastName}`;
    }
    return this.user.firstName;
  }

  getFullName(): string {
    if (!this.user) return '';
    if (this.user.lastName) {
      return `${this.user.firstName} ${this.user.lastName}`;
    }
    return this.user.firstName;
  }

  getProfileImage(): string {
    if (!this.user) return 'races_images/human_m.jpg';
    return this.user.profileImage || this.user.raceImage || 'races_images/human_m.jpg';
  }

  navigateToBar(barId: number) {
    this.router.navigate(['/bar', barId]);
  }

  editProfile() {
    this.router.navigate(['/profile/edit']);
  }

  changeLocation() {
    this.showCityModal = true;
  }

  onCityConfirmed(city: City) {
    if (!this.user || !city.id) return;

    this.selectedCityObj = city;
    // Update mainCity with new city object
    this.user.mainCity = {
      id: city.id,
      name: city.name,
      slug: city.slug,
    };
    this.showCityModal = false;

    // Update via AuthService to persist the change
    this.authService.updateUser(this.user);
    console.log('Main city changed to:', city.name);
  }

  onModalClosed() {
    this.showCityModal = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
