import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.html',
  styleUrls: ['./loader.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  progress = signal(0);
  isLoaded = signal(false);
  private intervalId: any;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      this.isLoaded.set(true); // Skip loading display during SSR
      return;
    }

    document.body.classList.add('loading');
    
    // Simulate loading percentage increments
    this.intervalId = setInterval(() => {
      this.progress.update(val => Math.min(val + Math.floor(Math.random() * 15) + 1, 99));
    }, 120);

    // Wait until full page loading completes
    if (document.readyState === 'complete') {
      this.completeLoader();
    } else {
      window.addEventListener('load', this.completeLoader);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.clearLoaderEvents();
    }
  }

  private completeLoader = (): void => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.progress.set(100);
    
    // Smooth transition matching the original delay
    setTimeout(() => {
      this.isLoaded.set(true);
      document.body.classList.remove('loading');
      this.clearLoaderEvents();
    }, 1200);
  };

  private clearLoaderEvents(): void {
    window.removeEventListener('load', this.completeLoader);
  }
}
