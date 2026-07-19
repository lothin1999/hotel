import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { BookingService, BookingItem } from '../../../../core/services/booking.service';
import { fmtMoney } from '../../../../core/helpers/utils';

@Component({
  selector: 'app-profile-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-dashboard.html',
  styleUrls: ['./profile-dashboard.scss']
})
export class ProfileDashboardComponent implements OnInit, OnDestroy {
  activeSection: 'history' | 'settings' | 'connections' = 'history';
  
  // Settings edit form
  displayName = '';
  photoURL = '';
  isSavingInfo = false;

  // Linked status helper list
  socialProviders = [
    { id: 'google.com', name: 'Google (Gmail)', icon: '🌐' },
    { id: 'facebook.com', name: 'Facebook', icon: '👤' },
    { id: 'apple.com', name: 'Apple ID', icon: '' },
    { id: 'phone', name: 'Phone Number', icon: '📱' },
    { id: 'telegram', name: 'Telegram Bot', icon: '✈' },
    { id: 'tiktok', name: 'TikTok Creator', icon: '♪' }
  ];

  bookings: BookingItem[] = [];
  
  private userSubscription?: Subscription;
  private bookingsSubscription?: Subscription;
  private isBrowser: boolean;

  // Preset luxury profile avatar options
  avatarPresets = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
  ];

  constructor(
    public authService: AuthService,
    private bookingService: BookingService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Lock out guest users
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.displayName = user.displayName || '';
        this.photoURL = user.photoURL || '';
      } else {
        if (this.isBrowser) {
          // If no auth on client, redirect to home and open auth
          this.router.navigate(['/']);
        }
      }
    });

    this.bookingsSubscription = this.bookingService.history$.subscribe(data => {
      this.bookings = data;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.bookingsSubscription?.unsubscribe();
  }

  setSection(section: 'history' | 'settings' | 'connections'): void {
    this.activeSection = section;
  }

  formatVal(val: number): string {
    return fmtMoney(val);
  }

  selectAvatar(url: string): void {
    this.photoURL = url;
  }

  async savePersonalInformation(): Promise<void> {
    if (this.isSavingInfo) return;
    this.isSavingInfo = true;
    try {
      await this.authService.updateProfileInformation(this.displayName, this.photoURL);
      alert('Profile details updated successfully.');
    } catch (e: any) {
      alert('Error updating profile: ' + e.message);
    } finally {
      this.isSavingInfo = false;
    }
  }

  // Cryptographic/mock linking controls
  async toggleConnection(providerId: string): Promise<void> {
    const isLinked = this.authService.isProviderLinked(providerId);
    try {
      if (isLinked) {
        if (confirm(`Are you sure you want to disconnect ${providerId}?`)) {
          await this.authService.unlinkProvider(providerId);
          alert(`Successfully disconnected ${providerId}`);
        }
      } else {
        // Link account via popup or mock credentials
        await this.authService.linkProvider(providerId);
        alert(`Successfully linked ${providerId}`);
      }
    } catch (e: any) {
      alert('Account connection modification failed: ' + e.message);
    }
  }

  // Cancel reservation
  async cancelReservation(id: string): Promise<void> {
    if (confirm('Are you sure you want to cancel this booking reservation? There is no charge for cancellations.')) {
      await this.bookingService.cancelBooking(id);
      alert('Reservation cancelled.');
    }
  }
}
