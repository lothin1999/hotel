import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { routes } from './app.routes';

// Mock credentials for Firebase project initialization.
// Will be parsed automatically by AngularFire on startup.
const firebaseConfig = {
  apiKey: "AIzaSyFakeKey_VelourResortPlaceholder",
  authDomain: "velour-resort-fake.firebaseapp.com",
  projectId: "velour-resort-fake",
  storageBucket: "velour-resort-fake.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    
    // Enable fragment scrolls & history offsets
    provideRouter(
      routes, 
      withInMemoryScrolling({ 
        anchorScrolling: 'enabled', 
        scrollPositionRestoration: 'enabled' 
      })
    ),
    
    provideClientHydration(),
    
    // Provision Firebase services
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth())
  ]
};
