import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { GuestsComponent } from '../guests/guests.component';
import { GiftsComponent } from '../gifts/gifts.component';
import { PicturesComponent } from '../pictures/pictures.component';
import { PlanningComponent } from '../planning/planning.component';
import { TodosComponent } from '../todos/todos.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    GuestsComponent,
    GiftsComponent,
    PicturesComponent,
    PlanningComponent,
    TodosComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
