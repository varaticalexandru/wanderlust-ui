import { Component, OnInit } from '@angular/core';
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

  hide: boolean = true;
  loginForm!: FormGroup;
  user!: UserLogin;
  error: boolean = false;
  isLoading: boolean = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private loginService: LoginService,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  submit() {
    this.isLoading = true;

    if (this.loginForm.valid) {
      this.user = this.loginForm.value;
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