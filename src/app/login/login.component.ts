import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private router: Router) {}

  onLogin() {
    // TODO: Implement actual login logic
    if (this.email && this.password) {
      console.log('Login attempt:', { email: this.email, password: '***' });
      // Simulate successful login
      this.router.navigate(['/']);
    } else {
      this.errorMessage = 'Please fill in all fields';
    }
  }

  onForgotPassword() {
    // TODO: Implement forgot password functionality
    console.log('Forgot password for:', this.email);
    alert('Password reset link would be sent to: ' + this.email);
  }
}
