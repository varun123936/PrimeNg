import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ShopToastService } from '../shop/services/shop-toast.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toast: ShopToastService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = error.message || 'Network request failed.';
        this.toast.error('Request failed', message);
        return throwError(() => error);
      })
    );
  }
}
