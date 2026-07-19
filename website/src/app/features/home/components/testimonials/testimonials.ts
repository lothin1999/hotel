import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

interface TestimonialItem {
  name: string;
  location: string;
  suite: string;
  image: string;
  rating: number;
  text: string;
  stayDuration: string;
  date: string;
}

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

  testimonials: TestimonialItem[] = [
    {
      name: 'Isabelle Moreau',
      location: 'Paris, France',
      suite: 'Clifftop Penthouse',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&q=80&auto=format&fit=crop',
      rating: 5,
      text: 'The penthouse suite overlooking the volcanic cliffs was beyond any superlative I have available. To wake each morning and descend into that infinity pool — suspended between sky and sea — is an experience no hotel on earth has replicated for me since.',
      stayDuration: '7 Nights',
      date: 'October 2024'
    },
    {
      name: 'James & Sofia Chen',
      location: 'Singapore',
      suite: 'Combo Package',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&q=80&auto=format&fit=crop',
      rating: 5,
      text: 'Renting the Ducati and riding the coastal highway at sunrise on our honeymoon morning was, without any hesitation, the single most alive I have felt in years. The gear was impeccable, the curated route was perfect, and Ankor Book somehow made every moment feel personal.',
      stayDuration: '5 Nights',
      date: 'February 2025'
    },
    {
      name: 'Marcus Olsen',
      location: 'Oslo, Norway',
      suite: 'Overwater Villa',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80&auto=format&fit=crop',
      rating: 5,
      text: 'Three nights in the overwater villa with a BMW G310GS for island exploration entirely transformed my understanding of what luxury actually is. Ankor Book understands that true luxury is the freedom to feel something — not merely to possess comfort. I return every year.',
      stayDuration: '3 Nights',
      date: 'January 2025'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
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
