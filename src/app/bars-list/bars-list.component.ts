import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarCardComponent, Bar } from '../bar-card/bar-card.component';
import { CitySelectorModalComponent } from '../map/city-selector-modal/city-selector-modal.component';
import { City } from '../shared/cities';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-bars-list',
  standalone: true,
  imports: [CommonModule, FormsModule, BarCardComponent, CitySelectorModalComponent],
  templateUrl: './bars-list.component.html',
  styleUrl: './bars-list.component.css',
})
export class BarsListComponent implements OnInit {
  cities: City[] = [];
  cityNames: string[] = [];

  selectedCity = '';
  selectedCityObj: City | null = null;
  filteredCities: string[] = [];
  showCityDropdown = false;
  showCityModal = false;

  constructor(private cityService: CityService) {}

  ngOnInit() {
    // Load cities from backend
    this.cityService.getCities().subscribe((cities) => {
      this.cities = cities;
      this.cityNames = cities.map((city) => city.name);
    });
  }

  drinkTypes = {
    beer: false,
    wine: false,
    shots: false,
    drinks: false,
  };

  bars: Bar[] = [
    {
      id: 1,
      name: "The Dragon's Tavern",
      address: '123 Castle Street, Kyiv, Ukraine',
      description:
        'A legendary tavern known for its extensive collection of rare ales and mystical atmosphere. Perfect for adventurers seeking tales and drinks.',
      phone: '+380 44 123 4567',
      rating: 4.8,
      priceLevel: 'very-high',
      imageUrl: 'races_images/dwarf_m.jpg',
      isLiked: false,
    },
    {
      id: 2,
      name: 'The Merry Knight',
      address: '456 Market Square, Lviv, Ukraine',
      description:
        'A cozy neighborhood bar with friendly staff and great music. Popular spot for locals and tourists alike.',
      phone: '+380 32 234 5678',
      rating: 4.2,
      priceLevel: 'average',
      imageUrl: 'races_images/dwarf_m.jpg',
      isLiked: false,
    },
    {
      id: 3,
      name: "Beginner's Luck Pub",
      address: '789 Harbor Road, Odesa, Ukraine',
      description:
        'Budget-friendly pub with a relaxed vibe. Great place for students and those starting their pub crawl journey.',
      phone: '+380 48 345 6789',
      rating: 3.9,
      priceLevel: 'low',
      imageUrl: 'races_images/dwarf_m.jpg',
      isLiked: false,
    },
    {
      id: 4,
      name: 'The Golden Chalice',
      address: '321 Cathedral Avenue, Kharkiv, Ukraine',
      description:
        'Upscale wine bar with an extensive selection of local and international wines. Elegant atmosphere for special occasions.',
      phone: '+380 57 456 7890',
      rating: 4.6,
      priceLevel: 'high',
      imageUrl: 'races_images/dwarf_m.jpg',
      isLiked: false,
    },
    {
      id: 5,
      name: "Warrior's Rest",
      address: '555 Victory Street, Dnipro, Ukraine',
      description:
        'Traditional pub serving hearty meals and strong drinks. Known for its welcoming atmosphere and live entertainment.',
      phone: '+380 56 567 8901',
      rating: 4.3,
      priceLevel: 'average',
      imageUrl: 'races_images/dwarf_m.jpg',
      isLiked: false,
    },
  ];

  onCityInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.selectedCity = input;

    if (input.length > 0) {
      this.filteredCities = this.cityNames.filter((city) =>
        city.toLowerCase().includes(input.toLowerCase())
      );
      this.showCityDropdown = this.filteredCities.length > 0;
    } else {
      this.filteredCities = [];
      this.showCityDropdown = false;
    }
  }

  selectCity(city: string) {
    this.selectedCity = city;
    this.showCityDropdown = false;
    this.applyFilters();
  }

  openCityModal() {
    this.showCityModal = true;
  }

  onCityConfirmed(city: City) {
    this.selectedCityObj = city;
    this.selectedCity = city.name;
    this.showCityModal = false;
    this.applyFilters();
  }

  onModalClosed() {
    this.showCityModal = false;
  }

  onDrinkTypeChange() {
    this.applyFilters();
  }

  applyFilters() {
    console.log('Filters applied:', {
      city: this.selectedCity,
      drinkTypes: this.drinkTypes,
    });
    // TODO: Implement actual filtering logic
  }

  clearFilters() {
    this.selectedCity = '';
    this.selectedCityObj = null;
    this.drinkTypes = {
      beer: false,
      wine: false,
      shots: false,
      drinks: false,
    };
    this.applyFilters();
  }
}
