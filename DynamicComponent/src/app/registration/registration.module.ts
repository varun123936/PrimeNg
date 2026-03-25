import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationRoutingModule } from './registration-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [LoginComponent, SignupComponent, WelcomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegistrationRoutingModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    PasswordModule
  ]
})
export class RegistrationModule {}
