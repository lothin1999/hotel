import { Component, AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.html',
  styleUrls: ['./about.scss']
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      gsap.registerPlugin(ScrollTrigger);

      // Animate the image frame on the left
      gsap.fromTo('.about-media-trigger', 
        { opacity: 0, x: -60 }, 
        {
          opacity: 1, 
          x: 0, 
          duration: 1.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-media-trigger',
            start: 'top 85%'
          }
        }
      );

      // Animate the text description on the right
      gsap.fromTo('.about-text-trigger', 
        { opacity: 0, x: 60 }, 
        {
          opacity: 1, 
          x: 0, 
          duration: 1.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-text-trigger',
            start: 'top 85%'
          }
        }
      );

      // Stagger animate the columns/pillars list
      gsap.fromTo('.about-pillar-card', 
        { opacity: 0, y: 40 }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-pillars-trigger',
            start: 'top 80%'
          }
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      // Clean up triggers to prevent leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }
}
