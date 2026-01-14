import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LikedBarsService, LikedBar } from '../services/liked-bars.service';

@Component({
  selector: 'app-liked-bars',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './liked-bars.component.html',
  styleUrl: './liked-bars.component.css',
})
export class LikedBarsComponent implements OnInit, OnDestroy {
  likedBars: LikedBar[] = [];
  filteredBars: LikedBar[] = [];
  searchQuery = '';
  sortBy: 'name' | 'rating' | 'date' = 'date';
  private destroy$ = new Subject<void>();

  constructor(private likedBarsService: LikedBarsService, private router: Router) {}

  ngOnInit() {
    this.likedBarsService.likedBars$.pipe(takeUntil(this.destroy$)).subscribe((bars) => {
      this.likedBars = bars;
      this.applyFiltersAndSort();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyFiltersAndSort() {
    // Filter
    let filtered = [...this.likedBars];
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (bar) =>
          bar.name.toLowerCase().includes(query) ||
          bar.address.toLowerCase().includes(query) ||
          bar.city?.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (this.sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'date':
        filtered.sort((a, b) => new Date(b.likedAt).getTime() - new Date(a.likedAt).getTime());
        break;
    }

    this.filteredBars = filtered;
  }

  onSearchChange() {
    this.applyFiltersAndSort();
  }

  onSortChange() {
    this.applyFiltersAndSort();
  }

  navigateToBar(barId: number) {
    this.router.navigate(['/bar', barId]);
  }

  removeFromLiked(event: Event, barId: number) {
    event.stopPropagation();
    if (confirm('Remove this bar from your liked list?')) {
      this.likedBarsService.removeBar(barId);
    }
  }

  clearAll() {
    if (
      confirm(
        'Are you sure you want to remove all bars from your liked list? This action cannot be undone.'
      )
    ) {
      this.likedBarsService.clearAllLikedBars();
    }
  }

  getStarArray(rating: number | undefined): number[] {
    const stars = Math.round(rating || 0);
    return Array(stars).fill(0);
  }

  getEmptyStarArray(rating: number | undefined): number[] {
    const stars = Math.round(rating || 0);
    return Array(5 - stars).fill(0);
  }

  getPriceLevelText(priceLevel: string | undefined): string {
    if (!priceLevel) return 'Unknown';
    const priceLevelMap: { [key: string]: string } = {
      low: 'Beginner Dungeon',
      average: 'Average Dungeon',
      high: 'Master Dungeon',
      'very-high': 'Dragon Layer',
    };
    return priceLevelMap[priceLevel] || 'Unknown';
  }

  getPriceLevelSymbol(priceLevel: string | undefined): string {
    if (!priceLevel) return '?';
    const symbolMap: { [key: string]: string } = {
      low: '$',
      average: '$$',
      high: '$$$',
      'very-high': '$$$$',
    };
    return symbolMap[priceLevel] || '?';
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}
