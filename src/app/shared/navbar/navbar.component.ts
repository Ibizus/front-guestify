import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  userId!: number;
  isMenuOpen = false;
  loggedIn = false;
  adminLoggedIn = false;
  userRol!: string;
  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.storageService.getUser().id;
    console.log('user id recuperado de storageService', this.userId);
    if (!!this.userId) {
      this.loggedIn = true;
    }

    this.userRol = this.storageService.getUser().rol;
    if (this.userRol == 'ROL_ADMIN') {
      this.adminLoggedIn = true;
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout();
  }
}