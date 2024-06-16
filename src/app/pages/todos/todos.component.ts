import { Component, EventEmitter } from '@angular/core';
import { Task } from '../../utils/types';
import { TaskService } from '../../services/task.service';
import { ToastModule } from 'primeng/toast'
import { ToastService } from '../../services/toast.service';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormTodoComponent } from '../../modal/form-todo/form-todo.component';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

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
        TooltipModule,
        FormTodoComponent
    ],
    providers: [ToastService, MessageService]
})
export class TodosComponent {

  formGroup: FormGroup | undefined;
  callModal: EventEmitter<null> = new EventEmitter();
  private router: Router = new Router();
  selectedWeddingId!: number;
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
    private storageService: StorageService,
    private taskService: TaskService,
    private toastService: ToastService
  ){}

  ngOnInit() {
    console.log("Incializando componente padre ToDos");
    this.selectedWeddingId = this.storageService.getWeddingId();
    console.log('weddingId recuperado de storageService en el OnInit de Guests', this.selectedWeddingId)

    if(this.selectedWeddingId>=0){
      console.log('Recuperando tareas del backend:');
      this.getTasks(this.selectedWeddingId, this.demandedPage, this.rows, '')
    }else{
      this.router.navigate(['/dashboard']);
    }
  }

  goToModifyTask(task: Task) {
    this.storageService.saveItemForChanges(task);
    this.callModal.emit();
    console.log("Emitiendo evento para editar to-do ", task);
  }

  paginate(event: any) {
    this.first = event.page * event.rows;
    this.rows = event.rows;
    this.demandedPage = event.page; //Index of the new page
    this.getTasks(this.selectedWeddingId, this.demandedPage, this.rows, this.filter);
  }

  // Search bar event:
  onInputChange(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter = filterValue;
    this.getTasks(this.selectedWeddingId, 0, this.rows, this.filter);
  }

  acceptChanges(){
    console.log("Recibiendo evento de hijo y recarganbdo tabla de tareas del backend");
    this.ngOnInit();
  }

  getTasks(id: number, page: number, size: number, filter: string) {
      this.taskService.getTasks(id, page, size, filter).subscribe({
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

  deleteTask(id: number) {
    console.log('Eliminando tarea con id: ', id);
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.ngOnInit;
        // this.sleep(1000).then(() => {
        //   this.toastService.success('Tarea eliminada');
        // });
      },
      error: (error) => {
        // this.toastService.error(error);
      },
    });
  }


}

