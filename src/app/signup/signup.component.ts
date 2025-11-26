import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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
  errorMessage = '';

  ukrainianCities = [
    'Kyiv',
    'Kharkiv',
    'Odesa',
    'Dnipro',
    'Donetsk',
    'Zaporizhzhia',
    'Lviv',
    'Kryvyi Rih',
    'Mykolaiv',
    'Mariupol',
    'Luhansk',
    'Vinnytsia',
    'Simferopol',
    'Sevastopol',
    'Makiivka',
    'Kherson',
    'Poltava',
    'Chernihiv',
    'Cherkasy',
    'Zhytomyr',
    'Sumy',
    'Khmelnytskyi',
    'Chernivtsi',
    'Rivne',
    'Kamianske',
    'Kropyvnytskyi',
    'Ivano-Frankivsk',
    'Kremenchuk',
    'Ternopil',
    'Lutsk',
    'Bila Tserkva',
    'Uzhhorod',
  ];

  filteredCities: string[] = [];
  showCityDropdown = false;

  constructor(private router: Router) {}

  onCityInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.mainCity = input;

    if (input.length > 0) {
      this.filteredCities = this.ukrainianCities.filter((city) =>
        city.toLowerCase().includes(input.toLowerCase())
      );
      this.showCityDropdown = this.filteredCities.length > 0;
    } else {
      this.filteredCities = [];
      this.showCityDropdown = false;
    }
  }

  selectCity(city: string) {
    this.mainCity = city;
    this.showCityDropdown = false;
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

    // TODO: Implement actual signup logic
    console.log('Signup attempt:', {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      mainCity: this.mainCity,
    });

    // Navigate to questionnaire after successful signup
    this.router.navigate(['/questionnaire']);
  }
}
