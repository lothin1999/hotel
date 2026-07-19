import { Component, OnInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { BookingService } from '../../../../core/services/booking.service';
import { DataService, SuiteItem } from '../../../../core/services/data.service';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-suites',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
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

    if (this.isBrowser) {
      this.updateCardWidth();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) {
      this.updateCardWidth();
    }
  }

  private updateCardWidth(): void {
    if (typeof window !== 'undefined') {
      this.cardWidth = window.innerWidth <= 640 ? 316 : 396;
    }
  }

  goTo(idx: number): void {
    this.currentIndex = Math.max(0, Math.min(idx, this.totalCards - 1));
  }

  next(): void {
    if (this.currentIndex < this.totalCards - 1) {
      this.goTo(this.currentIndex + 1);
    } else {
      this.goTo(0);
    }
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.goTo(this.currentIndex - 1);
    } else {
      this.goTo(this.totalCards - 1);
    }
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
