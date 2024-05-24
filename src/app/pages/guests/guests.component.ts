import { Component } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { TableModule } from 'primeng/table';
import { Guest, Invitation } from '../../utils/types';
import { GuestService } from '../../services/guest.service';
import { InvitationService } from '../../services/invitation.service';

@Component({
    selector: 'app-guests',
    standalone: true,
    templateUrl: './guests.component.html',
    styleUrl: './guests.component.scss',
    imports: [
        DashboardComponent,
        TableModule
    ]
})
export class GuestsComponent {
    guestsList !: Invitation[];
    // Pagination variables with default values:
    first: number = 0;
    rows: number = 10;
    currentPage: number = 20;
    demandedPage: number = 0;
    totalPages: number = 20;
    totalRecords: number = 200;

    constructor(
        private invitationService: InvitationService
    ){}

    ngOnInit() {
      this.getInvitations(this.demandedPage, this.rows, '')
    }

    getInvitations(page: number, size: number, filter: string) {
        this.invitationService.getInvitations(page, size, filter).subscribe({
          next: (data) => {
            this.guestsList = data.invitations;
            // SEE DETAILS IN CONSOLE
            console.log(this.guestsList.length);
            this.guestsList.forEach(element => {  
              console.log(element);
            });
            // Pagination:
            this.first = page * size + 1; // Calculate index of first item shown
            this.rows = size; // Update size input from the request
            this.currentPage = data.currentPage + 1; // In back first page is index 0
            this.totalRecords = data.totalItems;
          },
          error: (error) => {console.error(error)},
        });
      }
}
