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
import { ToastModule } from 'primeng/toast';  
import { ToastService } from '../../services/toast.service';
import { MessageService } from 'primeng/api';

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
        FormGiftComponent,
        ToastModule
    ],
    providers: [
      MessageService, 
      ToastService
    ]
})
export class GiftsComponent{

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
      private giftService: GiftService,
      private toastService: ToastService
  ){}

  ngOnInit() {
    console.log("Incializando componente padre Gift");
    this.selectedWeddingId = this.storageService.getWeddingId();
    console.log('weddingId recuperado de storageService en el OnInit de Guests', this.selectedWeddingId)

    if(this.selectedWeddingId>=0){
      console.log('Recuperando regalos del backend:');
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

  acceptChanges(){
    console.log("Recibiendo evento de hijo y recarganbdo tabla de regalos del backend");
    this.ngOnInit();
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

  deleteGift(id: number) {
    console.log('Eliminando regalo con id: ', id);
    this.giftService.deleteGift(id).subscribe({
      next: () => {
        this.ngOnInit();
        sleep(500).then(() => {
          this.toastService.success('Regalo eliminado con éxito');
        });
      },
      error: (error) => {
        this.toastService.error(error);
      },
    });
  }


}

function sleep(ms: number | undefined) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

