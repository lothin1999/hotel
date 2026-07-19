import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, ViewChild, ElementRef, HostListener } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  templateUrl: './custom-cursor.html',
  styleUrls: ['./custom-cursor.scss']
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  @ViewChild('cursorTrail', { static: true }) cursorTrail!: ElementRef<HTMLDivElement>;
  @ViewChild('cursorRing', { static: true }) cursorRing!: ElementRef<HTMLDivElement>;
  @ViewChild('cursorDot', { static: true }) cursorDot!: ElementRef<HTMLDivElement>;

  private isBrowser: boolean;
  private animFrameId?: number;
  
  // Target positions
  private cx = 0;
  private cy = 0;
  // Current interpolated positions
  private rx = 0;
  private ry = 0;
  private tx = 0;
  private ty = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private elementRef: ElementRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.document.body.classList.add('use-custom-cursor');
      // Append host element directly to document.body to escape app-root stacking contexts
      this.document.body.appendChild(this.elementRef.nativeElement);
      this.animateCursor();
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.document.body.classList.remove('use-custom-cursor');
      if (this.elementRef.nativeElement.parentNode === this.document.body) {
        this.document.body.removeChild(this.elementRef.nativeElement);
      }
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
      }
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    if (!this.isBrowser) return;
    this.cx = e.clientX;
    this.cy = e.clientY;
    
    // Proactively keep the custom cursor at the end of body children list to overlay dialogs
    if (this.document.body.lastChild !== this.elementRef.nativeElement) {
      this.document.body.appendChild(this.elementRef.nativeElement);
    }
  }

  @HostListener('window:mousedown')
  onMouseDown(): void {
    if (!this.isBrowser) return;
    this.document.body.classList.add('cursor-click');
  }

  @HostListener('window:mouseup')
  onMouseUp(): void {
    if (!this.isBrowser) return;
    this.document.body.classList.remove('cursor-click');
  }

  @HostListener('window:mouseover', ['$event'])
  onMouseOver(e: MouseEvent): void {
    if (!this.isBrowser) return;
    const target = e.target as HTMLElement;
    if (!target) return;

    const interactEls = 'a, button, .suite-card, .exp-item, .gallery-cell, .moto-card, .testi-avatar, .custom-select-display, .custom-option, .f-stepper, .suite-nav-btn, .tab-btn';
    
    if (target.closest(interactEls)) {
      this.document.body.classList.add('cursor-hover');
      if (target.closest('a') || target.closest('.suite-reserve-btn') || target.closest('button')) {
        this.document.body.classList.add('cursor-link');
      }
    }
  }

  @HostListener('window:mouseout', ['$event'])
  onMouseOut(e: MouseEvent): void {
    if (!this.isBrowser) return;
    const target = e.target as HTMLElement;
    if (!target) return;

    const interactEls = 'a, button, .suite-card, .exp-item, .gallery-cell, .moto-card, .testi-avatar, .custom-select-display, .custom-option, .f-stepper, .suite-nav-btn, .tab-btn';
    
    if (target.closest(interactEls)) {
      this.document.body.classList.remove('cursor-hover', 'cursor-link');
    }
  }

  private animateCursor = (): void => {
    if (!this.isBrowser) return;

    // Smooth interpolation (lerp)
    this.rx += (this.cx - this.rx) * 0.12;
    this.ry += (this.cy - this.ry) * 0.12;
    
    this.tx += (this.cx - this.tx) * 0.06;
    this.ty += (this.cy - this.ty) * 0.06;

    if (this.cursorDot) {
      this.cursorDot.nativeElement.style.left = `${this.cx}px`;
      this.cursorDot.nativeElement.style.top = `${this.cy}px`;
    }
    if (this.cursorRing) {
      this.cursorRing.nativeElement.style.left = `${this.rx}px`;
      this.cursorRing.nativeElement.style.top = `${this.ry}px`;
    }
    if (this.cursorTrail) {
      this.cursorTrail.nativeElement.style.left = `${this.tx}px`;
      this.cursorTrail.nativeElement.style.top = `${this.ty}px`;
    }

    this.animFrameId = requestAnimationFrame(this.animateCursor);
  };
}
