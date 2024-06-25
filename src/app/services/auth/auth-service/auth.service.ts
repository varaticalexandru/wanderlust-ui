import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { JwtService } from '../jwt/jwt.service';
import { check } from '@igniteui/material-icons-extended';
import { backend_api, environment } from 'src/environments/environment';
import { FailedAuthComponent } from 'src/app/components/login/failed-auth/failed-auth.component';
import { LogOutComponent } from 'src/app/components/login/log-out/log-out.component';
import { UserLogin, AuthResponse, UserRegister, RegisterResponse, UserDetails } from 'src/app/models/user/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );
  loggedInUserSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>(localStorage.getItem('userId') || '');
  loggedInUserId$ = this.loggedInUserSubject.asObservable();

  auth_uri = `${environment.auth.login_uri}`;
  register_uri = `${environment.auth.register_uri}`;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private dialog: MatDialog,
    private jwtService: JwtService,
    private snackBar: MatSnackBar
  ) {}

  login(user: UserLogin) {
    this.http.post<AuthResponse>(this.auth_uri, user).subscribe({
      next: (data: AuthResponse) => {

        console.log('User logged in: ', data);
        
        
        localStorage.setItem('token', data.jwt);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('userEmail', data.email);
        this.loggedIn.next(true);
        this.loggedInUserSubject.next(data.id);
        this.router.navigate(['/itineraries']);
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
        this.dialog.open(FailedAuthComponent);
      },
    });
  }

  registerUser(user: UserRegister): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.register_uri, user);
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
    this.snackBar.open('You have been logged out ✅', 'Close', {
      duration: 5000,
      politeness: 'assertive'
    });
  }

  checkTokenExpiration() {
    const token = localStorage.getItem('token');
    if (token && this.jwtService.isTokenExpired(token)) {
      this.loggedIn.next(false);
      this.loggedInUserSubject.next('');
      this.logout();
      this.dialog.open(LogOutComponent);
    }
  }

  fetchUserById(userId: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${environment.auth.user_uri}/${userId}`);
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getCurrentUserId(): Observable<string> {
    return this.loggedInUserId$;
  }
}
