import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../core/services/admin.service';
import { Booking } from '../../core/models/booking.model';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bookings.html',
  styleUrl: './bookings.scss'
})
export class BookingsComponent implements OnInit {
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  loading = false;

  // Search/Filters
  searchQuery = '';
  statusFilter = 'all';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.loading = true;
    this.adminService.getBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        // Fallback mock history if backend is offline
        this.bookings = [
          { id: 1, customerName: 'Isabelle Moreau', customerEmail: 'isabelle@moreau.fr', roomName: 'Horizon Ocean Villa', checkIn: '2026-05-10', checkOut: '2026-05-15', totalAmount: 2040, status: 'CONFIRMED' },
          { id: 2, customerName: 'Isabelle Moreau', customerEmail: 'isabelle@moreau.fr', roomName: 'Obsidian Garden Suite', checkIn: '2026-06-01', checkOut: '2026-06-04', totalAmount: 570, status: 'CONFIRMED' }
        ];
        this.applyFilters();
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredBookings = this.bookings.filter(b => {
      const query = this.searchQuery.toLowerCase();
      const ref = (b as any).reference || ('#BK-' + b.id);
      const name = b.customerName || (b as any).guestName || '';
      const email = b.customerEmail || (b as any).guestEmail || '';

      const matchesSearch = ref.toLowerCase().includes(query) ||
                            name.toLowerCase().includes(query) ||
                            email.toLowerCase().includes(query);
      
      const matchesStatus = this.statusFilter === 'all' || (b.status || '').toLowerCase() === this.statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }

  updateStatus(id: number, status: string): void {
    this.adminService.updateBookingStatus(id, status).subscribe({
      next: () => this.loadBookings(),
      error: (err) => alert('Failed to update status: ' + (err.error?.message || err.message))
    });
  }

  deleteBooking(id: number): void {
    if (confirm('Are you sure you want to delete this booking record?')) {
      this.adminService.deleteBooking(id).subscribe({
        next: () => this.loadBookings(),
        error: (err) => alert('Failed to delete booking: ' + (err.error?.message || err.message))
      });
    }
  }
}
