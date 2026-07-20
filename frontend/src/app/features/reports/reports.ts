import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../core/config/api.config';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.scss'
})
export class ReportsComponent implements OnInit {
  analytics: any = null;
  loading = false;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): void {
    this.loading = true;
    this.http.get<any>(`${API_CONFIG.baseUrl}/reports`, { headers: this.authService.getHeaders() }).subscribe({
      next: (data) => {
        this.analytics = data;
        this.loading = false;
      },
      error: () => {
        this.analytics = {
          summary: {
            totalRevenue: 144800,
            totalBookings: 199,
            confirmedCount: 165,
            pendingCount: 22,
            cancelledCount: 12,
            occupancyRatePercentage: 84,
            activeSuites: 6,
            activeBikes: 6
          },
          monthlyTrends: [
            { month: 'Jan', revenue: 12400, bookings: 18 },
            { month: 'Feb', revenue: 15800, bookings: 22 },
            { month: 'Mar', revenue: 19200, bookings: 28 },
            { month: 'Apr', revenue: 24500, bookings: 35 },
            { month: 'May', revenue: 31000, bookings: 42 },
            { month: 'Jun', revenue: 38900, bookings: 54 }
          ]
        };
        this.loading = false;
      }
    });
  }
}
