import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

interface Friend {
  id: number;
  nickname: string;
  firstName?: string;
  lastName?: string;
  race?: string;
  raceImage?: string;
  currentCity?: string;
}

interface FriendRequest {
  id: number;
  fromUserId: number;
  toUserId: number;
  fromUser: Friend;
  toUser: Friend;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css',
})
export class FriendsComponent implements OnInit {
  activeTab: 'friends' | 'requests' = 'friends';
  
  // Friends list
  friends: Friend[] = [];
  
  // Friend requests
  receivedRequests: FriendRequest[] = [];
  sentRequests: FriendRequest[] = [];
  
  // Search for users
  searchQuery: string = '';
  searchResults: Friend[] = [];
  isSearching: boolean = false;
  
  currentUserId: number = 1; // Will be set from auth service

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Get current user
    const user = this.authService.currentUserValue;
    if (user) {
      this.currentUserId = user.id;
    }
    
    // Load initial data
    this.loadFriends();
    this.loadFriendRequests();
  }

  switchTab(tab: 'friends' | 'requests') {
    this.activeTab = tab;
  }

  loadFriends() {
    // TODO: Replace with actual API call
    // Mock data for now
    this.friends = [
      {
        id: 2,
        nickname: 'ElfArcher',
        firstName: 'Alice',
        lastName: 'Smith',
        race: 'Elf',
        raceImage: 'races_images/elf_f.jpg',
        currentCity: 'Lviv'
      },
      {
        id: 3,
        nickname: 'DwarfWarrior',
        firstName: 'Bob',
        lastName: 'Johnson',
        race: 'Dwarf',
        raceImage: 'races_images/dwarf_m.jpg',
        currentCity: 'Kyiv'
      }
    ];
  }

  loadFriendRequests() {
    // TODO: Replace with actual API call
    // Mock data for received requests
    this.receivedRequests = [
      {
        id: 1,
        fromUserId: 4,
        toUserId: this.currentUserId,
        fromUser: {
          id: 4,
          nickname: 'OrcBerserker',
          firstName: 'Charlie',
          race: 'Orc',
          raceImage: 'races_images/orc_m.jpg',
          currentCity: 'Odesa'
        },
        toUser: { id: this.currentUserId, nickname: 'You' },
        status: 'pending',
        createdAt: new Date()
      }
    ];
    
    // Mock data for sent requests
    this.sentRequests = [
      {
        id: 2,
        fromUserId: this.currentUserId,
        toUserId: 5,
        fromUser: { id: this.currentUserId, nickname: 'You' },
        toUser: {
          id: 5,
          nickname: 'HumanMage',
          firstName: 'Diana',
          race: 'Human',
          raceImage: 'races_images/human_f.jpg',
          currentCity: 'Kharkiv'
        },
        status: 'pending',
        createdAt: new Date()
      }
    ];
  }

  searchUsers() {
    if (this.searchQuery.trim().length < 2) {
      this.searchResults = [];
      return;
    }
    
    this.isSearching = true;
    
    // TODO: Replace with actual API call
    // Mock search results
    setTimeout(() => {
      this.searchResults = [
        {
          id: 6,
          nickname: 'TrollHunter',
          firstName: 'Eve',
          race: 'Troll',
          raceImage: 'races_images/troll_f.jpg',
          currentCity: 'Dnipro'
        },
        {
          id: 7,
          nickname: 'GnomeRogue',
          firstName: 'Frank',
          race: 'Gnome',
          raceImage: 'races_images/gnome_m.jpg',
          currentCity: 'Lviv'
        }
      ].filter(user => 
        user.nickname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.firstName?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.isSearching = false;
    }, 300);
  }

  sendFriendRequest(userId: number) {
    // TODO: Implement actual API call
    console.log('Sending friend request to user:', userId);
    alert('Friend request sent!');
  }

  acceptFriendRequest(requestId: number) {
    // TODO: Implement actual API call
    console.log('Accepting friend request:', requestId);
    const request = this.receivedRequests.find(r => r.id === requestId);
    if (request) {
      this.friends.push(request.fromUser);
      this.receivedRequests = this.receivedRequests.filter(r => r.id !== requestId);
    }
  }

  rejectFriendRequest(requestId: number) {
    // TODO: Implement actual API call
    console.log('Rejecting friend request:', requestId);
    this.receivedRequests = this.receivedRequests.filter(r => r.id !== requestId);
  }

  cancelFriendRequest(requestId: number) {
    // TODO: Implement actual API call
    console.log('Canceling friend request:', requestId);
    this.sentRequests = this.sentRequests.filter(r => r.id !== requestId);
  }

  removeFriend(friendId: number) {
    // TODO: Implement actual API call
    if (confirm('Are you sure you want to remove this friend?')) {
      console.log('Removing friend:', friendId);
      this.friends = this.friends.filter(f => f.id !== friendId);
    }
  }

  isAlreadyFriend(userId: number): boolean {
    return this.friends.some(f => f.id === userId);
  }

  hasPendingRequest(userId: number): boolean {
    return this.sentRequests.some(r => r.toUserId === userId && r.status === 'pending');
  }
}
