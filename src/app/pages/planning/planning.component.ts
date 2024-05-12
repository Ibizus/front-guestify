import { Component } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
    selector: 'app-planning',
    standalone: true,
    templateUrl: './planning.component.html',
    styleUrl: './planning.component.scss',
    imports: [DashboardComponent]
})
export class PlanningComponent {

}
