import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
  MatError,
} from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  UserRegister,
  RegisterResponse,
  UserDetails,
  UserUpdate,
} from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth-service/auth.service';
import { MyErrorStateMatcher } from '../login/login.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatIcon,
    MatSuffix,
    NgIf,
    MatError,
    MatButtonModule,
    MatProgressBar,
    MatIconModule,
    FooterComponent,
    RouterOutlet,
    MatSlideToggleModule,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  userForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  changePassword: boolean = false;

  user: UserDetails = {};
  userId: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initUserForm();
    this.loadUserDetails();
  }

  initUserForm() {
    this.userForm = new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
        currentPassword: new FormControl('', [
          Validators.minLength(8),
          Validators.maxLength(128),
        ]),
        newPassword: new FormControl('', [
          Validators.minLength(8),
          Validators.maxLength(128),
        ]),
        repeatedNewPassword: new FormControl('', [
          Validators.minLength(8),
          Validators.maxLength(128),
        ]),
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  loadUserDetails(): void {
    this.authService
      .getCurrentUserId()
      .pipe(
        tap((userId: string) => this.userId = userId),
        switchMap(
          (userId: string): Observable<UserDetails> =>
            this.authService.fetchUserById(userId)
        )
      )
      .subscribe((user: UserDetails) => {
        this.user = user;
        this.userForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        });
      });
  }

  submit() {
    console.log(this.userForm.value);

    const user: UserUpdate = {
      id: this.userId,
      ...this.userForm.value,
    };

    if (this.userForm.valid) {
      this.authService.updateUser(user).subscribe({
        next: (data: RegisterResponse) => {
          this.snackBar.open('User updated successfully ✅', 'Close', {
            duration: 5000,
            politeness: 'assertive',
          });
          this.loadUserDetails();
          this.userForm.patchValue({
            currentPassword: '',
            newPassword: '',
            repeatedNewPassword: '',
          });
        },
        error: (error: any) => {
          const errorMsg: string = error.error.detail;
          if (error.status === 400) {
            if (errorMsg.includes('User with this email already exists')) {
              this.snackBar.open('Email is already taken! ❌', 'Close', {
                duration: 5000,
                politeness: 'assertive',
              });
            } else if (errorMsg.includes('Invalid current password')) {
              this.snackBar.open('Invalid current password! ❌', 'Close', {
                duration: 5000,
                politeness: 'assertive',
              });
            }
            return;
          } else {
            this.snackBar.open(
              'An error occurred while registering the user ❌',
              'Close',
              {
                duration: 5000,
                politeness: 'assertive',
              }
            );
          }
        },
      });
    }
  }

  passwordsMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const newPassword = formGroup.get('newPassword')?.value;
    const repeatedNewPassword = formGroup.get('repeatedNewPassword')?.value;
    if (
      newPassword &&
      repeatedNewPassword &&
      newPassword !== repeatedNewPassword
    ) {
      return { passwordsDontMatch: true };
    }
    return null;
  }

  createCompareValidator(
    controlOne: AbstractControl,
    controlTwo: AbstractControl
  ) {
    return () => {
      if (controlOne.value !== controlTwo.value) return { match_error: true };
      return null;
    };
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  toggleChangePassword() {
    this.changePassword = !this.changePassword;
    this.userForm.patchValue({
      newPassword: '',
      newRepeatedPassword: '',
    });
  }
}
