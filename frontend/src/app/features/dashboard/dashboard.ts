import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../core/services/admin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  roomsCount = 0;
  bikesCount = 0;
  bookingsCount = 0;
  totalRevenue = 0;
  recentBookings: any[] = [];
  loading = true;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;
    
    this.adminService.getBookings().subscribe({
      next: (bookings) => {
        this.bookingsCount = bookings.length;
        this.recentBookings = bookings.slice(0, 5);
        this.totalRevenue = bookings
          .filter(b => b.status !== 'CANCELLED')
          .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

        this.adminService.getRooms().subscribe({
          next: (rooms) => {
            this.roomsCount = rooms.length;
          }
        });

        this.adminService.getBikes().subscribe({
          next: (bikes) => {
            this.bikesCount = bikes.length;
            this.loading = false;
          }
        });
      },
      error: () => {
        // Fallback demo data
        this.bookingsCount = 2;
        this.recentBookings = [
          { reference: 'VEL-OR8K39', guestName: 'Isabelle Moreau', title: 'Horizon Ocean Villa', total: 2040, status: 'completed', createdAt: new Date() },
          { reference: 'VEL-TG941A', guestName: 'Isabelle Moreau', title: 'Obsidian Garden Suite', total: 570, status: 'completed', createdAt: new Date() }
        ];
        this.totalRevenue = 2610;
        this.roomsCount = 6;
        this.bikesCount = 6;
        this.loading = false;
      }
    });
  }
}
