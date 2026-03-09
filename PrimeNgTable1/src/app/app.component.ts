import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, InputTextModule, TableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  users: any[] = [];
  filteredUsers: any[] = [];
  rows = 30;
  rowsPerPageOptions = [5, 10, 15, 30];

  filterId = '';
  filterName = '';
  filterEmail = '';
  filterRole = '';

  constructor() {
    this.loadUsers();
    this.applyFilters();
  }

  loadUsers() {
    for (let i = 1; i <= 30; i++) {
      this.users.push({
        id: i,
        name: 'User ' + i,
        email: 'user' + i + '@gmail.com',
        role: i % 2 == 0 ? 'Developer' : 'Tester'
      });
    }
  }

  applyFilters() {
    this.filteredUsers = this.users.filter((user) => {
      const matchesId =
        !this.filterId ||
        user.id.toString().includes(this.filterId.toString());
      const matchesName =
        !this.filterName ||
        user.name.toLowerCase().includes(this.filterName.toLowerCase());
      const matchesEmail =
        !this.filterEmail ||
        user.email.toLowerCase().includes(this.filterEmail.toLowerCase());
      const matchesRole =
        !this.filterRole ||
        user.role.toLowerCase().includes(this.filterRole.toLowerCase());

      return matchesId && matchesName && matchesEmail && matchesRole;
    });
  }
}
