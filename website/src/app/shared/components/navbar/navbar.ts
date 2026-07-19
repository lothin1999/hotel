import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { HlmDialogService } from '../../../components/ui/dialog/src';
import { AuthModalComponent } from '../../../features/auth/components/auth-modal/auth-modal';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  providers: [HlmDialogService]
})
export class NavbarComponent implements OnInit, OnDestroy {
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  isLoggedIn = signal(false);
  userDisplayName = signal('');
  userPhotoUrl = signal('');
  
  private authSubscription?: Subscription;
  private isBrowser: boolean;

  constructor(
    private authService: AuthService,
    private dialogService: HlmDialogService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      window.addEventListener('scroll', this.onScroll);
    }
    
    this.authSubscription = this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn.set(!!user);
      if (user) {
        this.userDisplayName.set(user.displayName || 'Guest');
        this.userPhotoUrl.set(user.photoURL || '');
      } else {
        this.userDisplayName.set('');
        this.userPhotoUrl.set('');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('scroll', this.onScroll);
    }
    this.authSubscription?.unsubscribe();
  }

  private onScroll = (): void => {
    this.isScrolled.set(window.scrollY > 80);
  };

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(val => !val);
    if (this.isBrowser) {
      if (this.isMobileMenuOpen()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
    if (this.isBrowser) {
      document.body.style.overflow = '';
    }
  }

  openAuth(): void {
    this.closeMobileMenu();
    this.dialogService.open(AuthModalComponent, {
      contentClass: 'max-w-4xl w-full border-none bg-transparent shadow-none',
      showCloseButton: false
    });
  }

  navigateToFragment(fragment: string): void {
    this.closeMobileMenu();
    this.router.navigate(['/'], { fragment });
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['/']);
    });
  }
}
