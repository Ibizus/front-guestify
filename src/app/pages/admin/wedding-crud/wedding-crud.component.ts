import { Component } from '@angular/core';
import { WeddingService } from '../../../services/wedding.service';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { Wedding } from '../../../utils/types';
import { ToastModule } from 'primeng/toast';  
import { ToastService } from '../../../services/toast.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-wedding-crud',
  standalone: true,
  imports: [
    TableModule,
    PaginatorModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule,
    ToastModule
  ],
  providers: [
    MessageService, 
    ToastService
  ],
  templateUrl: './wedding-crud.component.html',
  styleUrl: './wedding-crud.component.scss'
})
export class WeddingCrudComponent {

  weddingList!: any[]
    // Pagination variables with default values:
    first: number = 0;
    rows: number = 10;
    currentPage: number = 20;
    demandedPage: number = 0;
    totalPages: number = 20;
    totalRecords: number = 200;
    filter: string = '';

  constructor(
    private weddingService: WeddingService,
    private toastService: ToastService) {
    }
  

  ngOnInit(): void {
    console.log("Incializando componente Wedding Crud");
    this.getWeddings(this.demandedPage, this.rows, '');
  }

  paginate(event: any) {
    this.first = event.page * event.rows;
    this.rows = event.rows;
    this.demandedPage = event.page; //Index of the new page
    this.getWeddings(this.demandedPage, this.rows, this.filter);
  }

  getWeddings( page: number, size: number, filter: string) {
    this.weddingService.getWeddings(page, size, filter).subscribe({
      next: (data) => {
        this.weddingList = data.weddings;
        // CHECK DATA:
        console.log(data);
        // Pagination:
        this.first = page * size + 1; // Calculate index of first item shown
        this.rows = size; // Update size input from the request
        this.currentPage = data.currentPage + 1; // In back first page is index 0
        this.totalRecords = data.totalItems;
      },
      error: (error) => {console.error(error)},
    })
  }

  // Search bar event:
  onInputChange(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter = filterValue;
    this.getWeddings(0, this.rows, this.filter);
  }
  
  deleteWedding(id: number) {
    console.log('Eliminanda boda con id: ', id);
    this.weddingService.deleteWedding(id).subscribe({
      next: () => {
        this.ngOnInit();
        sleep(500).then(() => {
          this.toastService.success('Boda eliminada con éxito');
        });
      },
      error: (error) => {
        this.toastService.error(error);
      },
    });
  }

  goToModifyWedding(_t38: any) {
    throw new Error('Method not implemented.');
  }
}

function sleep(ms: number | undefined) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
