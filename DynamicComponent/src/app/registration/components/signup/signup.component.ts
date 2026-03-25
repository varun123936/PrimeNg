import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ShopToastService } from '../../../shop/services/shop-toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  submitted = false;

  form = this.fb.group(
    {
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    },
    { validators: [SignupComponent.passwordMatchValidator] }
  );

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
    const payload = this.form.getRawValue();
    this.auth.register({
      fullName: payload.fullName ?? '',
      email: payload.email ?? '',
      phone: payload.phone ?? '',
      address: payload.address ?? '',
      password: payload.password ?? ''
    }).subscribe(
      () => {
        this.toast.success('Account created', 'You can now log in.');
        this.router.navigate(['/auth/login']);
      },
      (error: Error) => {
        if (error instanceof HttpErrorResponse) {
          return;
        }
        this.toast.error('Signup failed', error.message || 'Please try again.');
      }
    );
  }

  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const digitsOnly = input.value.replace(/\D/g, '').slice(0, 10);
    this.form.controls.phone.setValue(digitsOnly, { emitEvent: false });
  }

  private static passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    if (!password || !confirm) {
      return null;
    }
    return password === confirm ? null : { passwordMismatch: true };
  }
}
