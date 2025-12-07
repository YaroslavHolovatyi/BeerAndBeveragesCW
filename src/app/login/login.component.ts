import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(private router: Router, private authService: AuthService) {}

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        console.log('Login successful:', user.email);
        this.isLoading = false;
        // Navigate to profile page after successful login
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Login failed. Please check your credentials.';
        this.isLoading = false;
      },
    });
  }

  onForgotPassword() {
    // TODO: Implement forgot password functionality
    console.log('Forgot password for:', this.email);
    alert('Password reset link would be sent to: ' + this.email);
  }
}
