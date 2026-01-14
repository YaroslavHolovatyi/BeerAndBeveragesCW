import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import * as PartyActions from '../store/party.actions';
import { DungeonParty } from '../store/party.actions';
import { selectCurrentParty } from '../store/party.selectors';

Chart.register(...registerables);

interface Friend {
  id: number;
  firstName: string;
  lastName: string;
  nickname?: string;
  profileImage?: string;
  race?: string;
  selected?: boolean;
  favoriteAlcohol?: string;
  color?: string;
}

@Component({
  selector: 'app-summon-party',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './summon-party.component.html',
  styleUrl: './summon-party.component.css',
})
export class SummonPartyComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('alcoholChart') alcoholChartCanvas!: ElementRef<HTMLCanvasElement>;

  partyName = '';
  selectedTime = '';
  currentParty$: Observable<DungeonParty | null>;
  alcoholChart: Chart | null = null;

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
      favoriteAlcohol: 'Dark Beer',
      color: '#8B4513',
    },
    {
      id: 2,
      firstName: 'Legolas',
      lastName: 'Greenleaf',
      nickname: 'ElfArcher',
      profileImage: 'races_images/elf_m.jpg',
      race: 'Elf',
      selected: false,
      favoriteAlcohol: 'Wine',
      color: '#9C27B0',
    },
    {
      id: 3,
      firstName: 'Gimli',
      lastName: 'Son of Glóin',
      nickname: 'AxeMaster',
      profileImage: 'races_images/dwarf_m.jpg',
      race: 'Dwarf',
      selected: false,
      favoriteAlcohol: 'Ale',
      color: '#FF9800',
    },
    {
      id: 4,
      firstName: 'Aragorn',
      lastName: 'Elessar',
      nickname: 'Strider',
      profileImage: 'races_images/human_m.jpg',
      race: 'Human',
      selected: false,
      favoriteAlcohol: 'Whiskey',
      color: '#D4AF37',
    },
    {
      id: 5,
      firstName: 'Gandalf',
      lastName: 'the Grey',
      nickname: 'Wizard',
      profileImage: 'races_images/human_m.jpg',
      race: 'Human',
      selected: false,
      favoriteAlcohol: 'Mead',
      color: '#4CAF50',
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

  ngAfterViewInit() {
    // Chart will be initialized when first friend is selected
  }

  ngOnDestroy() {
    if (this.alcoholChart) {
      this.alcoholChart.destroy();
    }
  }

  initializeChart() {
    if (!this.alcoholChartCanvas || !this.alcoholChartCanvas.nativeElement) {
      console.warn('Chart canvas not available yet');
      return;
    }

    const ctx = this.alcoholChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'radar',
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 5,
            min: 0,
            ticks: {
              stepSize: 1,
              color: '#fff',
              backdropColor: 'transparent',
              font: {
                size: 12,
                weight: 'bold',
              },
            },
            grid: {
              color: 'rgba(212, 175, 55, 0.3)',
              lineWidth: 2,
            },
            angleLines: {
              color: 'rgba(212, 175, 55, 0.3)',
              lineWidth: 2,
            },
            pointLabels: {
              color: '#fff',
              font: {
                size: 14,
                weight: 'bold',
              },
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#fff',
              font: {
                size: 14,
                weight: 'bold',
              },
              padding: 15,
              boxWidth: 20,
              boxHeight: 20,
            },
          },
          title: {
            display: true,
            text: 'Party Beverage Preferences',
            color: '#d4af37',
            font: {
              size: 20,
              weight: 'bold',
            },
            padding: {
              top: 10,
              bottom: 20,
            },
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#d4af37',
            bodyColor: '#fff',
            borderColor: '#d4af37',
            borderWidth: 2,
            padding: 12,
            displayColors: true,
            callbacks: {
              label: function (context) {
                return context.dataset.label + ': ' + context.parsed.r;
              },
            },
          },
        },
      },
    };

    this.alcoholChart = new Chart(ctx, config);
    this.populateChartData();
  }

  updateChart() {
    const selectedFriends = this.getSelectedFriends();

    if (selectedFriends.length === 0) {
      if (this.alcoholChart) {
        this.alcoholChart.data.labels = [];
        this.alcoholChart.data.datasets = [];
        this.alcoholChart.update();
      }
      return;
    }

    // Initialize chart if not already initialized and canvas is available
    if (!this.alcoholChart) {
      setTimeout(() => {
        this.initializeChart();
      }, 100);
      return;
    }

    this.populateChartData();
  }

  populateChartData() {
    if (!this.alcoholChart) return;

    const selectedFriends = this.getSelectedFriends();

    if (selectedFriends.length === 0) {
      this.alcoholChart.data.labels = [];
      this.alcoholChart.data.datasets = [];
      this.alcoholChart.update();
      return;
    }

    // Core beverage types to always show for proper radar shape
    const coreBeverages = ['Wine', 'Ale', 'Dark Beer', 'Whiskey', 'Mead'];

    // Count preferences for each beverage type
    const beverageCounts: { [key: string]: number } = {};
    coreBeverages.forEach((bev) => (beverageCounts[bev] = 0));

    // Add selected friends' beverages if not in core list
    selectedFriends.forEach((friend) => {
      const alcohol = friend.favoriteAlcohol || 'Unknown';
      if (!beverageCounts.hasOwnProperty(alcohol)) {
        beverageCounts[alcohol] = 0;
      }
      beverageCounts[alcohol]++;
    });

    // Get all beverage labels (core + any extras from friends)
    const beverageLabels = Object.keys(beverageCounts);

    this.alcoholChart.data.labels = beverageLabels;

    // Create a dataset for each friend
    this.alcoholChart.data.datasets = selectedFriends.map((friend) => ({
      label: friend.firstName,
      data: beverageLabels.map((beverage) => (friend.favoriteAlcohol === beverage ? 1 : 0)),
      backgroundColor: friend.color ? friend.color + '40' : 'rgba(153, 153, 153, 0.4)',
      borderColor: friend.color || '#999',
      borderWidth: 3,
      pointBackgroundColor: friend.color || '#999',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: friend.color || '#999',
      pointRadius: 5,
      pointHoverRadius: 7,
    }));

    this.alcoholChart.update();
  }

  toggleFriendSelection(friend: Friend) {
    friend.selected = !friend.selected;
    this.updateChart();
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
    this.updateChart();
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
