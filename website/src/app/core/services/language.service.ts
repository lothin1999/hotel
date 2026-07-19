import { Injectable, PLATFORM_ID, Inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

import enTranslations from '../../../../public/locales/en.json';
import khTranslations from '../../../../public/locales/kh.json';
import zhTranslations from '../../../../public/locales/zh.json';

export type SupportedLang = 'en' | 'kh' | 'zh';

export interface LanguageOption {
  code: SupportedLang;
  name: string;
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private isBrowser: boolean;

  readonly languages: LanguageOption[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'kh', name: 'ភាសាខ្មែរ', flag: '🇰🇭' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];

  private currentLangSubject = new BehaviorSubject<SupportedLang>('en');
  public currentLang$: Observable<SupportedLang> = this.currentLangSubject.asObservable();
  public currentLangSignal = signal<SupportedLang>('en');

  private translations: Record<SupportedLang, any> = {
    en: enTranslations,
    kh: khTranslations,
    zh: zhTranslations
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    let initialLang: SupportedLang = 'en';
    if (this.isBrowser) {
      const saved = localStorage.getItem('ankorbook_lang') as SupportedLang;
      if (saved && (saved === 'en' || saved === 'kh' || saved === 'zh')) {
        initialLang = saved;
      }
    }
    
    this.setLanguage(initialLang);
  }

  get currentLang(): SupportedLang {
    return this.currentLangSubject.value;
  }

  setLanguage(lang: SupportedLang): void {
    this.currentLangSubject.next(lang);
    this.currentLangSignal.set(lang);

    if (this.isBrowser) {
      localStorage.setItem('ankorbook_lang', lang);
      document.documentElement.lang = lang === 'kh' ? 'km' : lang;

      // Update DOM classes immediately for 0ms font switching
      document.documentElement.classList.remove('lang-en', 'lang-kh', 'lang-zh', 'lang-km');
      document.body.classList.remove('lang-en', 'lang-kh', 'lang-zh', 'lang-km');
      
      const langClass = `lang-${lang}`;
      document.documentElement.classList.add(langClass);
      document.body.classList.add(langClass);
      if (lang === 'kh') {
        document.documentElement.classList.add('lang-km');
        document.body.classList.add('lang-km');
      }
    }
  }

  translate(key: string): string {
    const lang = this.currentLang;
    const dict = this.translations[lang] || this.translations['en'];

    // Resolve dot notation e.g. "nav.suites"
    const parts = key.split('.');
    let val: any = dict;
    for (const p of parts) {
      if (val && typeof val === 'object' && p in val) {
        val = val[p];
      } else {
        // Fallback to English dictionary if key missing in target lang
        let fallbackVal: any = this.translations['en'];
        for (const fp of parts) {
          if (fallbackVal && typeof fallbackVal === 'object' && fp in fallbackVal) {
            fallbackVal = fallbackVal[fp];
          } else {
            return key;
          }
        }
        return typeof fallbackVal === 'string' ? fallbackVal : key;
      }
    }

    return typeof val === 'string' ? val : key;
  }
}
