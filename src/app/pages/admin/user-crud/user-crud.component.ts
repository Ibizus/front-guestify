import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { User } from '../../../utils/types';
import { ToastModule } from 'primeng/toast';  
import { ToastService } from '../../../services/toast.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-crud',
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
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.scss'
})
export class UserCrudComponent {

  // construct
  userList!: any[]
  // Pagination variables with default values:
  first: number = 0;
  rows: number = 10;
  currentPage: number = 20;
  demandedPage: number = 0;
  totalPages: number = 20;
  totalRecords: number = 200;
  filter: string = '';

  constructor(
    private userService: UserService,
    private toastService: ToastService) {
  }

  ngOnInit(): void {
    console.log("Incializando componente Users Crud");
    this.getUsers(this.demandedPage, this.rows, '');
  }

  paginate(event: any) {
    this.first = event.page * event.rows;
    this.rows = event.rows;
    this.demandedPage = event.page; //Index of the new page
    this.getUsers(this.demandedPage, this.rows, this.filter);
  }

  getUsers( page: number, size: number, filter: string) {
    this.userService.getUsers(page, size, filter).subscribe({
      next: (data) => {
        // CHECK DATA:
        console.log('Data de los usuarios recibida del backend: ');
        console.log(data);

        this.userList = data.users;

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
    this.getUsers(0, this.rows, this.filter);
  }

  deleteUser(id: number) {
    console.log('Eliminando usuario con id: ', id);
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.ngOnInit();
        sleep(500).then(() => {
          this.toastService.success('Usuario eliminado con éxito');
        });
      },
      error: (error) => {
        this.toastService.error(error);
      },
    });
  }


  goToModifyUser(_t38: any) {
    throw new Error('Method not implemented.');
  }
}

function sleep(ms: number | undefined) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
