import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule, RouterOutlet, NavbarComponent, FooterComponent],
})
export class AppComponent implements OnInit {
  showNavbar: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary')
      )
      .subscribe((route) => {
        this.showNavbar = route.snapshot.data['showNavbar'] !== false;
      });
  }

  ngOnInit() {}

  ngOnDestroy() {}
=======
// import { AmadeusAuthService } from './services/amadeus-auth/amadeus-auth.service';
// import { Subscription } from 'rxjs';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
      RouterModule,
      RouterOutlet,
      NavbarComponent,
      FooterComponent,
    ]
})
export class AppComponent implements OnInit {

  constructor(
    // private amadeusAuthService: AmadeusAuthService
  ) {}

  ngOnInit() {
    // this.amadeusAuthService.token_data$.subscribe({});
  }

  ngOnDestroy() {
    
  }
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
}
