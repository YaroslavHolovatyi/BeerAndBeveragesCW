import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BarService } from '../services/bar.service';
import { BarDetails } from '../models/bar-details.model';

@Component({
  selector: 'app-bar-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bar-page.component.html',
  styleUrl: './bar-page.component.css',
})
export class BarPageComponent implements OnInit {
  bar: BarDetails | null = null;
  isLoading = true;
  notFound = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private barService: BarService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.loadBar(slug);
      } else {
        this.notFound = true;
        this.isLoading = false;
      }
    });
  }

  loadBar(slug: string): void {
    this.isLoading = true;
    this.notFound = false;
    this.errorMessage = '';

    this.barService.getBarBySlug(slug).subscribe({
      next: (bar) => {
        this.bar = bar;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading bar:', error);
        if (error.status === 404) {
          this.notFound = true;
        } else {
          this.errorMessage = 'Failed to load bar details. Please try again.';
        }
        this.isLoading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/bars']);
  }

  getPriceLevelSymbol(level: number): string {
    return '$'.repeat(level);
  }

  getRatingStars(rating: number): string {
    return '★'.repeat(Math.round(rating));
  }

  openWebsite(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  callPhone(phone: string): void {
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  }
}
