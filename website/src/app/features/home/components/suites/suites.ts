import { Component, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { BookingService } from '../../../../core/services/booking.service';

interface SuiteItem {
  no: string;
  name: string;
  size: string;
  price: number;
  image: string;
  badge?: string;
  tags: string[];
}

@Component({
  selector: 'app-suites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suites.html',
  styleUrls: ['./suites.scss']
})
export class SuitesComponent {
  currentIndex = 0;
  cardWidth = 396; // 380px width + 16px gap
  totalCards = 6;
  private isBrowser: boolean;
  private touchStartX = 0;

  suites: SuiteItem[] = [
    {
      no: '01 / 06',
      name: 'Obsidian Garden',
      size: '60m² · Garden & Pool',
      price: 190,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85&auto=format&fit=crop',
      tags: ['King Bed', 'Rain Shower', 'Garden View', 'Butler']
    },
    {
      no: '02 / 06',
      name: 'Horizon Ocean Villa',
      size: '110m² · Oceanfront',
      price: 340,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=85&auto=format&fit=crop',
      badge: 'Most Popular',
      tags: ['King Bed', 'Plunge Pool', 'Ocean View', 'Private Terrace']
    },
    {
      no: '03 / 06',
      name: 'Clifftop Penthouse',
      size: '200m² · 360° Views',
      price: 520,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=85&auto=format&fit=crop',
      tags: ['2 Suites', '360° Terrace', 'Private Chef', 'Jacuzzi']
    },
    {
      no: '04 / 06',
      name: 'Overwater Lagoon Villa',
      size: '130m² · Above the Lagoon',
      price: 440,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=85&auto=format&fit=crop',
      tags: ['Glass Floor', 'Lagoon Access', 'Hammock Deck', 'Sunset View']
    },
    {
      no: '05 / 06',
      name: 'Canopy Forest Retreat',
      size: '80m² · Treetop Level',
      price: 260,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=85&auto=format&fit=crop',
      tags: ['King Bed', 'Open Bath', 'Treetop Walk', 'Forest Sounds']
    },
    {
      no: '06 / 06',
      name: 'Imperial Residence',
      size: '400m² · Private Estate',
      price: 780,
      image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&q=85&auto=format&fit=crop',
      badge: 'Signature',
      tags: ['3 Rooms', 'Private Beach', 'Full Butler', 'Cinema Room']
    }
  ];

  constructor(
    private bookingService: BookingService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
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
