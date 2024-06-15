import { Component, OnInit } from '@angular/core';
import { Invitation } from '../../utils/types';
import { InvitationService } from '../../services/invitation.service';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-guests',
    standalone: true,
    templateUrl: './guests.component.html',
    styleUrl: './guests.component.scss',
    imports: [
        TableModule,
        PaginatorModule,
        IconFieldModule,
        InputIconModule,
        TooltipModule
    ]
})
export class GuestsComponent implements OnInit{

  private router: Router = new Router();
  selectedWeddingId!: number;
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
    private storageService: StorageService,
    private invitationService: InvitationService
  ){}

  ngOnInit() {
    this.selectedWeddingId = this.storageService.getWeddingId();

    console.log('weddingId recuperado de storageService en el OnInit de Guests', this.selectedWeddingId)

    if(this.selectedWeddingId>=0){
      console.log('Recuperando invitaciones del backend:');
      this.getInvitations(this.selectedWeddingId, this.demandedPage, this.rows, '')
    }else{
      this.router.navigate(['/dashboard']);
    }
  }

  paginate(event: any) {
    this.first = event.page * event.rows;
    this.rows = event.rows;
    this.demandedPage = event.page; //Index of the new page
    this.getInvitations(this.selectedWeddingId, this.demandedPage, this.rows, this.filter);
  }

  // Search bar event:
  onInputChange(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter = filterValue;
    this.getInvitations(this.selectedWeddingId, 0, this.rows, this.filter);
  }

  getInvitations(id: number, page: number, size: number, filter: string) {
      this.invitationService.getInvitations(id, page, size, filter).subscribe({
        next: (data) => {
          console.log('Fetch OK para la boda con id:', id,);
          this.guestsList = data.invitations;
          // CHECK DATA:
          console.log('LISTA DE INVITADOS:');
          console.log(data.invitations);
          // Pagination:
          this.first = page * size + 1; // Calculate index of first item shown
          this.rows = size; // Update size input from the request
          this.currentPage = data.currentPage + 1; // In back first page is index 0
          this.totalRecords = data.totalItems;
        },
        error: (error) => {console.error(error)},
      });
    }

    // toggleModal() {
    //   const modal = document.getElementById('crud-modal');
    //   modal?.classList.toggle('hidden');
    //   modal?.classList.toggle('flex');
    // }
}
