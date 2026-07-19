import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { DataService, TestimonialItem } from '../../../../core/services/data.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrls: ['./testimonials.scss']
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  currentIndex = signal(0);
  private intervalId: any;
  private isBrowser: boolean;

  testimonials: TestimonialItem[] = [];

  constructor(
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.dataService.getTestimonials().subscribe(data => {
      this.testimonials = data;
    });

    if (this.isBrowser) {
      this.startRotation();
    }
  }

  ngOnDestroy(): void {
    this.stopRotation();
  }

  select(idx: number): void {
    this.currentIndex.set(idx);
    if (this.isBrowser) {
      this.stopRotation();
      this.startRotation();
    }
  }

  private startRotation(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex.set((this.currentIndex() + 1) % this.testimonials.length);
    }, 6000);
  }

  private stopRotation(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
