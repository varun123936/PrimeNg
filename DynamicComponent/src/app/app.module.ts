import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { AppComponent } from './app.component';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { AppRoutingModule } from './app-routing.module';
import { ShopModule } from './shop/shop.module';

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
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
