import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as PartyActions from '../store/party.actions';
import { DungeonParty } from '../store/party.actions';
import { selectCurrentParty } from '../store/party.selectors';

interface Friend {
  id: number;
  firstName: string;
  lastName: string;
  nickname?: string;
  profileImage?: string;
  race?: string;
  selected?: boolean;
}

@Component({
  selector: 'app-summon-party',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './summon-party.component.html',
  styleUrl: './summon-party.component.css',
})
export class SummonPartyComponent implements OnInit {
  partyName = '';
  selectedTime = '';
  currentParty$: Observable<DungeonParty | null>;

  timeOptions = [
    { value: 'now', label: 'NOW!!!' },
    { value: 'today-evening', label: 'Today Evening (6 PM)' },
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'this-weekend', label: 'This Weekend' },
    { value: 'custom', label: 'Custom Time' },
  ];

  customDateTime = '';

  friends: Friend[] = [
    {
      id: 1,
      firstName: 'Thorin',
      lastName: 'Oakenshield',
      nickname: 'TheKingUnderMountain',
      profileImage: 'races_images/dwarf_m.jpg',
      race: 'Dwarf',
      selected: false,
    },
    {
      id: 2,
      firstName: 'Legolas',
      lastName: 'Greenleaf',
      nickname: 'ElfArcher',
      profileImage: 'races_images/elf_m.jpg',
      race: 'Elf',
      selected: false,
    },
    {
      id: 3,
      firstName: 'Gimli',
      lastName: 'Son of Glóin',
      nickname: 'AxeMaster',
      profileImage: 'races_images/dwarf_m.jpg',
      race: 'Dwarf',
      selected: false,
    },
    {
      id: 4,
      firstName: 'Aragorn',
      lastName: 'Elessar',
      nickname: 'Strider',
      profileImage: 'races_images/human_m.jpg',
      race: 'Human',
      selected: false,
    },
    {
      id: 5,
      firstName: 'Gandalf',
      lastName: 'the Grey',
      nickname: 'Wizard',
      profileImage: 'races_images/human_m.jpg',
      race: 'Human',
      selected: false,
    },
  ];

  constructor(private router: Router, private store: Store) {
    this.currentParty$ = this.store.select(selectCurrentParty);
  }

  ngOnInit() {
    // Load party from localStorage if exists (for initial load)
    const savedParty = localStorage.getItem('currentDungeonParty');
    if (savedParty) {
      const party = JSON.parse(savedParty);
      this.store.dispatch(PartyActions.loadParty({ party }));
    }
  }

  toggleFriendSelection(friend: Friend) {
    friend.selected = !friend.selected;
  }

  getSelectedFriends(): Friend[] {
    return this.friends.filter((f) => f.selected);
  }

  isFormValid(): boolean {
    return (
      this.partyName.trim() !== '' &&
      this.selectedTime !== '' &&
      this.getSelectedFriends().length > 0
    );
  }

  summonParty() {
    if (!this.isFormValid()) {
      alert('Please fill in all fields and select at least one friend!');
      return;
    }

    const selectedFriends = this.getSelectedFriends();
    const timeDisplay = this.getTimeDisplay();

    const party: DungeonParty = {
      name: this.partyName,
      time: timeDisplay,
      members: selectedFriends.map((f) => ({ ...f })),
      createdAt: new Date(),
    };

    // Save to localStorage and NgRx store
    localStorage.setItem('currentDungeonParty', JSON.stringify(party));
    this.store.dispatch(PartyActions.createParty({ party }));

    // Show success message
    console.log('Party summoned!', party);

    // Reset form
    this.resetForm();
  }

  getTimeDisplay(): string {
    if (this.selectedTime === 'now') {
      return 'NOW!!!';
    } else if (this.selectedTime === 'custom' && this.customDateTime) {
      return new Date(this.customDateTime).toLocaleString();
    } else {
      const option = this.timeOptions.find((t) => t.value === this.selectedTime);
      return option ? option.label : '';
    }
  }

  resetForm() {
    this.partyName = '';
    this.selectedTime = '';
    this.customDateTime = '';
    this.friends.forEach((f) => (f.selected = false));
  }

  dismissCurrentParty() {
    if (confirm('Are you sure you want to dismiss the current party?')) {
      localStorage.removeItem('currentDungeonParty');
      this.store.dispatch(PartyActions.dismissParty());
    }
  }

  isInCurrentParty(friend: Friend, party: DungeonParty): boolean {
    return party.members.some((member) => member.id === friend.id);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
