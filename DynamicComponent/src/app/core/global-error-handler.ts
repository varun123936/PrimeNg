import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ShopToastService } from '../shop/services/shop-toast.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector, private zone: NgZone) {}

  handleError(error: unknown): void {
    const toast = this.injector.get(ShopToastService, null);
    if (toast) {
      const message = this.buildMessage(error);
      this.zone.run(() => {
        toast.error('Unexpected error', message);
      });
    }
    // Always log to console for diagnostics.
    console.error(error);
  }

  private buildMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      return error.message || 'Network request failed.';
    }
    if (error instanceof Error) {
      return error.message || 'Something went wrong.';
    }
    return 'Something went wrong.';
  }
}
