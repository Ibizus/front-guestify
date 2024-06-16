import { Component, EventEmitter } from '@angular/core';
import { Invitation } from '../../utils/types';
import { InvitationService } from '../../services/invitation.service';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { FormGuestComponent } from '../../modal/form-guest/form-guest.component';

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
        TooltipModule,
        FormGuestComponent
    ]
})
export class GuestsComponent{

  callModal: EventEmitter<null> = new EventEmitter();
  private router: Router = new Router();
  selectedWeddingId!: number;
  invitationList !: Invitation[];
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

  goToModifyInvitation(invitation: Invitation) {
    this.storageService.saveItemForChanges(invitation);
    this.callModal.emit();
    console.log("Emitiendo evento para editar invitation ", invitation);
  }

  acceptChanges(){
    console.log("Recibiendo evento de hijo y recarganbdo tabla de invitations del backend");
    this.ngOnInit();
  }

  getInvitations(id: number, page: number, size: number, filter: string) {
      this.invitationService.getInvitations(id, page, size, filter).subscribe({
        next: (data) => {
          console.log('Fetch OK para la boda con id:', id,);
          this.invitationList = data.invitations;
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

    deleteInvitation(id: number) {
      console.log('Eliminando invitation con id: ', id);
      this.invitationService.deleteInvitation(id).subscribe({
        next: () => {
          this.ngOnInit();
        },
        error: (error) => {
          // this.toastService.error(error);
        },
      });
    }

  }
