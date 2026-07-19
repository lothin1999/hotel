import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../core/services/language.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private subscription?: Subscription;

  constructor(
    private langService: LanguageService,
    private cdr: ChangeDetectorRef
  ) {
    // Force change detection across all elements using the pipe when language changes
    this.subscription = this.langService.currentLang$.subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  transform(key: string): string {
    return this.langService.translate(key);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
