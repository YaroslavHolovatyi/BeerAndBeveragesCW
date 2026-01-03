import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { City, RegisterRequest } from '../shared/cities';
import { AuthService } from '../services/auth.service';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  email = '';
  password = '';
  confirmPassword = '';
  firstName = '';
  lastName = '';
  selectedCityId: number | null = null;
  cities: City[] = [];
  errorMessage = '';
  isLoading = false;
  isLoadingCities = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cityService: CityService
  ) {}

  ngOnInit() {
    // Load cities from backend on component initialization
    this.loadCities();
  }

  loadCities() {
    this.isLoadingCities = true;
    this.cityService.getCities().subscribe({
      next: (cities) => {
        this.cities = cities;
        this.isLoadingCities = false;
        // Preselect first city if available
        if (cities.length > 0 && cities[0].id) {
          this.selectedCityId = cities[0].id;
        }
      },
      error: (error) => {
        console.error('Failed to load cities:', error);
        this.errorMessage = 'Failed to load cities. Please refresh the page.';
        this.isLoadingCities = false;
      },
    });
  }

  onSignup() {
    // Validation
    if (
      !this.email ||
      !this.password ||
      !this.firstName ||
      !this.lastName ||
      !this.selectedCityId
    ) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Create registration request matching backend contract
    const registerRequest: RegisterRequest = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      mainCityId: this.selectedCityId,
    };

    this.authService.signup(registerRequest).subscribe({
      next: (user) => {
        console.log('Signup successful:', user.email);
        this.isLoading = false;
        // Navigate to questionnaire after successful signup
        this.router.navigate(['/questionnaire']);
      },
      error: (error) => {
        console.error('Signup failed:', error);
        this.errorMessage = error.error?.message || 'Signup failed. Please try again.';
        this.isLoading = false;
      },
    });
  }
}
