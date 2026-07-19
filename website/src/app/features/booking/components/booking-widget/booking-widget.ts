import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookingService, BookingItem, PaymentDetails } from '../../../../core/services/booking.service';
import { AuthService } from '../../../../core/services/auth.service';
import { daysBetween, fmtMoney } from '../../../../core/helpers/utils';
import { DatePickerComponent } from '../../../../shared/components/date-picker/date-picker';
import { HlmDialogService } from '../../../../components/ui/dialog/src';
import { AuthModalComponent } from '../../../auth/components/auth-modal/auth-modal';

@Component({
  selector: 'app-booking-widget',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePickerComponent],
  providers: [HlmDialogService],
  templateUrl: './booking-widget.html',
  styleUrls: ['./booking-widget.scss']
})
export class BookingWidgetComponent implements OnInit, OnDestroy {
  activeTab: 'hotel' | 'moto' | 'combo' = 'hotel';
  
  // Hotel form inputs
  hotelSuite = '';
  hotelSuitePrice = 0;
  hotelCheckIn = '';
  hotelCheckOut = '';
  hotelAdults = 1;
  hotelChildren = 0;
  
  // Moto form inputs
  motoBike = '';
  motoBikePrice = 0;
  motoCheckIn = '';
  motoCheckOut = '';
  
  // Combo form inputs
  comboSuite = '';
  comboSuitePrice = 0;
  comboBike = '';
  comboBikePrice = 0;
  comboCheckIn = '';
  comboCheckOut = '';
  comboAdults = 1;
  comboChildren = 0;

  // Checkout flow state
  isCheckingOut = false;
  checkoutStep: 'form' | 'payment' | 'success' = 'form';
  selectedPaymentMethod: 'hotel' | 'online' = 'online';
  selectedPaymentChannel: BookingItem['paymentChannel'] = 'bakong';
  
  // Online payment card details
  cardNumber = '';
  cardExpiry = '';
  cardCvv = '';
  
  // Simulators
  isProcessingPayment = false;
  qrPayloadUrl = '';
  countdownSeconds = 120;
  private countdownInterval?: any;

  // Completed Booking reference
  completedBooking?: BookingItem;
  
  // Active drafts subscription
  private draftSubscription?: Subscription;
  private isBrowser: boolean;

  // Options lists
  suitesOptions = [
    { name: 'Obsidian Garden', price: 190, detail: '60m² · Garden & Pool View' },
    { name: 'Horizon Ocean Villa', price: 340, detail: '110m² · Oceanfront' },
    { name: 'Clifftop Penthouse', price: 520, detail: '200m² · 360° Views' },
    { name: 'Overwater Lagoon Villa', price: 440, detail: '130m² · Above the Lagoon' },
    { name: 'Canopy Forest Retreat', price: 260, detail: '80m² · Treetop Level' },
    { name: 'Imperial Residence', price: 780, detail: '320m² · Premium Estate' }
  ];

  bikesOptions = [
    { name: 'Ducati Scrambler 800', price: 150, detail: '803cc · Desert Sled' },
    { name: 'Harley-Davidson Pan America', price: 240, detail: '1250cc · Adventure Touring' },
    { name: 'Honda CB500F', price: 90, detail: '471cc · Urban Roadster' },
    { name: 'Kawasaki Ninja 400', price: 110, detail: '399cc · Lightweight Sport' },
    { name: 'BMW G310GS', price: 120, detail: '313cc · Light Trail' },
    { name: 'Triumph Tiger 1200', price: 280, detail: '1160cc · Explorer Edition' }
  ];

  // Custom Select Dropdown open/close states
  hotelSuiteOpen = false;
  motoBikeOpen = false;
  comboSuiteOpen = false;
  comboBikeOpen = false;

  toggleDropdown(type: 'hotelSuite' | 'motoBike' | 'comboSuite' | 'comboBike'): void {
    if (type === 'hotelSuite') this.hotelSuiteOpen = !this.hotelSuiteOpen;
    if (type === 'motoBike') this.motoBikeOpen = !this.motoBikeOpen;
    if (type === 'comboSuite') this.comboSuiteOpen = !this.comboSuiteOpen;
    if (type === 'comboBike') this.comboBikeOpen = !this.comboBikeOpen;
  }

  selectHotelSuite(name: string): void {
    this.hotelSuite = name;
    this.onSelectSuite(name);
    this.hotelSuiteOpen = false;
  }

  selectMotoBike(name: string): void {
    this.motoBike = name;
    this.onSelectBike(name);
    this.motoBikeOpen = false;
  }

  selectComboSuite(name: string): void {
    this.comboSuite = name;
    this.onSelectSuite(name);
    this.comboSuiteOpen = false;
  }

  selectComboBike(name: string): void {
    this.comboBike = name;
    this.onSelectBike(name);
    this.comboBikeOpen = false;
  }

  closeAllDropdowns(): void {
    this.hotelSuiteOpen = false;
    this.motoBikeOpen = false;
    this.comboSuiteOpen = false;
    this.comboBikeOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-select')) {
      this.closeAllDropdowns();
    }
  }

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private dialogService: HlmDialogService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Watch for incoming selections from other components (e.g. clicking Reserve in Suites or Fleet)
    this.draftSubscription = this.bookingService.activeBooking$.subscribe(draft => {
      if (draft) {
        this.activeTab = draft.type || 'hotel';
        if (this.activeTab === 'hotel') {
          this.hotelSuite = draft.title || '';
          this.hotelSuitePrice = draft.ratePerUnit || 0;
        } else if (this.activeTab === 'moto') {
          this.motoBike = draft.title || '';
          this.motoBikePrice = draft.ratePerUnit || 0;
        } else if (this.activeTab === 'combo') {
          this.comboSuite = draft.title || '';
          this.comboSuitePrice = draft.ratePerUnit || 0;
        }
      }
    });

    // Default dates setup
    if (this.isBrowser) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 2);
      
      const pad = (n: number) => n.toString().padStart(2, '0');
      const fmt = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

      this.hotelCheckIn = this.motoCheckIn = this.comboCheckIn = fmt(today);
      this.hotelCheckOut = this.motoCheckOut = this.comboCheckOut = fmt(tomorrow);
    }
  }

  ngOnDestroy(): void {
    this.draftSubscription?.unsubscribe();
    if (this.countdownInterval) clearInterval(this.countdownInterval);
  }

  setTab(tab: 'hotel' | 'moto' | 'combo'): void {
    this.activeTab = tab;
  }

  onSelectSuite(name: string): void {
    const s = this.suitesOptions.find(o => o.name === name);
    if (s) {
      if (this.activeTab === 'hotel') this.hotelSuitePrice = s.price;
      if (this.activeTab === 'combo') this.comboSuitePrice = s.price;
    }
  }

  onSelectBike(name: string): void {
    const b = this.bikesOptions.find(o => o.name === name);
    if (b) {
      if (this.activeTab === 'moto') this.motoBikePrice = b.price;
      if (this.activeTab === 'combo') this.comboBikePrice = b.price;
    }
  }

  incrementGuest(type: 'adults' | 'children'): void {
    if (this.activeTab === 'hotel') {
      if (type === 'adults') this.hotelAdults = Math.min(6, this.hotelAdults + 1);
      else this.hotelChildren = Math.min(6, this.hotelChildren + 1);
    } else if (this.activeTab === 'combo') {
      if (type === 'adults') this.comboAdults = Math.min(6, this.comboAdults + 1);
      else this.comboChildren = Math.min(6, this.comboChildren + 1);
    }
  }

  decrementGuest(type: 'adults' | 'children'): void {
    if (this.activeTab === 'hotel') {
      if (type === 'adults') this.hotelAdults = Math.max(1, this.hotelAdults - 1);
      else this.hotelChildren = Math.max(0, this.hotelChildren - 1);
    } else if (this.activeTab === 'combo') {
      if (type === 'adults') this.comboAdults = Math.max(1, this.comboAdults - 1);
      else this.comboChildren = Math.max(0, this.comboChildren - 1);
    }
  }

  // Cost calculation getters
  get calculatedUnits(): number {
    if (this.activeTab === 'hotel') return daysBetween(this.hotelCheckIn, this.hotelCheckOut);
    if (this.activeTab === 'moto') return daysBetween(this.motoCheckIn, this.motoCheckOut);
    return daysBetween(this.comboCheckIn, this.comboCheckOut);
  }

  get ratePerUnit(): number {
    if (this.activeTab === 'hotel') return this.hotelSuitePrice;
    if (this.activeTab === 'moto') return this.motoBikePrice;
    return this.comboSuitePrice + this.comboBikePrice;
  }

  get subTotal(): number {
    return this.ratePerUnit * this.calculatedUnits;
  }

  get discount(): number {
    // 15% automatic discount for combo suite + moto stays
    return this.activeTab === 'combo' ? Math.round(this.subTotal * 0.15) : 0;
  }

  get totalCost(): number {
    return this.subTotal - this.discount;
  }

  get checkoutTitle(): string {
    if (this.activeTab === 'hotel') return this.hotelSuite || 'Please select a Suite';
    if (this.activeTab === 'moto') return this.motoBike || 'Please select a Motorcycle';
    return `${this.comboSuite || 'Suite'} & ${this.comboBike || 'Bike'}`;
  }

  get isFormValid(): boolean {
    if (this.activeTab === 'hotel') return !!this.hotelSuite && !!this.hotelCheckIn && !!this.hotelCheckOut;
    if (this.activeTab === 'moto') return !!this.motoBike && !!this.motoCheckIn && !!this.motoCheckOut;
    return !!this.comboSuite && !!this.comboBike && !!this.comboCheckIn && !!this.comboCheckOut;
  }

  // Formatting helpers for rendering currency safely
  formatVal(val: number): string {
    return fmtMoney(val);
  }

  proceedToCheckout(): void {
    if (!this.isFormValid) return;

    // ── Auth Gate ──────────────────────────────────────────────
    if (!this.authService.currentUser) {
      // Open the auth modal
      const dialogRef = this.dialogService.open(AuthModalComponent, {
        contentClass: 'max-w-4xl w-full border-none bg-transparent shadow-none',
        showCloseButton: false
      });

      // After modal closes, check if user is now authenticated and auto-proceed
      const authSub = this.authService.currentUser$.subscribe(user => {
        if (user) {
          authSub.unsubscribe();
          // Small delay to let modal close animation finish
          setTimeout(() => {
            this.checkoutStep = 'payment';
            this.startQrTimer();
          }, 400);
        }
      });
      return;
    }

    // User is authenticated — proceed directly
    this.checkoutStep = 'payment';
    this.startQrTimer();
  }

  cancelCheckout(): void {
    this.checkoutStep = 'form';
    if (this.countdownInterval) clearInterval(this.countdownInterval);
  }

  selectPaymentMethod(method: 'hotel' | 'online'): void {
    this.selectedPaymentMethod = method;
  }

  selectPaymentChannel(channel: BookingItem['paymentChannel']): void {
    this.selectedPaymentChannel = channel;
    this.startQrTimer();
  }

  private startQrTimer(): void {
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    this.countdownSeconds = 120;
    
    // Create simulated KHQR / ABA deep-link string
    const ref = 'VEL' + Math.random().toString(36).substring(2, 8).toUpperCase();
    this.qrPayloadUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=bakong://pay?ref=${ref}&amount=${this.totalCost}&merchant=ANKORBOOK`;

    this.countdownInterval = setInterval(() => {
      if (this.countdownSeconds > 0) {
        this.countdownSeconds--;
      } else {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  /**
   * Finalizes reservation and runs simulated cryptographic HMAC validation on server/client outputs.
   */
  async submitReservation(): Promise<void> {
    if (this.isProcessingPayment) return;
    
    const user = this.authService.currentUser;
    const guestName = user?.displayName || 'Guest User';
    const guestEmail = user?.email || 'guest@ankorbook.com';
    
    const start = this.activeTab === 'hotel' ? this.hotelCheckIn : this.activeTab === 'moto' ? this.motoCheckIn : this.comboCheckIn;
    const end = this.activeTab === 'hotel' ? this.hotelCheckOut : this.activeTab === 'moto' ? this.motoCheckOut : this.comboCheckOut;
    
    this.isProcessingPayment = true;

    // Simulate online processing delay
    setTimeout(async () => {
      const draftData: Omit<BookingItem, 'id' | 'reference' | 'status' | 'createdAt'> = {
        type: this.activeTab,
        title: this.checkoutTitle,
        subTitle: this.activeTab === 'combo' ? `Suite: ${this.comboSuite} / Bike: ${this.comboBike}` : undefined,
        startDate: start,
        endDate: end,
        unitsCount: this.calculatedUnits,
        ratePerUnit: this.ratePerUnit,
        subTotal: this.subTotal,
        discount: this.discount,
        total: this.totalCost,
        guestName,
        guestEmail
      };

      if (this.selectedPaymentMethod === 'online') {
        // Secure transaction payload signing to prevent price injection tampering
        const tempId = 'bk_temp_' + Date.now();
        const signedPayload = this.bookingService.getSignedPaymentPayload(tempId, this.totalCost, this.selectedPaymentChannel!);
        
        // Cryptographic integrity verification check simulation
        const isValid = this.bookingService.verifyPaymentSignature(signedPayload);
        if (!isValid) {
          alert('Security Alert: Invoice signature validation failed. Transaction halted.');
          this.isProcessingPayment = false;
          return;
        }
      }

      this.completedBooking = await this.bookingService.createBooking(draftData, {
        method: this.selectedPaymentMethod,
        channel: this.selectedPaymentMethod === 'online' ? this.selectedPaymentChannel : undefined
      });

      this.checkoutStep = 'success';
      this.isProcessingPayment = false;
      if (this.countdownInterval) clearInterval(this.countdownInterval);
    }, 2000);
  }

  copyReference(): void {
    if (this.completedBooking && this.isBrowser) {
      navigator.clipboard.writeText(this.completedBooking.reference);
      alert('Booking Reference copied to clipboard.');
    }
  }

  resetWidget(): void {
    this.checkoutStep = 'form';
    this.completedBooking = undefined;
    this.bookingService.setActiveDraft(null);
  }
}
