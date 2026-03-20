import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ShopToastService {
  constructor(private messageService: MessageService) {}

  success(summary: string, detail?: string): void {
    this.messageService.add({
      severity: 'success',
      summary,
      detail,
      life: 2000
    });
  }

  info(summary: string, detail?: string): void {
    this.messageService.add({
      severity: 'info',
      summary,
      detail,
      life: 2000
    });
  }

  warn(summary: string, detail?: string): void {
    this.messageService.add({
      severity: 'warn',
      summary,
      detail,
      life: 2000
    });
  }

  error(summary: string, detail?: string): void {
    this.messageService.add({
      severity: 'error',
      summary,
      detail,
      life: 3000
    });
  }
}
