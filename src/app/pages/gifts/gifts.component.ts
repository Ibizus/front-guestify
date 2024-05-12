import { Component } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
    selector: 'app-gifts',
    standalone: true,
    templateUrl: './gifts.component.html',
    styleUrl: './gifts.component.scss',
    imports: [DashboardComponent]
})
export class GiftsComponent {

}
