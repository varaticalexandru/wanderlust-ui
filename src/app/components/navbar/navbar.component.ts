import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogOutComponent } from '../login/log-out/log-out.component';
import { LogOutConfirmComponent } from '../login/log-out-confirm/log-out-confirm.component';
import { AuthService } from 'src/app/services/auth/auth-service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    RouterOutlet,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {}

  logout() {
    const dialogRef = this.dialog.open(LogOutConfirmComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authService.logout();
      }
    });
  }
}
