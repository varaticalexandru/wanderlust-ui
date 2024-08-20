import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
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
=======
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { UserLogin } from '../../models/user-login.model';
import { MatDialog } from '@angular/material/dialog';
import { FailedAuthComponent } from './failed-auth/failed-auth.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';
import { CommonModule, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { MatCard, MatCardTitle, MatCardContent, MatCardFooter } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatCard,
        MatCardTitle,
        MatCardContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatIcon,
        MatSuffix,
        NgIf,
        MatError,
        MatButton,
        MatCardFooter,
        MatProgressBar,
    ],
})
export class LoginComponent implements OnInit {

>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
  hide: boolean = true;
  loginForm!: FormGroup;
  user!: UserLogin;
  error: boolean = false;
  isLoading: boolean = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
<<<<<<< HEAD
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      if (loggedIn) {
        this.router.navigate(['itineraries']);
      }
    });
=======
    private loginService: LoginService,
    private dialog: MatDialog,
  ) {

>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
<<<<<<< HEAD
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
=======
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
    });
  }

  submit() {
    this.isLoading = true;

    if (this.loginForm.valid) {
      this.user = this.loginForm.value;
<<<<<<< HEAD
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
=======
      this.loginService.login(this.user).subscribe(
        (data: boolean) => {

          this.isLoading = false;

          if (data) {
            this.router.navigate(['/preferences/destination']);
          }
          else {
            this.error = true;
            this.dialog.open(FailedAuthComponent);
          }
        }
      );
    }
  }
}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
