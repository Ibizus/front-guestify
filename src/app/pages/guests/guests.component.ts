import { Component } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
    selector: 'app-guests',
    standalone: true,
    templateUrl: './guests.component.html',
    styleUrl: './guests.component.scss',
    imports: [DashboardComponent]
})
export class GuestsComponent {

}
