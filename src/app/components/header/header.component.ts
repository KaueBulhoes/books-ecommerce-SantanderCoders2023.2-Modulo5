import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, RouterModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  loggedUser: IUser | null = null;

  constructor(private authService: AuthService) {
    this.authService.loggedUser$.subscribe((user: IUser | null) => {
      this.loggedUser = user;
    });
  }

  logoutUser() {
    this.authService.logoutUser();
  }

}