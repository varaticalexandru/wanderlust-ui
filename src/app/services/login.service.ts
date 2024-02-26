import { Injectable } from '@angular/core';
import { UserLogin } from '../models/user-login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(user: UserLogin): Observable<boolean> {
    // mock login
    return new Observable<boolean>(observer => {
      if (user.email === 'admin@gmail.com' && user.password === 'admin123') {
        observer.next(true);
      } else {
        observer.next(false);
      }
    });
  }
}
