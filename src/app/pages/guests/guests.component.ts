import { Component } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { Invitation } from '../../utils/types';
import { InvitationService } from '../../services/invitation.service';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
    selector: 'app-guests',
    standalone: true,
    templateUrl: './guests.component.html',
    styleUrl: './guests.component.scss',
    imports: [
        DashboardComponent,
        TableModule,
        PaginatorModule,
        IconFieldModule,
        InputIconModule,
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
    filter: string = '';

    constructor(
        private invitationService: InvitationService
    ){}

    ngOnInit() {
      this.getInvitations(this.demandedPage, this.rows, '')
    }

    paginate(event: any) {
      this.first = event.page * event.rows;
      this.rows = event.rows;
      this.demandedPage = event.page; //Index of the new page
      this.getInvitations(this.demandedPage, this.rows, this.filter);
    }

    // Search bar event:
    onInputChange(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      this.filter = filterValue;
      this.getInvitations(0, this.rows, this.filter);
    }

    getInvitations(page: number, size: number, filter: string) {
        this.invitationService.getInvitations(page, size, filter).subscribe({
          next: (data) => {
            this.guestsList = data.invitations;
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
