import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  warn(message: string) {
    this.messageService.add({
      key: 'bc',
      life: 3000,
      severity: 'warn',
      summary: 'Aviso',
      detail: message,
    });
  }

  error(message: string) {
    this.messageService.add({
      key: 'bc',
      life: 3000,
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  success(message: string) {
    console.log(message);
    this.messageService.add({
      key: 'bc',
      life: 3000,
      severity: 'success',
      summary: 'Hecho!',
      detail: message,
    });
  }

  info(message: string) {
    this.messageService.add({
      key: 'bc',
      life: 3000,
      severity: 'info',
      summary: 'Info',
      detail: message,
    });
  }
}
