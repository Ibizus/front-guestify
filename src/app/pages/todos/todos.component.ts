import { Component } from '@angular/core';
import { Task } from '../../utils/types';
import { TaskService } from '../../services/task.service';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    selector: 'app-todos',
    standalone: true,
    templateUrl: './todos.component.html',
    styleUrl: './todos.component.scss',
    imports: [
        TableModule,
        PaginatorModule,
        IconFieldModule,
        InputIconModule,
        CheckboxModule
    ]
})
export class TodosComponent {

    tasksList !: Task[];
    // Pagination variables with default values:
    first: number = 0;
    rows: number = 10;
    currentPage: number = 20;
    demandedPage: number = 0;
    totalPages: number = 20;
    totalRecords: number = 200;
    filter: string = '';

    constructor(
        private taskService: TaskService
    ){}

    ngOnInit() {
      this.getTasks(this.demandedPage, this.rows, '')
    }

    paginate(event: any) {
      this.first = event.page * event.rows;
      this.rows = event.rows;
      this.demandedPage = event.page; //Index of the new page
      this.getTasks(this.demandedPage, this.rows, this.filter);
    }

    // Search bar event:
    onInputChange(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      this.filter = filterValue;
      this.getTasks(0, this.rows, this.filter);
    }

    getTasks(page: number, size: number, filter: string) {
        this.taskService.getTasks(page, size, filter).subscribe({
          next: (data) => {
            this.tasksList = data.tasks;
            // CHECK DATA:
            console.log(data);
            console.log(this.tasksList);
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
