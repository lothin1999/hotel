import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../core/config/api.config';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roles.html',
  styleUrl: './roles.scss'
})
export class RolesComponent implements OnInit {
  roles: any[] = [];
  loading = false;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.loading = true;
    this.http.get<any[]>(`${API_CONFIG.baseUrl}/roles`, { headers: this.authService.getHeaders() }).subscribe({
      next: (data) => {
        this.roles = data;
        this.loading = false;
      },
      error: () => {
        // Fallback default role list
        this.roles = [
          { role: 'DEVELOPER', description: 'Full system access, root permissions, schema & DB management', permissions: ['ALL'] },
          { role: 'ADMIN', description: 'Full administrative access to manage suites, bikes, users, & bookings', permissions: ['USERS_READ', 'USERS_WRITE', 'SUITES_WRITE', 'BIKES_WRITE', 'BOOKINGS_WRITE', 'REPORTS_READ', 'SETTINGS_WRITE'] },
          { role: 'MANAGER', description: 'Operational manager access to review bookings, update status, and view reports', permissions: ['SUITES_READ', 'BIKES_READ', 'BOOKINGS_WRITE', 'REPORTS_READ'] },
          { role: 'STAFF', description: 'Frontdesk staff access to view check-ins and update booking statuses', permissions: ['SUITES_READ', 'BIKES_READ', 'BOOKINGS_READ', 'BOOKINGS_STATUS_UPDATE'] },
          { role: 'USER', description: 'Registered guest account for booking suites and renting bikes', permissions: ['PROFILE_WRITE', 'BOOKING_CREATE', 'BOOKING_READ_OWN'] }
        ];
        this.loading = false;
      }
    });
  }
}
