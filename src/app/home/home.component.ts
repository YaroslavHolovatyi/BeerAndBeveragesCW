import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BarCardComponent, Bar } from '../bar-card/bar-card.component';
import { AuthService } from '../services/auth.service';
import { Subject, takeUntil, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCurrentParty, selectPartyMembers } from '../store/party.selectors';
import { selectCurrentRaid } from '../store/raid.selectors';
import * as PartyActions from '../store/party.actions';
import * as RaidActions from '../store/raid.actions';
import { DungeonParty, Friend as PartyMember } from '../store/party.actions';
import { Raid as CurrentRaid } from '../store/raid.actions';

export interface Friend {
  id: number;
  firstName: string;
  lastName: string;
  nickname?: string;
  profileImage?: string;
  race?: string;
  isInvited?: boolean;
}

export interface Raid {
  id: number;
  name: string;
  creator: string;
  theme: string;
  barName: string;
  maxAttendees: number;
  currentAttendees: number;
  date: Date;
  isJoined?: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BarCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  currentParty$: Observable<DungeonParty | null>;
  partyMembers$: Observable<PartyMember[]>;
  currentRaid$: Observable<CurrentRaid | null>;
  private destroy$ = new Subject<void>();

  friends: Friend[] = [
    {
      id: 1,
      firstName: 'Thorin',
      lastName: 'Oakenshield',
      nickname: 'TheKingUnderMountain',
      profileImage: 'races_images/dwarf_m.jpg',
      race: 'Dwarf',
      isInvited: false,
    },
    {
      id: 2,
      firstName: 'Legolas',
      lastName: 'Greenleaf',
      nickname: 'ElfArcher',
      profileImage: 'races_images/elf_m.jpg',
      race: 'Elf',
      isInvited: false,
    },
    {
      id: 3,
      firstName: 'Gimli',
      lastName: 'Son of Glóin',
      nickname: 'AxeMaster',
      profileImage: 'races_images/dwarf_m.jpg',
      race: 'Dwarf',
      isInvited: false,
    },
    {
      id: 4,
      firstName: 'Aragorn',
      lastName: 'Elessar',
      nickname: 'Strider',
      profileImage: 'races_images/human_m.jpg',
      race: 'Human',
      isInvited: false,
    },
    {
      id: 5,
      firstName: 'Gandalf',
      lastName: 'the Grey',
      nickname: 'Wizard',
      profileImage: 'races_images/human_m.jpg',
      race: 'Human',
      isInvited: false,
    },
  ];

  raids: Raid[] = [
    {
      id: 1,
      name: 'Friday Night Tavern Crawl',
      creator: 'Thorin Oakenshield',
      theme: 'Dwarven Ale Tasting',
      barName: "The Dragon's Tavern",
      maxAttendees: 20,
      currentAttendees: 12,
      date: new Date(2026, 0, 17, 20, 0),
      isJoined: false,
    },
    {
      id: 2,
      name: 'Weekend Warriors Gathering',
      creator: 'Aragorn Elessar',
      theme: 'Medieval Beer Festival',
      barName: 'The Merry Knight',
      maxAttendees: 30,
      currentAttendees: 18,
      date: new Date(2026, 0, 18, 19, 0),
      isJoined: false,
    },
    {
      id: 3,
      name: 'Elven Wine & Song',
      creator: 'Legolas Greenleaf',
      theme: 'Wine & Acoustic Night',
      barName: 'The Silver Lute',
      maxAttendees: 15,
      currentAttendees: 9,
      date: new Date(2026, 0, 19, 21, 0),
      isJoined: false,
    },
    {
      id: 4,
      name: 'Wizard Wednesday',
      creator: 'Gandalf the Grey',
      theme: 'Trivia & Craft Beers',
      barName: 'The Scholarly Stein',
      maxAttendees: 25,
      currentAttendees: 22,
      date: new Date(2026, 0, 15, 18, 30),
      isJoined: false,
    },
  ];

  bars: Bar[] = [
    {
      id: 1,
      name: "The Dragon's Tavern",
      address: '123 Castle Street, Old Town District',
      description:
        'A legendary tavern known for its extensive collection of rare ales and mystical atmosphere. Perfect for adventurers seeking tales and drinks.',
      phone: '+1 234 567 8901',
      rating: 4.8,
      priceLevel: 'very-high',
      imageUrl: 'races_images/dwarf_m.jpg',
      isLiked: false,
    },
    {
      id: 2,
      name: 'The Merry Knight',
      address: '456 Market Square, City Center',
      description:
        'A cozy neighborhood bar with friendly staff and great music. Popular spot for locals and tourists alike.',
      phone: '+1 234 567 8902',
      rating: 4.2,
      priceLevel: 'average',
      imageUrl: 'races_images/dwarf_m.jpg',
      isLiked: false,
    },
    {
      id: 3,
      name: "Beginner's Luck Pub",
      address: '789 Harbor Road, Waterfront',
      description:
        'Budget-friendly pub with a relaxed vibe. Great place for students and those starting their pub crawl journey.',
      phone: '+1 234 567 8903',
      rating: 3.9,
      priceLevel: 'low',
      imageUrl: 'races_images/dwarf_m.jpg',
      isLiked: false,
    },
  ];

  constructor(private authService: AuthService, private store: Store, private router: Router) {
    this.currentParty$ = this.store.select(selectCurrentParty);
    this.partyMembers$ = this.store.select(selectPartyMembers);
    this.currentRaid$ = this.store.select(selectCurrentRaid);
  }

  ngOnInit() {
    this.authService.currentUser$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.isLoggedIn = !!user;
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

  sendInvitation(friend: Friend) {
    friend.isInvited = !friend.isInvited;
    if (friend.isInvited) {
      console.log(`Invitation crow sent to ${friend.firstName} ${friend.lastName}!`);
      // TODO: Implement backend call to send party invitation
    } else {
      console.log(`Invitation cancelled for ${friend.firstName} ${friend.lastName}`);
      // TODO: Implement backend call to cancel party invitation
    }
  }

  joinRaid(raid: Raid) {
    if (raid.currentAttendees < raid.maxAttendees) {
      raid.isJoined = !raid.isJoined;

      if (raid.isJoined) {
        raid.currentAttendees++;
        const raidData: CurrentRaid = {
          id: raid.id,
          name: raid.name,
          creator: raid.creator,
          theme: raid.theme,
          barName: raid.barName,
          maxAttendees: raid.maxAttendees,
          currentAttendees: raid.currentAttendees,
          date: raid.date,
        };
        localStorage.setItem('currentRaid', JSON.stringify(raidData));
        this.store.dispatch(RaidActions.joinRaid({ raid: raidData }));
        console.log(`You have answered the call! Joined raid: ${raid.name}`);
      } else {
        raid.currentAttendees--;
        localStorage.removeItem('currentRaid');
        this.store.dispatch(RaidActions.leaveRaid());
        console.log(`You have left the raid: ${raid.name}`);
      }
    } else {
      alert('This raid is full!');
    }
  }

  isInCurrentParty(friendId: number, partyMembers: PartyMember[]): boolean {
    return partyMembers.some((member) => member.id === friendId);
  }

  isInCurrentRaid(friendId: number): boolean {
    // For demo purposes, randomly assign some friends to raids
    // In production, this would check against actual raid members
    return [2, 4].includes(friendId);
  }

  get hasInvitedFriends(): boolean {
    return this.friends.some((friend) => friend.isInvited);
  }

  navigateToCreateParty() {
    this.router.navigate(['/summon-party']);
  }
}
