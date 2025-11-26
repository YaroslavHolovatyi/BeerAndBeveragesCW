import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface Bar {
  id: number;
  name: string;
  address: string;
  description: string;
  phone: string;
  rating: number;
  priceLevel: 'low' | 'average' | 'high' | 'very-high';
  imageUrl: string;
  isLiked?: boolean;
}

@Component({
  selector: 'app-bar-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bar-card.component.html',
  styleUrl: './bar-card.component.css',
})
export class BarCardComponent {
  bar = input.required<Bar>();

  constructor(private router: Router) {}

  getPriceLevelText(priceLevel: string): string {
    const priceLevelMap: { [key: string]: string } = {
      low: 'Beginner Dungeon',
      average: 'Average Dungeon',
      high: 'Master Dungeon',
      'very-high': 'Dragon Layer',
    };
    return priceLevelMap[priceLevel] || 'Unknown';
  }

  toggleLike() {
    const currentBar = this.bar();
    currentBar.isLiked = !currentBar.isLiked;
    console.log('Like toggled:', currentBar.isLiked);
  }

  onCardClick() {
    this.router.navigate(['/bar', this.bar().id]);
  }

  onLikeClick(event: Event) {
    event.stopPropagation();
    this.toggleLike();
  }
}
