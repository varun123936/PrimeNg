import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, startWith } from 'rxjs/operators';
import { UserService } from './services/user.service';
import { User } from './models/user.model';

/**
 * AppComponent - Main application component for displaying and filtering users
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly title = 'UsersTable';
  rows = 7;
  readonly rowsPerPageOptions = [5, 7, 10];

  users: User[] = [];
  filteredUsers: User[] = [];

  filterId = '';
  filterName = '';
  filterEmail = '';
  filterRole = '';

  private filterSubject = new Subject<void>();
  private destroy$ = new Subject<void>();

  dialogVisible = false;
  dialogMode: 'add' | 'edit' = 'add';
  dialogUser: User = {
    id: 0,
    name: '',
    email: '',
    role: 'Developer'
  };

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * Angular lifecycle hook - initialization
   */
  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * Angular lifecycle hook - after view initialization
   */
  ngAfterViewInit(): void {
    this.setupFiltering();
  }

  /**
   * Angular lifecycle hook - cleanup
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.filterSubject.complete();
  }

  /**
   * Load users from service
   */
  private loadUsers(): void {
    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (users) => {
          this.users = users;
          this.filteredUsers = [...users];
          this.cdr.markForCheck();
        },
        (error) => {
          console.error('Error loading users:', error);
        }
      );
  }

  /**
   * Setup filtering with debounce to prevent excessive re-filtering
   */
  private setupFiltering(): void {
    this.filterSubject
      .pipe(
        debounceTime(300),
        startWith(null),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.applyFilters());
  }

  /**
   * Trigger filter update
   */
  onFilterChange(): void {
    this.filterSubject.next();
  }

  /**
   * Open dialog to add a new user
   */
  addUser(): void {
    this.dialogMode = 'add';
    this.dialogUser = {
      id: 0,
      name: '',
      email: '',
      role: 'Developer'
    };
    this.dialogVisible = true;
  }

  /**
   * Open dialog to edit an existing user
   */
  editUser(user: User): void {
    this.dialogMode = 'edit';
    this.dialogUser = { ...user };
    this.dialogVisible = true;
  }

  /**
   * Delete a user after confirmation
   */
  deleteUser(user: User): void {
    const confirmed = window.confirm(
      `Delete ${user.name} (ID: ${user.id})?`
    );
    if (!confirmed) {
      return;
    }

    this.users = this.users.filter((existing) => existing.id !== user.id);
    this.applyFilters();
  }

  /**
   * Save dialog changes for add/edit
   */
  saveDialog(): void {
    const name = this.dialogUser.name.trim();
    const email = this.dialogUser.email.trim();
    const role = this.dialogUser.role.trim();

    if (!name || !email || !role) {
      return;
    }

    if (this.dialogMode === 'add') {
      const newUser: User = {
        id: this.getNextId(),
        name,
        email,
        role: role as User['role']
      };
      this.users = [...this.users, newUser];
    } else {
      this.users = this.users.map((existing) =>
        existing.id === this.dialogUser.id
          ? { ...existing, name, email, role: role as User['role'] }
          : existing
      );
    }

    this.dialogVisible = false;
    this.applyFilters();
  }

  cancelDialog(): void {
    this.dialogVisible = false;
  }

  /**
   * Apply all active filters to the user list
   */
  private applyFilters(): void {
    try {
      this.filteredUsers = this.users.filter((user) => {
        return (
          this.matchesId(user) &&
          this.matchesName(user) &&
          this.matchesEmail(user) &&
          this.matchesRole(user)
        );
      });
      console.log('Filters applied. Matching users:', this.filteredUsers.length);
      // ensure OnPush change detection picks up the new reference
      this.cdr.markForCheck();
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  }

  /**
   * Check if user ID matches filter
   */
  private matchesId(user: User): boolean {
    if (!this.filterId) {
      return true;
    }
    return user.id.toString().includes(this.filterId.trim());
  }

  /**
   * Check if user name matches filter
   */
  private matchesName(user: User): boolean {
    if (!this.filterName) {
      return true;
    }
    return user.name.toLowerCase().includes(this.filterName.toLowerCase().trim());
  }

  /**
   * Check if user email matches filter
   */
  private matchesEmail(user: User): boolean {
    if (!this.filterEmail) {
      return true;
    }
    return user.email.toLowerCase().includes(this.filterEmail.toLowerCase().trim());
  }

  /**
   * Check if user role matches filter
   */
  private matchesRole(user: User): boolean {
    if (!this.filterRole) {
      return true;
    }
    return user.role.toLowerCase().includes(this.filterRole.toLowerCase().trim());
  }

  private getNextId(): number {
    if (this.users.length === 0) {
      return 1;
    }
    return Math.max(...this.users.map((user) => user.id)) + 1;
  }

}
