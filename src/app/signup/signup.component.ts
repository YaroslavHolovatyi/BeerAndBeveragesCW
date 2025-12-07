import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CitySelectorModalComponent } from '../map/city-selector-modal/city-selector-modal.component';
import { City } from '../shared/cities';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CitySelectorModalComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  email = '';
  password = '';
  confirmPassword = '';
  firstName = '';
  lastName = '';
  mainCity = '';
  selectedCityObj: City | null = null;
  errorMessage = '';
  showCityModal = false;
  isLoading = false;

  constructor(private router: Router, private authService: AuthService) {}

  openCityModal() {
    this.showCityModal = true;
  }

  onCityConfirmed(city: City) {
    this.selectedCityObj = city;
    this.mainCity = city.name;
    this.showCityModal = false;
  }

  onModalClosed() {
    this.showCityModal = false;
  }

  onSignup() {
    // Validation
    if (!this.email || !this.password || !this.firstName || !this.lastName || !this.mainCity) {
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

    const userData = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      mainCity: this.mainCity,
    };

    this.authService.signup(userData).subscribe({
      next: (user) => {
        console.log('Signup successful:', user.email);
        this.isLoading = false;
        // Navigate to questionnaire after successful signup
        this.router.navigate(['/questionnaire']);
      },
      error: (error) => {
        console.error('Signup failed:', error);
        this.errorMessage = 'Signup failed. Please try again.';
        this.isLoading = false;
      },
    });
  }
}
