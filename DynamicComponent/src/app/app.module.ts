import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { AppComponent } from './app.component';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { AppRoutingModule } from './app-routing.module';
import { ShopModule } from './shop/shop.module';
import { GlobalErrorHandler } from './core/global-error-handler';
import { HttpErrorInterceptor } from './core/http-error.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DynamicFormModule,
    AppRoutingModule,
    HttpClientModule,
    ToastModule,
    ShopModule
  ],
  providers: [
    MessageService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
