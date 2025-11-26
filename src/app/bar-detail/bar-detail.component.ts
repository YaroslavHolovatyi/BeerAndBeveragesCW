import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Bar } from '../bar-card/bar-card.component';
import { CommentComponent, Comment } from '../comment/comment.component';

@Component({
  selector: 'app-bar-detail',
  standalone: true,
  imports: [CommonModule, CommentComponent],
  templateUrl: './bar-detail.component.html',
  styleUrl: './bar-detail.component.css',
})
export class BarDetailComponent implements OnInit {
  bar: Bar | null = null;
  ratingImages = ['beer_icon.png', 'wine_icon.png', 'shot_icon.png'];

  comments: Comment[] = [
    {
      id: 1,
      user: 'User',
      userImage: 'races_images/dwarf_m.jpg',
      comment:
        'Great place! Had an amazing time with friends. The atmosphere is wonderful and the drinks are excellent.',
      date: new Date('2024-11-20'),
    },
    {
      id: 2,
      user: 'User',
      userImage: 'races_images/dwarf_m.jpg',
      comment:
        'Nice bar with good service. Would definitely recommend to anyone looking for a good time.',
      date: new Date('2024-11-18'),
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // TODO: Get bar ID from route and fetch bar data
    const barId = this.route.snapshot.paramMap.get('id');
    console.log('Bar ID:', barId);

    // Sample bar data - replace with actual data fetching
    this.bar = {
      id: parseInt(barId || '1'),
      name: 'Bar 1',
      address: '123 Main Street, Kyiv, Ukraine',
      description:
        'A cozy bar with great atmosphere and excellent drinks. Perfect place for evening gatherings with friends. Enjoy our wide selection of beverages and friendly service.',
      phone: '+380 44 123 4567',
      rating: 4.5,
      priceLevel: 'average',
      imageUrl: 'races_images/dwarf_m.jpg',
      isLiked: false,
    };
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
    if (this.bar) {
      this.bar.isLiked = !this.bar.isLiked;
      console.log('Like toggled:', this.bar.isLiked);
    }
  }
}
