import { Component, AfterViewInit, Inject, PLATFORM_ID, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss']
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroBg', { static: true }) heroBg!: ElementRef<HTMLDivElement>;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
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
