import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BarService } from '../services/bar.service';
import { BarListItem, BarFilters } from '../models/bar-list-item.model';

@Component({
  selector: 'app-bars-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './bars-page.component.html',
  styleUrl: './bars-page.component.css',
})
export class BarsPageComponent implements OnInit {
  bars: BarListItem[] = [];
  isLoading = false;
  errorMessage = '';

  // Filters
  searchQuery = '';
  selectedCityId?: number;
  selectedPriceLevel?: number;
  minRating?: number;

  // Pagination
  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  pageSize = 20;

  // Sorting
  sortBy: 'rating' | 'name' | 'priceLevel' = 'rating';
  sortDir: 'ASC' | 'DESC' = 'DESC';

  constructor(private barService: BarService, private router: Router) {}

  ngOnInit(): void {
    this.loadBars();
  }

  loadBars(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const filters: BarFilters = {
      page: this.currentPage,
      size: this.pageSize,
      sortBy: this.sortBy,
      sortDir: this.sortDir,
    };

    if (this.searchQuery) {
      filters.q = this.searchQuery;
    }
    if (this.selectedCityId) {
      filters.cityId = this.selectedCityId;
    }
    if (this.selectedPriceLevel) {
      filters.priceLevel = this.selectedPriceLevel;
    }
    if (this.minRating) {
      filters.minRating = this.minRating;
    }

    this.barService.getBars(filters).subscribe({
      next: (response) => {
        this.bars = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.currentPage = response.number;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading bars:', error);
        this.errorMessage = 'Failed to load bars. Please try again.';
        this.isLoading = false;
      },
    });
  }

  onSearch(): void {
    this.currentPage = 0;
    this.loadBars();
  }

  onFilterChange(): void {
    this.currentPage = 0;
    this.loadBars();
  }

  onSortChange(): void {
    this.loadBars();
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadBars();
    }
  }

  viewBar(slug: string): void {
    this.router.navigate(['/bars', slug]);
  }

  getPriceLevelSymbol(level: number): string {
    return '$'.repeat(level);
  }

  getRatingStars(rating: number): string {
    return '★'.repeat(Math.round(rating));
  }
}
