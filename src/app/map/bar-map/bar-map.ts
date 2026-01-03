import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { City } from '../../shared/cities';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-bar-map',
  imports: [CommonModule],
  templateUrl: './bar-map.html',
  styleUrl: './bar-map.css',
})
export class BarMap implements OnInit, OnChanges {
  cities: City[] = [];
  selectedCity: City | null = null;
  @Input() initialCity: City | null = null;
  @Output() citySelected = new EventEmitter<City>();

  constructor(private cityService: CityService) {}

  ngOnInit() {
    // Load cities from backend
    this.cityService.getCities().subscribe((cities) => {
      this.cities = cities;
      this.getIconForCity();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialCity'] && changes['initialCity'].currentValue) {
      this.selectedCity = changes['initialCity'].currentValue;
    }
  }

  onMapClick(e: MouseEvent) {
    const mapElement = e.currentTarget as HTMLElement;
    const rect = mapElement.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    console.log(`X: ${x.toFixed(2)}%, Y: ${y.toFixed(2)}%`);
  }

  onCityClick(city: City, event: MouseEvent) {
    event.stopPropagation();
    this.selectedCity = city;
    this.citySelected.emit(city);
    console.log('Selected city:', city.name);
  }

  getIconForCity() {
    this.cities.forEach((city) => {
      city.icon = `/cities_icons/${city.slug}_icon.png`;
    });
  }
}
