import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.css',
})
export class AchievementsComponent {
  isLoggedIn = false; // TODO: Connect to actual auth service

  achievements: Achievement[] = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Visit your first pub',
      icon: 'icons/rating_icons/beer_icon.png',
      unlocked: false,
      progress: 0,
      maxProgress: 1,
    },
    {
      id: 2,
      title: 'Social Butterfly',
      description: 'Leave 5 comments',
      icon: 'icons/rating_icons/wine_icon.png',
      unlocked: false,
      progress: 0,
      maxProgress: 5,
    },
    {
      id: 3,
      title: 'Explorer',
      description: 'Visit 10 different pubs',
      icon: 'icons/rating_icons/shot_icon.png',
      unlocked: false,
      progress: 0,
      maxProgress: 10,
    },
    {
      id: 4,
      title: 'Pub Crawler',
      description: 'Visit 25 different pubs',
      icon: 'icons/rating_icons/beer_icon.png',
      unlocked: false,
      progress: 0,
      maxProgress: 25,
    },
    {
      id: 5,
      title: 'Legend',
      description: 'Visit 50 different pubs',
      icon: 'icons/rating_icons/wine_icon.png',
      unlocked: false,
      progress: 0,
      maxProgress: 50,
    },
    {
      id: 6,
      title: 'Critic',
      description: 'Rate 20 pubs',
      icon: 'icons/rating_icons/shot_icon.png',
      unlocked: false,
      progress: 0,
      maxProgress: 20,
    },
  ];

  login() {
    // TODO: Implement actual login functionality
    this.isLoggedIn = true;
  }
}
