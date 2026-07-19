import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, ElementRef, ViewChild, OnDestroy, computed } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { DataService, HeroData } from '../../../../core/services/data.service';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss']
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroBg', { static: true }) heroBg!: ElementRef<HTMLDivElement>;
  private isBrowser: boolean;

  heroData?: HeroData;

  darkImages: string[] = [
    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1920&q=90&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&q=90&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1920&q=90&auto=format&fit=crop'
  ];

  lightImages: string[] = [
    'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=1920&q=90&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1920&q=90&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=90&auto=format&fit=crop'
  ];

  currentSlideIndex = 0;
  private carouselInterval: any;

  activeImages = computed(() => {
    const isDark = this.themeService.currentThemeSignal() === 'dark';
    return isDark ? this.darkImages : this.lightImages;
  });

  constructor(
    private dataService: DataService,
    public themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.dataService.getHeroData().subscribe(data => {
      this.heroData = data;
    });
    this.startCarousel();
  }

  private startCarousel(): void {
    if (this.isBrowser) {
      this.carouselInterval = setInterval(() => {
        this.currentSlideIndex = (this.currentSlideIndex + 1) % this.activeImages().length;
      }, 6000);
    }
  }

  getStarsArray(count?: number): number[] {
    return Array(count || 5).fill(0);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      // GSAP entrance timeline matching load transition
      const tl = gsap.timeline({ delay: 1.5 });
      
      tl.fromTo('.hero-overline', 
        { opacity: 0, y: 24 }, 
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
      )
      .fromTo('.hl', 
        { opacity: 0, y: '110%', skewY: 3 }, 
        { opacity: 1, y: '0%', skewY: 0, duration: 1.1, ease: 'power4.out', stagger: 0.18 }, 
        '-=0.6'
      )
      .fromTo('.hero-desc', 
        { opacity: 0, y: 24 }, 
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 
        '-=0.8'
      )
      .fromTo('.hero-actions', 
        { opacity: 0, y: 24 }, 
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 
        '-=0.8'
      )
      .fromTo('.hero-stats', 
        { opacity: 0, y: 24 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 
        '-=0.7'
      )
      .fromTo('.hero-scroll-indicator', 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.8 }, 
        '-=0.8'
      )
      .fromTo('.hero-award-card', 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 
        '-=1.0'
      );

      // Scroll listener for Parallax
      window.addEventListener('scroll', this.onScroll, { passive: true });
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('scroll', this.onScroll);
    }
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  private onScroll = (): void => {
    if (this.heroBg && this.heroBg.nativeElement) {
      this.heroBg.nativeElement.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }
  };

  scrollToBooking(): void {
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToSuites(): void {
    const el = document.getElementById('suites');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
