import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LikedBar {
  id: number;
  name: string;
  address: string;
  city?: string;
  description?: string;
  phone?: string;
  rating?: number;
  priceLevel?: string;
  imageUrl: string;
  workHours?: string;
  timesVisited?: number;
  likedAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class LikedBarsService {
  private readonly STORAGE_KEY = 'likedBars';
  private likedBarsSubject = new BehaviorSubject<LikedBar[]>([]);
  public likedBars$ = this.likedBarsSubject.asObservable();

  constructor() {
    this.loadLikedBars();
  }

  private loadLikedBars(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const bars = JSON.parse(stored);
        this.likedBarsSubject.next(bars);
      } catch (error) {
        console.error('Error loading liked bars:', error);
        this.likedBarsSubject.next([]);
      }
    }
  }

  private saveLikedBars(bars: LikedBar[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bars));
    this.likedBarsSubject.next(bars);
  }

  getLikedBars(): LikedBar[] {
    return this.likedBarsSubject.value;
  }

  isBarLiked(barId: number): boolean {
    return this.likedBarsSubject.value.some((bar) => bar.id === barId);
  }

  toggleLike(
    bar: Partial<LikedBar> & { id: number; name: string; imageUrl: string; address: string }
  ): boolean {
    const currentBars = this.getLikedBars();
    const index = currentBars.findIndex((b) => b.id === bar.id);

    if (index > -1) {
      // Bar is already liked, remove it
      currentBars.splice(index, 1);
      this.saveLikedBars(currentBars);
      return false;
    } else {
      // Bar is not liked, add it
      const newLikedBar: LikedBar = {
        id: bar.id,
        name: bar.name,
        address: bar.address,
        city: bar.city,
        description: bar.description,
        phone: bar.phone,
        rating: bar.rating,
        priceLevel: bar.priceLevel,
        imageUrl: bar.imageUrl,
        workHours: bar.workHours,
        timesVisited: bar.timesVisited || 0,
        likedAt: new Date(),
      };
      currentBars.unshift(newLikedBar);
      this.saveLikedBars(currentBars);
      return true;
    }
  }

  removeBar(barId: number): void {
    const currentBars = this.getLikedBars();
    const filtered = currentBars.filter((bar) => bar.id !== barId);
    this.saveLikedBars(filtered);
  }

  clearAllLikedBars(): void {
    this.saveLikedBars([]);
  }

  getLikedBarCount(): number {
    return this.likedBarsSubject.value.length;
  }
}
