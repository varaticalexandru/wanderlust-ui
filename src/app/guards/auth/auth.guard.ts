import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service/auth.service';
import { map, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LogOutComponent } from 'src/app/components/login/log-out/log-out.component';
import { JwtService } from 'src/app/services/auth/jwt/jwt.service';

export const authGuard: CanActivateFn = (route, state) => {

  
  const authService = inject(AuthService);
  const router = inject(Router);
  const dialog = inject(MatDialog);
  const jwtService = inject(JwtService);

  const token = localStorage.getItem('token');
  console.log(token);
  
  if (token && jwtService.isTokenExpired(token)) {
    
    authService.loggedIn.next(false);
    authService.loggedInUserSubject.next('');
    authService.logout();
    dialog.open(LogOutComponent);
    return false;
  }

  return authService.isLoggedIn.pipe(
    take(1),
    map((loggedIn: boolean) => {
      
      if (!loggedIn) {
        router.navigate(['/login']);
        dialog.open(LogOutComponent);
        return false;
      }
      return true;
    })
  );
};
