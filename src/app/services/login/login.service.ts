import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from 'src/app/models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(user: UserLogin): Observable<boolean> {
    // mock login
    return new Observable<boolean>(observer => {
      // wait 2 seconds before sending a mockd response
      setTimeout(() => {
        if (user.email === 'admin@gmail.com' && user.password === 'admin123')
          observer.next(true);
        else
          observer.next(false);
      }, 2000);
    });
  }
}
