import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Bar {
  id: number;
  name: string;
  address: string;
  city: string;
  image?: string;
}

interface Raid {
  name: string;
  theme: string;
  image: string;
  bar: Bar | null;
  description: string;
  date?: string;
  time?: string;
}

@Component({
  selector: 'app-organize-raid',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './organize-raid.component.html',
  styleUrl: './organize-raid.component.css',
})
export class OrganizeRaidComponent implements OnInit {
  raid: Raid = {
    name: '',
    theme: '',
    image: '',
    bar: null,
    description: '',
    date: '',
    time: '',
  };

  themeOptions = [
    { value: 'tavern-crawl', label: '🍺 Tavern Crawl', icon: '🍺' },
    { value: 'wine-quest', label: '🍷 Wine Quest', icon: '🍷' },
    { value: 'cocktail-adventure', label: '🍹 Cocktail Adventure', icon: '🍹' },
    { value: 'beer-tournament', label: '🏆 Beer Tournament', icon: '🏆' },
    { value: 'whiskey-expedition', label: '🥃 Whiskey Expedition', icon: '🥃' },
    { value: 'party-raid', label: '🎉 Party Raid', icon: '🎉' },
    { value: 'trivia-night', label: '🎯 Trivia Night', icon: '🎯' },
    { value: 'karaoke-battle', label: '🎤 Karaoke Battle', icon: '🎤' },
  ];

  imageOptions = [
    { value: 'races_images/dwarf_m.jpg', label: 'Dwarf Warrior' },
    { value: 'races_images/elf_m.jpg', label: 'Elf Archer' },
    { value: 'races_images/human_m.jpg', label: 'Human Knight' },
    { value: 'races_images/halfling_m.jpg', label: 'Halfling Rogue' },
    { value: 'races_images/dragonborn_m.jpg', label: 'Dragonborn Fighter' },
  ];

  // Mock bars data - in production this would come from a service
  availableBars: Bar[] = [
    {
      id: 1,
      name: 'The Prancing Pony',
      address: '123 Main Street',
      city: 'Bree',
      image: 'icons/bar_icon.png',
    },
    {
      id: 2,
      name: 'Green Dragon Inn',
      address: '456 Shire Lane',
      city: 'Hobbiton',
      image: 'icons/bar_icon.png',
    },
    {
      id: 3,
      name: 'Mead Hall of Rohan',
      address: '789 Golden Vale',
      city: 'Edoras',
      image: 'icons/bar_icon.png',
    },
    {
      id: 4,
      name: 'The Last Homely House',
      address: '321 Elven Road',
      city: 'Rivendell',
      image: 'icons/bar_icon.png',
    },
  ];

  searchQuery = '';
  filteredBars: Bar[] = [];
  showBarDropdown = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.filteredBars = [...this.availableBars];
    this.setDefaultDateTime();
  }

  setDefaultDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    this.raid.date = `${year}-${month}-${day}`;
    this.raid.time = '18:00';
  }

  filterBars() {
    if (!this.searchQuery.trim()) {
      this.filteredBars = [...this.availableBars];
    } else {
      this.filteredBars = this.availableBars.filter(
        (bar) =>
          bar.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          bar.city.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          bar.address.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  selectBar(bar: Bar) {
    this.raid.bar = bar;
    this.searchQuery = bar.name;
    this.showBarDropdown = false;
  }

  onBarInputFocus() {
    this.showBarDropdown = true;
    this.filterBars();
  }

  onBarInputBlur() {
    // Delay to allow click on dropdown item
    setTimeout(() => {
      this.showBarDropdown = false;
    }, 200);
  }

  getThemeIcon(theme: string): string {
    const found = this.themeOptions.find((t) => t.value === theme);
    return found ? found.icon : '🍺';
  }

  isFormValid(): boolean {
    return (
      this.raid.name.trim() !== '' &&
      this.raid.theme !== '' &&
      this.raid.bar !== null &&
      this.raid.description.trim() !== '' &&
      this.raid.date !== '' &&
      this.raid.time !== ''
    );
  }

  organizeRaid() {
    if (!this.isFormValid()) {
      alert(
        'Please fill in all required fields: Raid Name, Theme, Bar, Date/Time, and Description!'
      );
      return;
    }

    // Use selected image or default based on theme
    if (!this.raid.image) {
      this.raid.image = 'races_images/dwarf_m.jpg';
    }

    // Save raid (in production this would go to backend)
    console.log('Raid organized!', this.raid);
    localStorage.setItem('currentRaid', JSON.stringify(this.raid));

    // Show success and navigate
    alert(
      `Raid "${this.raid.name}" successfully organized! Gather your party at ${this.raid.bar?.name}!`
    );
    this.router.navigate(['/']);
  }

  cancel() {
    this.router.navigate(['/']);
  }

  resetForm() {
    this.raid = {
      name: '',
      theme: '',
      image: '',
      bar: null,
      description: '',
      date: '',
      time: '',
    };
    this.searchQuery = '';
    this.setDefaultDateTime();
  }
}
