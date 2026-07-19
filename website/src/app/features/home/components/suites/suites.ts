import { Component, OnInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { BookingService } from '../../../../core/services/booking.service';
import { DataService, SuiteItem } from '../../../../core/services/data.service';

@Component({
  selector: 'app-suites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suites.html',
  styleUrls: ['./suites.scss']
})
export class SuitesComponent implements OnInit {
  currentIndex = 0;
  cardWidth = 396; // 380px width + 16px gap
  totalCards = 6;
  private isBrowser: boolean;
  private touchStartX = 0;

  suites: SuiteItem[] = [];

  constructor(
    private bookingService: BookingService,
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.dataService.getSuites().subscribe(data => {
      this.suites = data;
      this.totalCards = data.length;
    });
  }

  goTo(idx: number): void {
    this.currentIndex = Math.max(0, Math.min(idx, this.totalCards - 1));
  }

  next(): void {
    this.goTo((this.currentIndex + 1) % this.totalCards);
  }

  prev(): void {
    this.goTo((this.currentIndex - 1 + this.totalCards) % this.totalCards);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if (!this.isBrowser) return;
    if (e.key === 'ArrowRight') this.next();
    if (e.key === 'ArrowLeft') this.prev();
  }

  onTouchStart(e: TouchEvent): void {
    this.touchStartX = e.touches[0].clientX;
  }

  onTouchEnd(e: TouchEvent): void {
    const diff = this.touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) this.next();
      else this.prev();
    }
  }

  reserveSuite(suite: SuiteItem): void {
    // Set active draft in booking service and scroll to booking form
    this.bookingService.setActiveDraft({
      type: 'hotel',
      title: suite.name,
      ratePerUnit: suite.price
    });
    
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
