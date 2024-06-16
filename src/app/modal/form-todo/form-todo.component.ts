import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { ToastService } from '../../services/toast.service';
import { Subscription } from 'rxjs';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { Task } from '../../utils/types';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-form-todo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule,
    CommonModule
  ],
  templateUrl: './form-todo.component.html',
  styleUrl: './form-todo.component.scss'
})
export class FormTodoComponent {

  isModalOpen: boolean = false;
  @Input() goToModify: EventEmitter<any> = new EventEmitter();
  @Output() tellParentChangesWereMade: EventEmitter<any> = new EventEmitter();
  temporalTask: Task = newTask();
  formTask: Task = newTask();
  routerSubscription!: Subscription;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private taskService: TaskService,
    //private toastService: ToastService
  ){
    this.storageService.currentItem.subscribe((task: Task | null)=> {
      console.log("El regalo recibido del service es: ", task);

      if(task != null){
        this.temporalTask.id = task.id;
        this.temporalTask.description = task.description;
        this.temporalTask.deadline = task.deadline;
        this.temporalTask.done = task.done;
      }
    });

    if(!!this.temporalTask){
      this.formTask = this.temporalTask;
      console.log("FormTask relleno con lo recibido del service: ", this.formTask);
    }
  }

  ngOnInit() {
    console.log("Incializando componente hijo FormTask");

    this.goToModify.subscribe(() =>{ 
      console.log("Recibiendo aviso para editar regalo ");

      console.log("Abriendo modal en onInit");
      this.toggleModal();
    })
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  clearFormFields() {
    this.storageService.saveItemForChanges(null);
    this.formTask.id = 0;
    this.formTask.description = '';
    this.formTask.deadline = '';
    this.formTask.done = false;
    console.log("Abriendo modal en clearFormFields");
    this.toggleModal();
    this.router.navigate(['/todos']);
  }

  acceptChanges() {
    console.log('Mandando evento a padre para que actualice tabla');
    // this.tellParentChangesWereMade.emit();
  }

  onSubmit() {
    if (this.temporalTask.id > 0) {
      this.taskService.modifyTask(this.formTask).subscribe({
        next: ()=>{
          console.log("Task modified by this: ", this.formTask);
          // this.toastService.success(
          //   'El regalo ' +
          //     this.temporalTask?.name +
          //     ' ha sido modificado correctamente!'
          // );
          this.tellParentChangesWereMade.emit();
        },
        error: (error) =>{
          // this.toastService.error(error);
        }
      })
    }else{
      let selectedWeddingId = this.storageService.getWeddingId();
      this.taskService.createTask(selectedWeddingId, this.formTask).subscribe({
        next: ()=>{
          // this.toastService.success(
          //   'El regalo ' +
          //     this.formTask?.name +
          //     ' se ha creado correctamente!'
          // );
          this.tellParentChangesWereMade.emit();
        },
        error: (error) =>{
        //   this.toastService.error(error);
        }
      })
    }
    console.log("Cerrando modal en onSubmit");
    this.clearFormFields();
    // this.toggleModal();
  }
}

function sleep(ms: number | undefined) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function newTask(): Task {
  return {
    id: 0,
    description: '',
    deadline: '',
    done: false,
  };
}
