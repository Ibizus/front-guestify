import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LandingComponent } from './main/landing/landing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule, 
    RouterModule,
    RouterOutlet, 
    SharedModule, 
    NavbarComponent, 
    FooterComponent, 
    LandingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front-guestify';
}
