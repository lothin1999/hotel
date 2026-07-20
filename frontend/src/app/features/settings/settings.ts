import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../core/config/api.config';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class SettingsComponent implements OnInit {
  settings: any = {
    hotelName: 'Ankor Luxury Resort & Villas',
    tagline: 'Sanctuary of Modern Elegance & Heritage',
    contactEmail: 'concierge@ankorbook.com',
    contactPhone: '+855 23 888 999',
    currency: 'USD',
    taxRate: 10,
    maintenanceMode: false,
    enableBikeRentals: true,
    autoConfirmBookings: false
  };

  loading = false;
  saving = false;
  successMsg = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    this.loading = true;
    this.http.get<any>(`${API_CONFIG.baseUrl}/settings`, { headers: this.authService.getHeaders() }).subscribe({
      next: (data) => {
        if (data) {
          this.settings = { ...this.settings, ...data };
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    this.saving = true;
    this.successMsg = '';

    this.http.put<any>(`${API_CONFIG.baseUrl}/settings`, this.settings, { headers: this.authService.getHeaders() }).subscribe({
      next: (res) => {
        this.settings = res;
        this.saving = false;
        this.successMsg = 'Settings saved successfully!';
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: (err) => {
        this.saving = false;
        alert('Failed to save settings: ' + (err.error?.message || err.message));
      }
    });
  }
}
