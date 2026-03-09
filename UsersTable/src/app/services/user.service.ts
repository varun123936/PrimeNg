import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

/**
 * Service for managing user data
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly TOTAL_USERS = 30;
  private readonly ROLES = ['Developer', 'Tester'] as const;
  
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this.usersSubject.asObservable();

  constructor() {
    this.initializeUsers();
  }

  /**
   * Initialize default users
   */
  private initializeUsers(): void {
    const users = this.generateUsers();
    this.usersSubject.next(users);
  }

  /**
   * Generate mock user data
   */
  private generateUsers(): User[] {
    const users: User[] = [];
    for (let i = 1; i <= this.TOTAL_USERS; i++) {
      users.push({
        id: i,
        name: `User ${i}`,
        email: `user${i}@gmail.com`,
        role: i % 2 === 0 ? 'Developer' : 'Tester'
      });
    }
    return users;
  }

  /**
   * Get all users
   */
  getUsers(): User[] {
    return this.usersSubject.value;
  }
}
