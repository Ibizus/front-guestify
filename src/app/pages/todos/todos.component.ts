import { Component } from '@angular/core';
import { Task } from '../../utils/types';
import { TaskService } from '../../services/task.service';
import { ToastModule } from 'primeng/toast'
import { ToastService } from '../../services/toast.service';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';

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
        CheckboxModule,
        ReactiveFormsModule,
        ToastModule,
        TooltipModule
    ],
    providers: [ToastService]
})
export class TodosComponent {

  formGroup: FormGroup | undefined;

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
        private taskService: TaskService,
        private toastService: ToastService
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
          error: (error) => {
            console.error(error);
            this.toastService.error(error);
          },
        });
    }

    sleep(ms: number | undefined) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  
    deleteTask(id: number) {
      this.taskService.deleteTask(id).subscribe({
        next: (data) => {
          this.ngOnInit;
          this.sleep(1000).then(() => {
            this.toastService.success('Tarea eliminada');
          });
        },
        error: (error) => {
          this.toastService.error(error);
        },
      });
    }

    toggleModal() {
      const modal = document.getElementById('crud-modal');
      modal?.classList.toggle('hidden');
      modal?.classList.toggle('flex');
    }

}
