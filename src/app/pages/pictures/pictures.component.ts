import { Component } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
    selector: 'app-pictures',
    standalone: true,
    templateUrl: './pictures.component.html',
    styleUrl: './pictures.component.scss',
    imports: [DashboardComponent]
})
export class PicturesComponent {

}
