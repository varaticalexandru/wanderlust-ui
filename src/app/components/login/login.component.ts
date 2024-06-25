import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressBar } from '@angular/material/progress-bar';
import { CommonModule, NgIf } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
  MatError,
} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserLogin } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth-service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
  ],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  loginForm!: FormGroup;
  user!: UserLogin;
  error: boolean = false;
  isLoading: boolean = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      if (loggedIn) {
        this.router.navigate(['itineraries']);
      }
    });
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
      ]),
    });
  }

  submit() {
    this.isLoading = true;

    if (this.loginForm.valid) {
      this.user = this.loginForm.value;
      this.authService.login(this.user);
    }

    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoading = false;

      if (loggedIn) {
        this.snackBar.open('Logged in successful ✅', 'Close', {
          duration: 5000,
          politeness: 'assertive',
        });
      }
    });
  }

  handleRegisterClick() {
    this.router.navigate(['register']);
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
