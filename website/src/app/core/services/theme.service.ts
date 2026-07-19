import { Injectable, PLATFORM_ID, Inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export type AppTheme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isBrowser: boolean;
  private currentThemeSubject = new BehaviorSubject<AppTheme>('dark');
  public currentTheme$: Observable<AppTheme> = this.currentThemeSubject.asObservable();
  public currentThemeSignal = signal<AppTheme>('dark');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    let initialTheme: AppTheme = 'dark';
    if (this.isBrowser) {
      const saved = localStorage.getItem('ankorbook_theme') as AppTheme;
      if (saved && (saved === 'dark' || saved === 'light')) {
        initialTheme = saved;
      }
    }

    this.setTheme(initialTheme);
  }

  get theme(): AppTheme {
    return this.currentThemeSubject.value;
  }

  get isDark(): boolean {
    return this.theme === 'dark';
  }

  toggleTheme(): void {
    const nextTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  setTheme(theme: AppTheme): void {
    this.currentThemeSubject.next(theme);
    this.currentThemeSignal.set(theme);

    if (this.isBrowser) {
      localStorage.setItem('ankorbook_theme', theme);
      if (theme === 'light') {
        document.documentElement.classList.add('light-mode');
        document.documentElement.classList.remove('dark-mode');
      } else {
        document.documentElement.classList.add('dark-mode');
        document.documentElement.classList.remove('light-mode');
      }
    }
  }
}
