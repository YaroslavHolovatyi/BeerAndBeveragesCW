import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarCardComponent, Bar } from '../bar-card/bar-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BarCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
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
}
