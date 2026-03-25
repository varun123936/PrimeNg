import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/users';
  private readonly storageKey = 'auth_user';
  private readonly currentUserSubject = new BehaviorSubject<User | null>(this.readStoredUser());
  readonly currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(payload: User): Observable<User> {
    return this.http
      .get<User[]>(`${this.apiUrl}?email=${encodeURIComponent(payload.email)}`)
      .pipe(
        switchMap((users) => {
          if (users && users.length > 0) {
            return throwError(() => new Error('Email already registered.'));
          }
          return this.http.post<User>(this.apiUrl, payload);
        })
      );
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .get<User[]>(
        `${this.apiUrl}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      )
      .pipe(
        map((users) => users && users.length > 0 ? users[0] : null),
        switchMap((user) => {
          if (!user) {
            return throwError(() => new Error('Invalid email or password.'));
          }
          return of(user).pipe(tap((resolved) => this.setCurrentUser(resolved)));
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.getValue();
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private readStoredUser(): User | null {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }
}
