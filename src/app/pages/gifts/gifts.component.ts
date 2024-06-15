import { Component, EventEmitter } from '@angular/core';
import { Gift } from '../../utils/types';
import { GiftService } from '../../services/gift.service';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { FormGiftComponent } from "../../modal/form-gift/form-gift.component";

@Component({
    selector: 'app-gifts',
    standalone: true,
    templateUrl: './gifts.component.html',
    styleUrl: './gifts.component.scss',
    imports: [
        TableModule,
        PaginatorModule,
        IconFieldModule,
        InputIconModule,
        TooltipModule,
        FormGiftComponent
    ]
})
export class GiftsComponent {

  callModal: EventEmitter<null> = new EventEmitter();
  private router: Router = new Router();
  selectedWeddingId!: number;
  giftsList !: Gift[];
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
      private giftService: GiftService
  ){}

  ngOnInit() {
    this.selectedWeddingId = this.storageService.getWeddingId();

    console.log('weddingId recuperado de storageService en el OnInit de Guests', this.selectedWeddingId)

    if(this.selectedWeddingId>=0){
      console.log('Recuperando invitaciones del backend:');
      this.getGifts(this.selectedWeddingId, this.demandedPage, this.rows, '')
    }else{
      this.router.navigate(['/dashboard']);
    }
  }

  goToModifyGift(gift: Gift) {
    this.storageService.saveItemForChanges(gift);
    this.callModal.emit();
    console.log("Emitiendo evento para editar regalo ", gift);
  }

  paginate(event: any) {
    this.first = event.page * event.rows;
    this.rows = event.rows;
    this.demandedPage = event.page; //Index of the new page
    this.getGifts(this.selectedWeddingId, this.demandedPage, this.rows, this.filter);
  }

  // Search bar event:
  onInputChange(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter = filterValue;
    this.getGifts(this.selectedWeddingId, 0, this.rows, this.filter);
  }

  getGifts(id: number, page: number, size: number, filter: string) {
      this.giftService.getGifts(id, page, size, filter).subscribe({
        next: (data) => {
          this.giftsList = data.gifts;
          // CHECK DATA:
          console.log(data);
          // Pagination:
          this.first = page * size + 1; // Calculate index of first item shown
          this.rows = size; // Update size input from the request
          this.currentPage = data.currentPage + 1; // In back first page is index 0
          this.totalRecords = data.totalItems;
        },
        error: (error) => {console.error(error)},
      });
    }



    toggleModal() {
      const modal = document.getElementById('crud-modal');
      modal?.classList.toggle('hidden');
      modal?.classList.toggle('flex');
    }
}
