import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ShopToastService } from '../../../shop/services/shop-toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submitted = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ShopToastService
  ) {}

  submit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.getRawValue();
    this.auth.login(email ?? '', password ?? '').subscribe(
      (user) => {
        this.toast.success('Welcome back', user.fullName);
        this.router.navigate(['/auth/welcome']);
      },
      (error: Error) => {
        if (error instanceof HttpErrorResponse) {
          return;
        }
        this.toast.error('Login failed', error.message || 'Please try again.');
      }
    );
  }
}
