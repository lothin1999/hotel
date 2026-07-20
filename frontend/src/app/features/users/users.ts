import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from './services/users.service';
import { UserAccount } from './models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class UsersComponent implements OnInit {
  users: UserAccount[] = [];
  loading = false;
  showForm = false;
  editingUser: UserAccount | null = null;

  name = '';
  email = '';
  password = '';
  role: 'DEVELOPER' | 'ADMIN' | 'MANAGER' | 'STAFF' | 'USER' = 'STAFF';

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => {
        // Fallback demo users if DB is empty
        this.users = [
          { id: 1, name: 'System Developer', email: 'dev@ankorbook.com', role: 'DEVELOPER' },
          { id: 2, name: 'Hotel Admin', email: 'admin@ankorbook.com', role: 'ADMIN' },
          { id: 3, name: 'Frontdesk Manager', email: 'manager@ankorbook.com', role: 'MANAGER' }
        ];
        this.loading = false;
      }
    });
  }

  openAddForm(): void {
    this.editingUser = null;
    this.name = '';
    this.email = '';
    this.password = '';
    this.role = 'STAFF';
    this.showForm = true;
  }

  openEditForm(user: UserAccount): void {
    this.editingUser = user;
    this.name = user.name || '';
    this.email = user.email;
    this.password = '';
    this.role = user.role;
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.editingUser = null;
  }

  onSubmit(): void {
    const payload: any = {
      name: this.name,
      email: this.email,
      role: this.role
    };
    if (this.password) {
      payload.password = this.password;
    }

    if (this.editingUser) {
      this.usersService.updateUser(this.editingUser.id, payload).subscribe({
        next: () => {
          this.loadUsers();
          this.closeForm();
        },
        error: (err) => alert('Failed to update user: ' + (err.error?.message || err.message))
      });
    } else {
      this.usersService.createUser(payload).subscribe({
        next: () => {
          this.loadUsers();
          this.closeForm();
        },
        error: (err) => alert('Failed to create user: ' + (err.error?.message || err.message))
      });
    }
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user account?')) {
      this.usersService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => alert('Failed to delete user: ' + (err.error?.message || err.message))
      });
    }
  }
}
