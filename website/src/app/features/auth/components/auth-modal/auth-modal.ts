import { Component, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { BrnDialogRef } from '@spartan-ng/brain/dialog';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-modal.html',
  styleUrls: ['./auth-modal.scss']
})
export class AuthModalComponent implements OnInit {
  authMode: 'login' | 'register' | 'phone' = 'login';
  
  // Email form
  email = '';
  password = '';
  displayName = '';
  
  // Phone form
  phoneNumber = '';
  verificationCode = '';
  isVerificationSent = false;
  confirmationResult: any = null;

  isPending = false;

  constructor(
    private authService: AuthService,
    @Optional() private dialogRef?: BrnDialogRef // Inject optionally in case loaded outside dialog contexts
  ) {}

  ngOnInit(): void {}

  setMode(mode: 'login' | 'register' | 'phone'): void {
    this.authMode = mode;
    this.isVerificationSent = false;
  }

  async handleEmailAuth(): Promise<void> {
    if (this.isPending) return;
    this.isPending = true;

    try {
      if (this.authMode === 'login') {
        await this.authService.signInWithEmail(this.email, this.password);
        alert('Welcome back to Ankor Book.');
      } else {
        await this.authService.signUpWithEmail(this.email, this.password, this.displayName);
        alert('Your Ankor Book account has been created.');
      }
      this.closeModal();
    } catch (e: any) {
      alert('Authentication failed: ' + e.message);
    } finally {
      this.isPending = false;
    }
  }

  // Social SSO actions
  async loginWithGoogle(): Promise<void> {
    this.runSocialLogin(() => this.authService.signInWithGoogle());
  }

  async loginWithFacebook(): Promise<void> {
    this.runSocialLogin(() => this.authService.signInWithFacebook());
  }

  async loginWithApple(): Promise<void> {
    this.runSocialLogin(() => this.authService.signInWithApple());
  }

  // Simulated custom SSO flows
  async loginWithTelegram(): Promise<void> {
    this.runSocialLogin(() => {
      // Simulate payload from Telegram login widget callback
      const mockTelegramData = {
        id: 9982415,
        first_name: 'Isabelle',
        last_name: 'Moreau',
        photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        auth_date: Math.floor(Date.now() / 1000),
        hash: 'mock_tg_hash_signature_from_bot_token_exchange'
      };
      return this.authService.signInWithTelegram(mockTelegramData);
    });
  }

  async loginWithTikTok(): Promise<void> {
    this.runSocialLogin(() => {
      const mockAuthCode = 'mock_tiktok_oauth_code_value_from_redirect';
      return this.authService.signInWithTikTok(mockAuthCode);
    });
  }

  // Phone code sending and verifying
  async sendPhoneCode(): Promise<void> {
    if (!this.phoneNumber) return;
    this.isPending = true;
    try {
      // In production: pass actual application recaptcha verifier
      this.confirmationResult = await this.authService.signInWithPhone(this.phoneNumber, null);
      this.isVerificationSent = true;
      alert('Simulated Verification SMS sent to ' + this.phoneNumber);
    } catch (e: any) {
      alert('SMS dispatch failed: ' + e.message);
    } finally {
      this.isPending = false;
    }
  }

  async verifyPhoneCode(): Promise<void> {
    if (!this.verificationCode) return;
    this.isPending = true;
    try {
      if (this.confirmationResult) {
        // Complete confirmation
        await this.confirmationResult.confirm(this.verificationCode);
        
        // Seed name if user exists
        if (this.authService.currentUser) {
          // If phone details exist, update
        } else {
          // Create simulated phone user details in local storage
          await this.authService.updateProfileInformation('Phone Guest (' + this.phoneNumber.substring(this.phoneNumber.length - 4) + ')');
        }
        
        alert('Welcome back to Ankor Book.');
        this.closeModal();
      }
    } catch (e: any) {
      alert('Verification code invalid: ' + e.message);
    } finally {
      this.isPending = false;
    }
  }

  private async runSocialLogin(loginFn: () => Promise<any>): Promise<void> {
    if (this.isPending) return;
    this.isPending = true;
    try {
      await loginFn();
      this.closeModal();
    } catch (e: any) {
      alert('Social Authentication failed: ' + e.message);
    } finally {
      this.isPending = false;
    }
  }

  closeModal(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
