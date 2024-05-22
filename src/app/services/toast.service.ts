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
      severity: 'warn',
      summary: 'Warn',
      detail: message,
    });
  }

  error(message: string) {
    this.messageService.add({
      key: 'bc',
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  success(message: string) {
    console.log(message);
    this.messageService.add({
      key: 'bc',
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  info(message: string) {
    this.messageService.add({
      key: 'bc',
      severity: 'info',
      summary: 'Info',
      detail: message,
    });
  }
}
