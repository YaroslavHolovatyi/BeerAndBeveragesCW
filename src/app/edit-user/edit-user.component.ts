import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil, forkJoin } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CityService } from '../services/city.service';
import { UserService, UpdateProfileRequest, ChangePasswordRequest } from '../services/user.service';
import { User } from '../user-profile/user-profile.component';
import { City } from '../shared/cities';
import { CitySelectorModalComponent } from '../map/city-selector-modal/city-selector-modal.component';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, CitySelectorModalComponent],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnInit, OnDestroy {
  editForm!: FormGroup;
  passwordForm!: FormGroup;
  user: User | null = null;
  cities: City[] = [];
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  showPasswordSection = false;
  showCityModal = false;
  selectedCityObj: City | null = null;
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  isSubmitting = false;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cityService: CityService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.errorMessage = '';

    // Initialize empty forms first to prevent template errors
    this.initializeEmptyForms();

    // Load cities and current user from backend
    forkJoin({
      user: this.userService.getCurrentUser(),
      cities: this.cityService.getCities(),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ user, cities }) => {
          this.cities = cities;

          // Map backend UserResponse to frontend User type
          this.user = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            nickname: user.username,
            mainCity: user.mainCity,
            profileImage: user.avatarUrl,
            race: user.race,
            gender: user.gender,
          };

          // Set selected city object
          this.selectedCityObj = cities.find((c) => c.id === user.mainCity.id) || null;

          // Initialize forms with loaded data
          this.initializeForm();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading user data:', error);
          this.errorMessage = error.message || 'Failed to load user data. Please login.';
          this.isLoading = false;

          // If unauthorized, redirect to login immediately
          if (error.message?.includes('Unauthorized') || error.message?.includes('401')) {
            this.router.navigate(['/login']);
          }
        },
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializeEmptyForms() {
    // Initialize empty forms to prevent template errors
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mainCityId: [null, [Validators.required]],
    });

    this.passwordForm = this.fb.group(
      {
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  initializeForm() {
    if (!this.user) return;

    // Match backend DTO fields exactly
    this.editForm = this.fb.group({
      firstName: [this.user.firstName, [Validators.required, Validators.minLength(2)]],
      lastName: [this.user.lastName || '', [Validators.minLength(2)]],
      username: [this.user.nickname || '', [Validators.required, Validators.minLength(3)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      mainCityId: [this.user.mainCity.id, [Validators.required]],
    });

    this.passwordForm = this.fb.group(
      {
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (!newPassword || !confirmPassword) {
      return null;
    }

    return newPassword.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      // Create preview
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  removeSelectedFile() {
    this.selectedFile = null;
    this.previewUrl = null;
  }

  togglePasswordSection() {
    this.showPasswordSection = !this.showPasswordSection;
    if (!this.showPasswordSection) {
      this.passwordForm.reset();
    }
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.editForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      this.markFormGroupTouched(this.editForm);
      return;
    }

    if (this.showPasswordSection && this.passwordForm.invalid) {
      this.errorMessage = 'Please check your password fields.';
      this.markFormGroupTouched(this.passwordForm);
      return;
    }

    if (!this.user) return;

    this.isSubmitting = true;

    // Step 1: Upload avatar if selected
    if (this.selectedFile) {
      this.uploadAvatarAndContinue();
    } else {
      this.updateProfileData();
    }
  }

  private uploadAvatarAndContinue() {
    if (!this.selectedFile) return;

    this.userService
      .uploadAvatar(this.selectedFile)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedUser) => {
          console.log('Avatar uploaded successfully');
          // Update local user reference
          this.user!.profileImage = updatedUser.avatarUrl;
          this.selectedFile = null;
          this.previewUrl = null;

          // Continue with profile update
          this.updateProfileData();
        },
        error: (error) => {
          console.error('Avatar upload error:', error);
          this.errorMessage = error.message || 'Failed to upload avatar';
          this.isSubmitting = false;
        },
      });
  }

  private updateProfileData() {
    const profileData: UpdateProfileRequest = {
      firstName: this.editForm.value.firstName,
      lastName: this.editForm.value.lastName,
      username: this.editForm.value.username,
      email: this.editForm.value.email,
      mainCityId: this.editForm.value.mainCityId,
    };

    this.userService
      .updateProfile(profileData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedUser) => {
          console.log('Profile updated successfully');

          // Update local user
          this.user = {
            ...this.user!,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            nickname: updatedUser.username,
            email: updatedUser.email,
            mainCity: updatedUser.mainCity,
          };

          // If password change is requested, handle it
          if (this.showPasswordSection && this.passwordForm.valid) {
            this.changePasswordAndFinish();
          } else {
            this.finishUpdate();
          }
        },
        error: (error) => {
          console.error('Profile update error:', error);
          this.errorMessage = error.message || 'Failed to update profile';
          this.isSubmitting = false;
        },
      });
  }

  private changePasswordAndFinish() {
    const passwordData: ChangePasswordRequest = {
      oldPassword: this.passwordForm.value.oldPassword,
      newPassword: this.passwordForm.value.newPassword,
      confirmPassword: this.passwordForm.value.confirmPassword,
    };

    this.userService
      .changePassword(passwordData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          console.log('Password changed successfully');
          this.passwordForm.reset();
          this.showPasswordSection = false;
          this.finishUpdate();
        },
        error: (error) => {
          console.error('Password change error:', error);
          this.errorMessage = error.message || 'Failed to change password';
          this.isSubmitting = false;
        },
      });
  }

  private finishUpdate() {
    this.isSubmitting = false;
    this.successMessage = 'Profile updated successfully!';

    setTimeout(() => {
      this.router.navigate(['/profile']);
    }, 1500);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  cancel() {
    this.router.navigate(['/profile']);
  }

  getDisplayName(): string {
    if (!this.user) return '';
    return this.user.nickname || `${this.user.firstName} ${this.user.lastName || ''}`.trim();
  }

  getCurrentAvatarUrl(): string {
    // If user has profile image, return it
    if (this.user?.profileImage) {
      return this.user.profileImage;
    }

    // Otherwise, build race image path based on race and gender
    return this.getRaceImageUrl();
  }

  private getRaceImageUrl(): string {
    if (!this.user?.race || !this.user?.gender) {
      return 'races_images/human_m.jpg'; // default fallback
    }

    // Normalize race name to lowercase and replace spaces with hyphens
    const raceName = this.user.race.toLowerCase().replace(/\s+/g, '-');
    
    // Map gender values to file suffix (f for female, m for male)
    let genderSuffix = 'm'; // default to male
    if (this.user.gender.toLowerCase() === 'heroine' || this.user.gender.toLowerCase() === 'female' || this.user.gender.toLowerCase() === 'f') {
      genderSuffix = 'f';
    } else if (this.user.gender.toLowerCase() === 'hero' || this.user.gender.toLowerCase() === 'male' || this.user.gender.toLowerCase() === 'm') {
      genderSuffix = 'm';
    }

    return `races_images/${raceName}_${genderSuffix}.jpg`;
  }

  getSelectedCityName(): string {
    if (this.selectedCityObj) {
      return this.selectedCityObj.name;
    }
    const cityId = this.editForm?.value.mainCityId;
    const city = this.cities.find((c) => c.id === cityId);
    return city?.name || 'Select a city';
  }

  openCitySelector() {
    this.showCityModal = true;
  }

  onCityConfirmed(city: City) {
    if (!city.id) return;

    this.selectedCityObj = city;
    this.editForm.patchValue({
      mainCityId: city.id,
    });
    this.showCityModal = false;
  }

  onModalClosed() {
    this.showCityModal = false;
  }
}
