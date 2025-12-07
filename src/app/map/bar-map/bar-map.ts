import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { City, cities } from '../../shared/cities';

@Component({
  selector: 'app-bar-map',
  imports: [CommonModule],
  templateUrl: './bar-map.html',
  styleUrl: './bar-map.css',
})
export class BarMap implements OnChanges {
  cities: City[] = cities;
  selectedCity: City | null = null;
  @Input() initialCity: City | null = null;
  @Output() citySelected = new EventEmitter<City>();

  constructor() {
    this.getIconForCity();
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
      city.icon = `/cities_icons/${city.id}_icon.png`;
    });
  }
}
