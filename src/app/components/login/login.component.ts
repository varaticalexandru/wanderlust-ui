import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserLogin } from '../../models/user-login';
import { MatDialog } from '@angular/material/dialog';
import { FailedAuthComponent } from './failed-auth/failed-auth.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
          if (data) {
            this.router.navigate(['/preferences/destination']);
          }
          else {
            this.error = true;
            this.isLoading = false;

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