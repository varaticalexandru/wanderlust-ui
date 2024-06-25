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
import { FooterComponent } from '../../footer/footer.component';
import { repeat } from 'rxjs';
import { MyErrorStateMatcher } from '../login.component';
import { Router, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth-service/auth.service';
import { RegisterResponse, UserRegister } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-register',
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
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  registerForm!: FormGroup;
  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm() {
    this.registerForm = new FormGroup(
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
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(128),
        ]),
        repeatedPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(128),
        ]),
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  submit() {
    console.log(this.registerForm.value);

    const user: UserRegister = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    };

    if (this.registerForm.valid) {
      this.authService.registerUser(this.registerForm.value).subscribe({
        next: (data: RegisterResponse) => {
          this.snackBar.open('User registered successfully ✅', 'Close', {
            duration: 5000,
            politeness: 'assertive',
          });
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          const errorMsg: string = error.error.detail;
          if (
            error.status === 400 &&
            errorMsg.includes('User with this email already exists')
          ) {
            this.snackBar.open('Email is already taken! ❌', 'Close', {
              duration: 5000,
              politeness: 'assertive',
            });
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

  submit2() {
    if (this.registerForm.valid) {
      this.snackBar.open('User registered successfully ✅', 'Close', {
        duration: 5000,
        politeness: 'assertive',
      });
      this.router.navigate(['/login']);
    }
  }

  passwordsMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const repeatedPassword = formGroup.get('repeatedPassword')?.value;
    if (password && repeatedPassword && password !== repeatedPassword) {
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
}
