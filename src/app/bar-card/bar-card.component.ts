import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LikedBarsService } from '../services/liked-bars.service';

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
export class BarCardComponent implements OnInit {
  bar = input.required<Bar>();

  constructor(private router: Router, private likedBarsService: LikedBarsService) {}

  ngOnInit() {
    // Check if bar is liked on init
    const currentBar = this.bar();
    currentBar.isLiked = this.likedBarsService.isBarLiked(currentBar.id);
  }

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
    const isLiked = this.likedBarsService.toggleLike({
      id: currentBar.id,
      name: currentBar.name,
      address: currentBar.address,
      description: currentBar.description,
      phone: currentBar.phone,
      rating: currentBar.rating,
      priceLevel: currentBar.priceLevel,
      imageUrl: currentBar.imageUrl,
    });
    currentBar.isLiked = isLiked;
  }

  onCardClick() {
    this.router.navigate(['/bar', this.bar().id]);
  }

  onLikeClick(event: Event) {
    event.stopPropagation();
    this.toggleLike();
  }
}
