import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LogoComponent } from './shared/logo/logo.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LandingComponent } from './main/landing/landing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, NavbarComponent, LogoComponent, FooterComponent, LandingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front-guestify';
}
