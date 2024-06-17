import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, TooltipModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {

  user: any;
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
    this.user = this.storageService.getUser();

    this.userId = this.user.id;
    console.log('user id recuperado de storageService', this.userId);
    if (!!this.userId) {
      this.loggedIn = true;
    }

    this.userRol = this.storageService.getUser().rol;
    this.userRol = this.user.roles;
    if (this.userRol.includes('ROL_ADMIN')) {
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