import {
  Component,
  OnInit,
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
export class AppComponent implements OnInit, OnDestroy {
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

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * Angular lifecycle hook - initialization
   */
  ngOnInit(): void {
    this.loadUsers();
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
}
