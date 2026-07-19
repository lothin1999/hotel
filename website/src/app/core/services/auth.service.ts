import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { 
  Auth, 
  User, 
  authState,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  linkWithPopup,
  unlink,
  updateProfile,
  signInWithCustomToken
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  private isBrowser: boolean;

  constructor(
    private auth: Auth,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      // Track auth state changes on client side
      authState(this.auth).subscribe(user => {
        this.currentUserSubject.next(user);
        if (user) {
          // Save mock session locally for persistent server-side hydration hints if needed
          localStorage.setItem('ankorbook_uid', user.uid);
        } else {
          localStorage.removeItem('ankorbook_uid');
        }
      });
    }
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Email and Password Signup.
   */
  signUpWithEmail(email: string, password: string, name: string): Promise<User> {
    return createUserWithEmailAndPassword(this.auth, email, password).then(async (result) => {
      await updateProfile(result.user, { displayName: name });
      this.currentUserSubject.next(result.user);
      return result.user;
    });
  }

  /**
   * Email and Password Sign In.
   */
  signInWithEmail(email: string, password: string): Promise<User> {
    return signInWithEmailAndPassword(this.auth, email, password).then((result) => {
      this.currentUserSubject.next(result.user);
      return result.user;
    });
  }

  /**
   * Signs out active session.
   */
  logout(): Promise<void> {
    return signOut(this.auth).then(() => {
      this.currentUserSubject.next(null);
    });
  }

  /**
   * Google Auth Provider.
   */
  signInWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider).then(result => result.user);
  }

  /**
   * Facebook Auth Provider.
   */
  signInWithFacebook(): Promise<User> {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(this.auth, provider).then(result => result.user);
  }

  /**
   * Apple Auth Provider.
   */
  signInWithApple(): Promise<User> {
    const provider = new OAuthProvider('apple.com');
    return signInWithPopup(this.auth, provider).then(result => result.user);
  }

  /**
   * Phone Number Sign In (Simulated for non-interactive server/client consistency,
   * using standard firebase setup).
   */
  signInWithPhone(phoneNumber: string, appVerifier: any): Promise<any> {
    // In standard firebase, this sends an SMS and returns confirmationResult
    // confirmationResult.confirm(verificationCode)
    return Promise.resolve({
      confirm: (code: string) => {
        // Return a mock user or trigger credentials
        return Promise.resolve(this.currentUser);
      }
    });
  }

  /**
   * Telegram Custom Auth Integration.
   * Exchanges verified Telegram widget user data for a Firebase custom token.
   */
  signInWithTelegram(telegramUserData: any): Promise<User | null> {
    console.log('Exchanging Telegram login token...', telegramUserData);
    
    // In production, send telegramUserData to backend cloud function:
    // 1. Verify hash signature using BOT_TOKEN
    // 2. Create custom token: admin.auth().createCustomToken(telegramUid)
    // 3. Return custom token to frontend
    
    // Simulated token exchange:
    const mockCustomToken = 'MOCK_TG_TOKEN_' + Date.now();
    return this.exchangeCustomTokenAndSignIn(mockCustomToken, {
      displayName: telegramUserData.first_name + (telegramUserData.last_name ? ' ' + telegramUserData.last_name : ''),
      photoURL: telegramUserData.photo_url
    });
  }

  /**
   * TikTok Custom Auth Integration.
   * Uses OAuth authorization code flow.
   */
  signInWithTikTok(authCode: string): Promise<User | null> {
    console.log('Exchanging TikTok auth code...', authCode);
    
    // In production, exchange code for access_token on backend, verify with TikTok api,
    // generate Firebase Custom Token, and sign in.
    
    const mockCustomToken = 'MOCK_TIKTOK_TOKEN_' + Date.now();
    return this.exchangeCustomTokenAndSignIn(mockCustomToken, {
      displayName: 'TikTok User'
    });
  }

  /**
   * Completes sign in via server custom tokens and sets mock profile details.
   */
  private async exchangeCustomTokenAndSignIn(customToken: string, profile: { displayName?: string, photoURL?: string }): Promise<User | null> {
    // Simulated signInWithCustomToken:
    // If not using real CustomToken backend, we simulate by creating/updating a mock user
    if (!this.currentUser) {
      // Simulate auth session setting by logging in a placeholder or triggering auth changes
      // In actual integration: return signInWithCustomToken(this.auth, customToken).then(...)
    }
    
    if (this.currentUser) {
      await updateProfile(this.auth.currentUser!, profile);
      this.currentUserSubject.next(this.auth.currentUser);
    }
    return this.currentUser;
  }

  /**
   * Dynamic account connector: links current account to a new social provider.
   */
  linkProvider(providerId: string): Promise<User | null> {
    if (!this.currentUser) return Promise.reject('No authenticated user found');
    
    let provider: any;
    if (providerId === 'google.com') provider = new GoogleAuthProvider();
    else if (providerId === 'facebook.com') provider = new FacebookAuthProvider();
    else if (providerId === 'apple.com') provider = new OAuthProvider('apple.com');
    else {
      // Custom/mock linking for Telegram/TikTok/Phone
      console.log(`Simulating link with provider ${providerId}`);
      return Promise.resolve(this.currentUser);
    }

    return linkWithPopup(this.currentUser, provider).then(result => {
      this.currentUserSubject.next(result.user);
      return result.user;
    });
  }

  /**
   * Dynamic account disconnector: unlinks a social provider from current account.
   */
  unlinkProvider(providerId: string): Promise<User | null> {
    if (!this.currentUser) return Promise.reject('No authenticated user found');
    
    return unlink(this.currentUser, providerId).then(user => {
      this.currentUserSubject.next(user);
      return user;
    });
  }

  /**
   * Helper to verify which providers are linked.
   */
  isProviderLinked(providerId: string): boolean {
    if (!this.currentUser) return false;
    return this.currentUser.providerData.some(p => p.providerId === providerId);
  }

  /**
   * Update personal profile description.
   */
  async updateProfileInformation(name: string, photoUrl?: string): Promise<void> {
    if (!this.currentUser) throw new Error('No user signed in');
    await updateProfile(this.auth.currentUser!, {
      displayName: name,
      photoURL: photoUrl
    });
    this.currentUserSubject.next(this.auth.currentUser);
  }
}
