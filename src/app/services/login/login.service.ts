import { Injectable } from '@angular/core';
<<<<<<< HEAD
<<<<<<< HEAD
import { Observable } from 'rxjs';
import { UserLogin } from 'src/app/models/user/user.model';
=======
import { UserLogin } from '../../models/user-login.model';
import { Observable } from 'rxjs';
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
=======
import { UserLogin } from '../../models/user-login.model';
import { Observable } from 'rxjs';
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b

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
