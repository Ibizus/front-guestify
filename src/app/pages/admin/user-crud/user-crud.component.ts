import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { User } from '../../../utils/types';

@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [
    TableModule,
    PaginatorModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule
  ],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.scss'
})
export class UserCrudComponent {

  // construct
  userList!: User[]
  // Pagination variables with default values:
  first: number = 0;
  rows: number = 10;
  currentPage: number = 20;
  demandedPage: number = 0;
  totalPages: number = 20;
  totalRecords: number = 200;
  filter: string = '';

  constructor(
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUsers(this.demandedPage, this.rows, '');
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
        this.userList = data.users;
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
    this.getUsers(0, this.rows, this.filter);
  }
}
