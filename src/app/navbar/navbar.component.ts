import { Component, input, output, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectIsAuthenticated } from '../store/auth.selectors';
import { selectIsInParty } from '../store/party.selectors';
import { selectIsInRaid } from '../store/raid.selectors';
import * as PartyActions from '../store/party.actions';
import * as RaidActions from '../store/raid.actions';

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
  isInParty$: Observable<boolean>;
  isInRaid$: Observable<boolean>;
  statusText$: Observable<string>;
  statusColor$: Observable<string>;
  private destroy$ = new Subject<void>();
  private store = inject(Store);

  constructor(private router: Router) {
    this.isInParty$ = this.store.select(selectIsInParty);
    this.isInRaid$ = this.store.select(selectIsInRaid);

    // Determine status text based on party/raid state
    this.statusText$ = combineLatest([this.isInParty$, this.isInRaid$]).pipe(
      map(([inParty, inRaid]) => {
        if (inParty) return 'In Party';
        if (inRaid) return 'In Raid';
        return 'Waiting in Tavern';
      })
    );

    // Determine status color class
    this.statusColor$ = combineLatest([this.isInParty$, this.isInRaid$]).pipe(
      map(([inParty, inRaid]) => {
        if (inParty) return 'party';
        if (inRaid) return 'raid';
        return 'tavern';
      })
    );
  }

  ngOnInit() {
    // Subscribe to authentication state from NgRx store
    this.store
      .select(selectIsAuthenticated)
      .pipe(takeUntil(this.destroy$))
      .subscribe((isAuth) => {
        this.isAuthenticated = isAuth;
      });

    // Load party from localStorage on init
    const savedParty = localStorage.getItem('currentDungeonParty');
    if (savedParty) {
      const party = JSON.parse(savedParty);
      this.store.dispatch(PartyActions.loadParty({ party }));
    }

    // Load raid from localStorage on init
    const savedRaid = localStorage.getItem('currentRaid');
    if (savedRaid) {
      const raid = JSON.parse(savedRaid);
      this.store.dispatch(RaidActions.loadRaid({ raid }));
    }
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

  onSummonPartyClick() {
    // Navigate to summon party page
    this.router.navigate(['/summon-party']);
  }

  onOrganizeRaidClick() {
    // TODO: Implement organize raid functionality
    console.log('Organize Raid clicked');
    // Navigate to raid creation or scroll to raids section
    this.router.navigate(['/'], { fragment: 'raids-section' });
  }
}
