import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarMap } from '../bar-map/bar-map';
import { City } from '../../shared/cities';

@Component({
  selector: 'app-city-selector-modal',
  standalone: true,
  imports: [CommonModule, BarMap],
  templateUrl: './city-selector-modal.component.html',
  styleUrl: './city-selector-modal.component.css',
})
export class CitySelectorModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Select Your City';
  @Input() initialCity: City | null = null;
  @Output() cityConfirmed = new EventEmitter<City>();
  @Output() modalClosed = new EventEmitter<void>();

  selectedCity: City | null = null;

  ngOnInit() {
    this.selectedCity = this.initialCity;
  }

  onCitySelected(city: City) {
    this.selectedCity = city;
  }

  confirmSelection() {
    if (this.selectedCity) {
      this.cityConfirmed.emit(this.selectedCity);
      this.close();
    }
  }

  close() {
    this.isOpen = false;
    this.modalClosed.emit();
  }
}
